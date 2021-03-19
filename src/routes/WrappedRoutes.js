import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom';
import SignIn from '../components/AuthForm/SignIn';
import SignUp from '../components/AuthForm/SignUp';
import Dashboard from '../components/Dashboard';
import Guest from '../components/Guest';
import TopBar from '../components/TopBar';
import Transactions from '../components/Transactions';
import { UserContext } from '../context/UserContext';

const WrappedRoutes = () => {
    const { userToken } = useContext(UserContext);

    return (
        <Router>
            <TopBar />

            {userToken && (
                <Switch>
                    {!userToken && <Route exact path="/" component={Guest} />}
                    {userToken && (
                        <Route exact path="/" component={Dashboard} />
                    )}
                    {userToken && (
                        <Route
                            exact
                            path="/transactions"
                            component={Transactions}
                        />
                    )}
                    {!userToken && (
                        <Route exact path="/signin" component={SignIn} />
                    )}
                    {!userToken && (
                        <Route exact path="/signup" component={SignUp} />
                    )}
                    <Redirect to="/" />
                </Switch>
            )}
        </Router>
    );
};

export default WrappedRoutes;
