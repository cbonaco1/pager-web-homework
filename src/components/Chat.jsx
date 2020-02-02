import React from "react";
import io from "socket.io-client";
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
            console.log(message);
            // this.state.messages.append(message)
        });
    }

    onInputChange({ target }) {
        this.setState({
            message: target.value
        });
    }

    onSend() {
        this.socket.emit('text-message', this.state.message);
        this.setState({
            message: ''
        });
    }

    render() {
        // iterate through this.state.messages,
        // create a <ChatItem /> component

        return (
            <div className="chat">
                <p>Chat page for {this.props.location.state}</p>
                <input type="text" value={this.state.message} onChange={this.onInputChange.bind(this)}/>
                <button onClick={this.onSend.bind(this)}>Send</button>
            </div>
        )
    }
}
