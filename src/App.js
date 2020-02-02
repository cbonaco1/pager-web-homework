import React from "react";
import { Switch, Route, HashRouter as Router, Redirect } from "react-router-dom";
import Chat from "./components/Chat";
import Login from "./components/Login";

export default () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/chat">
                    <Chat />
                </Route>
                <Redirect path="/" to="/login" />
            </Switch>
        </Router>
    )
}
