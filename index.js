const express = require("express");
const app = express();
const path = require('path');
const http = require("http").Server(app);
const io = require("socket.io")(http);

const port = process.env.PORT || 3000;

const messages = [];

const isTyping = {};

app.use(express.static(path.join(__dirname, 'dist')));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", socket => {
  const username = socket.handshake.query.username;
  // when the client connects, we require the username
  if (!username) {
    socket.disconnect(true);
    return;
  }

  // we send all the old messages to the client to allow it to render the history
  messages.forEach(m => io.emit("message", m));

  // we let everyone knows about the new user
  io.emit("user-connected", username);

  function storeAndEmitMessage(type, payload) {
    const message = {
      type,
      username,
      time: new Date(),
      ...payload
    };

    messages.push(message);
    io.emit("message", message);
  }
  socket.on("text-message", text => {
    if (!text || typeof text !== "string") {
      return;
    }
    storeAndEmitMessage("text", { text });
  });

  socket.on("image-message", payload => {
    if (typeof payload !== "object") {
      return;
    }
    if (!payload.url || typeof payload.url !== "string") {
      return;
    }
    if (payload.alt && typeof payload.alt !== "string") {
      return;
    }

    storeAndEmitMessage("image", payload);
  });

  socket.on("typing", status => {
    isTyping[username] = status;

    io.emit("is-typing", isTyping);
  });

  socket.on("disconnect", () => {
    io.emit("user-disconnected", username);
  });
});

http.listen(port, () => {
  console.log("listening on *:" + port);
});
