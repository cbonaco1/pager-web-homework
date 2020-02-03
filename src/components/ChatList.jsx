// presentational component which renders list of chats
import React from 'react';
import './ChatList.scss'

export default ({ chats }) => {
    const chatListItems = chats.map(({ username, time, text }, index) => {
        return (
            <li className="chat-list-item" key={index}>
                <div className="username-time">
                    <p className="username">{username}</p>
                    <span className="time">{time}</span>
                </div>
                <p>{text}</p>
            </li>
        )
    });

    return(
        <ul className="chat-list">
            {chatListItems}
        </ul>
    )
}
