import { useEffect, useRef, useState } from 'react';
import './App.css';

type ChatMessage = {
  username: string;
  text: string;
  sentAt: number;
};

function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

const MAX_NAME_LENGTH = 20;

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [sendError, setSendError] = useState('');
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState(() => sessionStorage.getItem('username') ?? '');
  const [nameInput, setNameInput] = useState(username);
  const socketRef = useRef<WebSocket | null>(null);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('Connected to server!');
      setConnected(true);
      setSendError('');
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(String(event.data)) as ChatMessage;
        setMessages((previous) => [...previous, message]);
      } catch {
        console.log('Ignored a message that was not valid JSON.');
      }
    };

    socket.onclose = () => {
      console.log('Disconnected from server.');
      setConnected(false);
    };

    socket.onerror = () => console.log('WebSocket error.');

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, []);

  useEffect(() => {
    const list = messagesRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages]);

  function saveUsername() {
    const name = nameInput.trim().slice(0, MAX_NAME_LENGTH);
    if (!name) return;
    sessionStorage.setItem('username', name);
    setUsername(name);
    setNameInput(name);
  }

  function changeUsername() {
    sessionStorage.removeItem('username');
    setUsername('');
  }

  function sendMessage() {
    const text = input.trim();
    if (!text) {
      setSendError(input.length === 0
        ? 'Type a message before sending.'
        : 'Messages cannot be only spaces.');
      return;
    }
    const socket = socketRef.current;
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      setSendError('You are disconnected, so your message was not sent.');
      return;
    }
    socket.send(JSON.stringify({ username, text }));
    setInput('');
    setSendError('');
  }

  const header = (
    <header className="chat-header">
      <h1>WebSocket Chat</h1>
      <span className={connected ? 'status-badge connected' : 'status-badge disconnected'} role="status">
        Status: {connected ? 'Connected' : 'Disconnected'}
      </span>
    </header>
  );

  if (!username) {
    return (
      <div className="chat-container">
        {header}
        <section className="panel">
          <label htmlFor="username-input" className="field-label">Choose a username to join the chat</label>
          <div className="input-row">
            <input
              id="username-input"
              value={nameInput}
              onChange={(event) => setNameInput(event.target.value)}
              placeholder="e.g. Alex"
              maxLength={MAX_NAME_LENGTH}
              autoFocus
              onKeyDown={(event) => { if (event.key === 'Enter') saveUsername(); }}
            />
            <button onClick={saveUsername} disabled={!nameInput.trim()}>Join</button>
          </div>
          <p className="hint">Up to {MAX_NAME_LENGTH} characters. Each browser tab can use a different name.</p>
        </section>
      </div>
    );
  }

  return (
    <div className="chat-container">
      {header}
      <div className="info-bar">
        <span>
          Chatting as <strong>{username}</strong>{' '}
          <button className="link-button" onClick={changeUsername}>Change</button>
        </span>
        <span>Messages Received: <strong>{messages.length}</strong></span>
      </div>
      <div className="messages" ref={messagesRef} aria-label="Message history">
        {messages.length === 0 && <p className="empty">No messages yet. Open a second tab and say hello!</p>}
        {messages.map((message, index) => (
          <div className={message.username === username ? 'message own' : 'message'} key={index}>
            <div className="message-meta">
              <span className="timestamp">[{formatTime(message.sentAt)}]</span>{' '}
              <strong>{message.username}{message.username === username && ' (you)'}:</strong>
            </div>
            <div className="message-text">{message.text}</div>
          </div>
        ))}
      </div>
      <label htmlFor="message-input" className="field-label">Message</label>
      <div className="input-row">
        <input
          id="message-input"
          value={input}
          onChange={(event) => {
            setInput(event.target.value);
            setSendError('');
          }}
          placeholder={connected ? 'Type a message and press Enter...' : 'Disconnected - cannot send messages'}
          autoFocus
          onKeyDown={(event) => { if (event.key === 'Enter') sendMessage(); }}
        />
        <button onClick={sendMessage} disabled={!connected}>Send</button>
      </div>
      {sendError && <p className="send-error" role="alert">{sendError}</p>}
      {!sendError && !connected && (
        <p className="send-error">Messages cannot be sent until the server is back online.</p>
      )}
    </div>
  );
}

export default App;
