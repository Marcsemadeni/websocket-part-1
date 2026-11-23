const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

const MAX_NAME_LENGTH = 20;

function parseChatMessage(raw) {
  try {
    const data = JSON.parse(raw);
    const text = typeof data.text === 'string' ? data.text.trim() : '';
    let username = typeof data.username === 'string' ? data.username.trim() : '';
    if (!text) return null;
    if (!username) username = 'Anonymous';
    return { username: username.slice(0, MAX_NAME_LENGTH), text, sentAt: Date.now() };
  } catch {
    return null;
  }
}

server.on('connection', (socket) => {
  console.log('A user connected!');

  socket.on('message', (message) => {
    const chatMessage = parseChatMessage(message.toString());
    if (!chatMessage) return;
    console.log(`Received: ${chatMessage.username}: ${chatMessage.text}`);

    // Broadcast to every connected client, including the sender.
    const payload = JSON.stringify(chatMessage);
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload);
      }
    });
  });

  socket.on('close', () => console.log('A user disconnected.'));
  socket.on('error', (error) => console.error('Socket error:', error.message));
});

console.log('WebSocket server running on port 8080');
