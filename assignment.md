Experiment
Open the same React URL in two separate browser tabs.

Send messages between the tabs. Try opening a third tab and sending messages.

Question 1: What happens when you send a message from one browser tab? Why?

Question 2: What happens when you refresh one of the tabs? Do previous messages remain? Why or why not?

Part 2: Understanding WebSockets
Answer the following questions in your own words.

Question 3: What is the difference between a traditional HTTP request and a WebSocket connection?

Question 4: What is polling? How could a chat application use HTTP polling instead of WebSockets?

Question 5: Give two examples of applications that would benefit from WebSockets. Explain why.

Question 6: Give an example of an application where WebSockets would probably be unnecessary. Explain why.

Question 7: What are two advantages and two disadvantages of WebSockets?

Part 3: Understanding the Code
Explore the React application and WebSocket server.

Find where the application creates its connection:

const socket = new WebSocket("ws://localhost:8080");
Question 8: What does this line do? What does localhost:8080 represent?

Find the onmessage event handler.

Question 9: When does onmessage execute? How does receiving a message cause React to update the interface?

Find where the application uses socket.send().

Question 10: What does send() do? Why should we check whether the connection is open before calling it?

Find the code using useEffect and useRef.

Question 11: Why is useEffect useful for establishing a WebSocket connection?

Question 12: Why might we use useRef to store our WebSocket connection instead of useState?

Understanding the Server
Open the WebSocket server code.

Question 13: What is the purpose of the WebSocket server? Why can't the two React applications simply communicate directly in this example?

Question 14: What would happen if the server only sent messages back to the browser that originally sent them?

Part 4: Experiment with Connections
With the application running:

Open the application in two tabs.

Send several messages.

Stop the WebSocket server using Ctrl + C.

Observe what happens in both tabs.

Try sending another message.

Restart the WebSocket server.

Question 15: What happens to your application when the server disconnects?

Question 16: Does your application automatically reconnect when the server restarts? What would need to happen for it to reconnect?

Part 5: Reflection
Question 17: How are WebSockets different from the API requests we previously made using fetch() and TanStack Query?

Question 18: What was the most confusing part of working with WebSockets?

Question 19: If you were building a multiplayer game or collaborative application, how might you use WebSockets?