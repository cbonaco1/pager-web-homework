import React from "react";
import './Login.scss'

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
        }
    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        });
    }

    goToChat() {
        if (this.state.username.length > 0) {
            this.props.history.push({
                pathname: '/chat',
                state: this.state.username
            });
        } else {
            alert("please enter a username");
        }
    }

    render () {
        return (
            <div className="login component">
                <div className="component-container">
                    <h1 className="title">Join Chat</h1>
                    <p className="prompt">Please enter your username</p>
                    <input type="text" name="username" id="username" value={this.state.username} onChange={this.handleUsernameChange.bind(this)}/>
                    <button className="submit-btn" onClick={this.goToChat.bind(this)}>Next</button>
                </div>
            </div>
        )
    }
}
