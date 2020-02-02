import io from "socket.io-client";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById('chat-app'));



// Do this when user logs in
const username = "christian";
const serverUrl = `https://pager-hiring.herokuapp.com/?username=${username}`
const socket = io(serverUrl);


// -- Listen to these --
socket.on('user-connected', username => {
    // <username> is a string with the name of the user who connect to the chat
});

socket.on('user-disconnected', username => {
    // <username> is a string with the name of the user who disconnect from the chat
});

socket.on('is-typing', typers => {
    // <typers> is a map where the `key` is the <username> and the value is a `boolean` that is `true` if the user is typing and `false` if not.
    // typers = {
    //   [username: string]: boolean
    // }
});

socket.on('message', message => {
    // <message> is an object with one of the following schemas:
    // message = {
    //   type: 'text',
    //   username: string,
    //   time: Date,
    //   text: string
    // };
    // or
    // message = {
    //   type: 'image',
    //   username: string,
    //   time: Date,
    //   url: string,
    //   alt: string | null
    // };
});


// --- need to emit these --
// <text> is the text of the message
// socket.emit('text-message', text: string);

// <url> is a string with the image location
// <alt> is an **optional** text represatation of the image 
// socket.emit('image-message', {url: string, [alt: string]});

// <status> is a boolean that should be true if the user is actually typing or false if not
// socket.emit('typing', status: boolean);
