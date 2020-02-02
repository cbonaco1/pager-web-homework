import React from "react";
import './Login.scss'

export default () => {
    return (
        <div className="login component">
            <div className="component-container">
                <h1 className="title">Join Chat</h1>
                <p className="prompt">Please enter your username</p>
                <input type="text" name="username" id="username"/>
                <button className="submit-btn">Next</button>
            </div>
        </div>
    )
}
