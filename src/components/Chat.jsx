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
            this.setState({
                messages: [message, ...this.state.messages]
            });
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
        const messagesList = this.state.messages.map((msg) => <li>{msg.text}</li>);

        return (
            <div className="chat">
                <div>
                    <ul>
                        {messagesList}
                    </ul>
                </div>
                <p>Chat page for {this.props.location.state}</p>
                <input type="text" value={this.state.message} onChange={this.onInputChange.bind(this)}/>
                <button onClick={this.onSend.bind(this)}>Send</button>
            </div>
        )
    }
}
