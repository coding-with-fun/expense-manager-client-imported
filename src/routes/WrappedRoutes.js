import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
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

const useStyles = makeStyles(() => ({
    loader: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
    },
}));

const WrappedRoutes = ({ userToken, loadingToken }) => {
    const classes = useStyles();

    return (
        <Router>
            {!loadingToken ? (
                <>
                    <TopBar />

                    <div className="body-content">
                        <Switch>
                            {!userToken && (
                                <Route exact path="/" component={Guest} />
                            )}
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
                                <Route
                                    exact
                                    path="/signin"
                                    component={SignIn}
                                />
                            )}
                            {!userToken && (
                                <Route
                                    exact
                                    path="/signup"
                                    component={SignUp}
                                />
                            )}
                            <Redirect to="/" />
                        </Switch>
                    </div>
                </>
            ) : (
                <div className={classes.loader}>
                    <CircularProgress />
                </div>
            )}
        </Router>
    );
};

export default connect((state) => {
    return {
        userToken: state.auth.token,
    };
})(WrappedRoutes);
