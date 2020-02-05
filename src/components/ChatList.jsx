// presentational component which renders list of chats
import React from 'react';
import { format } from 'date-fns'
import './ChatList.scss'

export default class ChatList extends React.Component {
    constructor(props) {
        super(props);
        this.listRef = React.createRef();
    }

    componentDidUpdate() {
        const { current: listElement } = this.listRef
        // Scroll to bottom when component receives new messages;
        listElement.scrollTop = listElement.scrollHeight - listElement.clientHeight;
    }

    render() {
        const chatListItems = this.props.chats.map(({ username, time, text }, index) => {
            return (
                <li className="chat-list-item" key={index}>
                    <div className="username-time">
                        <p className="username">{username}</p>
                        <span className="time">{format(new Date(time), 'p')}</span>
                    </div>
                    <p>{text}</p>
                </li>
            )
        });

        return(
            <ul className="chat-list" ref={this.listRef}>
                {chatListItems}
            </ul>
        )
    }
}
