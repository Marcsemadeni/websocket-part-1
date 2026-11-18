Experiment
Open the same React URL in two separate browser tabs.

Send messages between the tabs. Try opening a third tab and sending messages.

Question 1: What happens when you send a message from one browser tab? Why?
When I send a message in one tab, it shows up in the other ones. I think its because it will raise an event saying we have a new message, 

Question 2: What happens when you refresh one of the tabs? Do previous messages remain? Why or why not?
Messages are removed. The messages being displayed are't from a database or anything persistant

Part 2: Understanding WebSockets
Answer the following questions in your own words.

Question 3: What is the difference between a traditional HTTP request and a WebSocket connection?
Websocket allows communication to go both ways and keeps the connection. an http request will send a response and thats it. Any responses are sent on a different request. 

Question 4: What is polling? How could a chat application use HTTP polling instead of WebSockets?
Polling is where we are constantly looking for any changes. A chat application could use polling by constantly fetching the messages. If there is a new message, it would be in the latest poll.


Question 5: Give two examples of applications that would benefit from WebSockets. Explain why.
If there is an application that is managing lots of different conversations, websockets would be nice because we would then be able to cut out the empty requests and only look at real traffic.
Chats would also improve from websockets because we don't of any pattern of when a person is going to chat, and so having a websocket that will only react when they are active will help keep the messages going fast when they are active and quite when they are gone.


Question 6: Give an example of an application where WebSockets would probably be unnecessary. Explain why.
If we are going to be on a page for a brief amount of time, like a form submision, we wouldn't need a websocket because there is no need for a persistent connection. We would only want to send the finish product when it is done. 


Question 7: What are two advantages and two disadvantages of WebSockets?
some advantages are low latency times because the connection is open, and our data doesn't need to wait for the next poll to be sent. Another advantage is that there is alot less wasted requests since we no longer need to be constantly polling. 
Some disadvantages is that what the size grows, you will have a lot of connections that will be open that will be using those server resources. It can also be harder to debug and test for things since you no longer can go to an endpoint and send test requests and responses.


Part 3: Understanding the Code
Explore the React application and WebSocket server.

Find where the application creates its connection:

const socket = new WebSocket("ws://localhost:8080");
Question 8: What does this line do? What does localhost:8080 represent?
This line says that localhost:8080 is where we want to listen to for our other connections.

Find the onmessage event handler.

Question 9: When does onmessage execute? How does receiving a message cause React to update the interface?
It executes every time the server sends a message. It changes when we receive a message, and that would have it change the contents to a new array containing that message, and react will change because setMessages has useState. 


Find where the application uses socket.send().

Question 10: What does send() do? Why should we check whether the connection is open before calling it?
If the connection isn't open, then we would only get errors if we try to send data.


Find the code using useEffect and useRef.

Question 11: Why is useEffect useful for establishing a WebSocket connection?
useEffect is good because it will only run once when the change is completed and not on every keystroke. It also cleans up at the end so connections don't stay open when they are old.


Question 12: Why might we use useRef to store our WebSocket connection instead of useState?
useState is used for changing what is being displayed, useRef doesn't. So when we do useRef we can make changes without rerendering the whole page. 


Understanding the Server
Open the WebSocket server code.

Question 13: What is the purpose of the WebSocket server? Why can't the two React applications simply communicate directly in this example?
The server is there to be a hub to accept connections, receive messages, share the message, and see who is connected. 
The applications can't communicate directly because there is no way to find else who is currently online and there is no address to connect to. 


Question 14: What would happen if the server only sent messages back to the browser that originally sent them?
You would only be able to see the own message you send, and no one elses. 


Part 4: Experiment with Connections
With the application running:

Open the application in two tabs.

Send several messages.

Stop the WebSocket server using Ctrl + C.

Observe what happens in both tabs.

Try sending another message.

Restart the WebSocket server.

Question 15: What happens to your application when the server disconnects?
When it disconnects, the app recognizes it and doesn't allow us to send any messages


Question 16: Does your application automatically reconnect when the server restarts? What would need to happen for it to reconnect?
It does not reconnect automatically. We would want to try our connection function again in intervails to see if it is open again. 


Part 5: Reflection
Question 17: How are WebSockets different from the API requests we previously made using fetch() and TanStack Query?
In Tanstack we worked with messages from the server and recently used info in the cachce. Those were always in responses to requests. Websockets has a continous connection, back and forth messages. It gives real time updates instead of loading certain data


Question 18: What was the most confusing part of working with WebSockets?
Other than learning syntax, probably trying to figure out when to keep a connection open and closed, and how to open a connection but also bring previous data into it as well. For example, how would we have our text app send notifications when a user is off? and see all messages when they are back on?


Question 19: If you were building a multiplayer game or collaborative application, how might you use WebSockets?
Other than having websockets as a online chat, you could use a websocket to keep track of the user's movement and inputs to keep the gameplay smooth and have everyone on the server on the same page. This way, we won't have to worry about constantly updating everyone one request at a time, but rathe have all inputs go into a central location and everything else is broadcasted at once. This is also nice because people can join and leave without having to create a new instance of the game with direct connects between the players

