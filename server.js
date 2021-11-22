const app = require("./app");

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 5005;

const myServer = app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});

// TODO Step 2.1. Create a secondary socket server

// 1. Save our server in a variable
// 2. Create the Socket server

const { Server } = require("socket.io");
const Message = require("./models/Message.model");
const io = new Server( myServer, {
  cors: {
    origin: process.env.ORIGIN || "http://localhost:3000",
  }
} )

// 3. Socket server should:
io.on("connection", (socket) => {
  console.log("a user connected to the socket")
  // a. receive when user joins chat (on)
  socket.on("join_chat", (chatId) => {
    console.log("user joined chat room: ", chatId)
    socket.join(chatId) // the chat id will be the same as the socket id
  })

  // b. receive when user sends message (on)
  socket.on("send_message", (newMessage) => {
    // d. store message in DB (using Message Model)
    Message.create(newMessage)
    .then( () => {
      // c. trasmit received message (emit)
      socket.to(newMessage.chatId).emit("receive_message", newMessage) // this will send the message to everyone listening to this socket id except the sender
      socket.emit("receive_message", newMessage) // sends the message to the sender only
    })
    .catch( (err) => console.log(err));
  })
})


