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
import AuthForm from '../components/AuthForm/AuthForm';
import Guest from '../components/Guest';
import TopBar from '../components/TopBar';
import AuthenticatedRoutes from './AuthenticatedRoutes';

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
                        {userToken ? (
                            <AuthenticatedRoutes />
                        ) : (
                            <Switch>
                                <Route exact path="/" component={Guest} />
                                <Route
                                    exact
                                    path="/signin"
                                    render={(props) => (
                                        <AuthForm {...props} routeType={0} />
                                    )}
                                />
                                <Route
                                    exact
                                    path="/signup"
                                    render={(props) => (
                                        <AuthForm {...props} routeType={1} />
                                    )}
                                />
                                <Redirect to="/" />
                            </Switch>
                        )}
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
