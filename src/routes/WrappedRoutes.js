import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from "react-router-dom";
import SignIn from "../components/AuthForm/SignIn";
import SignUp from "../components/AuthForm/SignUp";
import Guest from "../components/Guest";
import TopBar from "../components/TopBar";

const WrappedRoutes = () => {
    const [userToken, setUserToken] = useState();

    useEffect(() => {
        setUserToken(localStorage.getItem("emc-token"));
    }, []);

    return (
        <Router>
            <TopBar />

            <Switch>
                {!userToken && <Route exact path="/" component={Guest} />}
                {!userToken && (
                    <Route exact path="/signin" component={SignIn} />
                )}
                {!userToken && (
                    <Route exact path="/signup" component={SignUp} />
                )}
                <Redirect to="/" />
            </Switch>
        </Router>
    );
};

export default WrappedRoutes;
