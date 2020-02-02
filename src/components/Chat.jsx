import React from "react";
import "./Chat.scss";

export default (props) => {
    return (
        <div className="chat">
            <p>Chat page for {props.location.state}</p>
        </div>
    )
}
