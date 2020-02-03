import React from "react";
import io from "socket.io-client";
import ChatList from "./ChatList";
import ChatInput from "./ChatInput";
import "./Chat.scss";

export default class Chat extends React.Component {
    constructor(props) {
        const url = "https://pager-hiring.herokuapp.com/?username=";
        super(props);
        this.socket = io(`${url}${this.props.location.state}`);
        this.state = {
            messages: [],
            message: ''
        }
    }

    componentDidMount() {
        // if no username, redirect to /login
        this.socket.on('message', (message) => {
            this.setState({
                messages: [message, ...this.state.messages]
            });
        });
    }

    render() {
        return (
            <div className="chat">
                <p>Signed in as {this.props.location.state}</p>
                <ChatList chats={this.state.messages} />
                <ChatInput socket={this.socket} username={this.props.location.state}/>
            </div>
        )
    }
}
