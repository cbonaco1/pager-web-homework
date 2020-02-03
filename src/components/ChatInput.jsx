import React, { Fragment } from "react";
import "./ChatInput.scss"

export default class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            typers: []
        }
    }

    componentDidMount() {
        // listen to "typing" event
        // and filter list of typers
        this.props.socket.on('is-typing', (typersMap) => {
            const listOfTypers = [];
            Object.keys(typersMap).forEach((typer) => {
                if (typer !== this.props.username && typersMap[typer]) {
                    listOfTypers.push(typer);
                }
            });

            this.setState({
                typers: listOfTypers
            });
        });
    }

    componentWillUnmount() {
        this.props.socket.emit('typing', false);
    }

    onInputChange({ target }) {
        // Set local state
        // and emit "is-typing" event
        this.setState({
            input: target.value
        }, () => {
            const { input } = this.state;
            const { socket } = this.props;
            if (input.length > 0) {
                socket.emit('typing', true);
            } else {
                socket.emit('typing', false);
            }
        });
    }

    onSend() {
        const { socket } = this.props;
        socket.emit('text-message', this.state.input);
        this.setState({
            input: ''
        }, () => {
            socket.emit('typing', false);
        });
    }

    render() {
        const { typers } = this.state;
        let typersLabel = "";
        if (typers.length === 1) {
            typersLabel = `${typers[0]} is typing...`
        } else if(typers.length > 1) {
            typersLabel = "People are typing..."
        }

        return (
            <Fragment>
                <div className="chat-input">
                    <input type="text" value={this.state.input} onChange={this.onInputChange.bind(this)} className="input" placeholder="Message"/>
                    <button onClick={this.onSend.bind(this)} className="send-btn">Send</button>
                </div>
                <p className="is-typing">{typersLabel}</p>
            </Fragment>
        )
    }
}
