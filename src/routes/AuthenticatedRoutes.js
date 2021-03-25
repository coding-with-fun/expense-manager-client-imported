import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { setTransactions } from '../actions/transactionsActions';
import { setUserDetails } from '../actions/userActions';
import { getUserDetails } from '../api/user.api';
import Dashboard from '../components/Dashboard';
import Profile from '../components/Profile';
import Transactions from '../components/Transactions';
import ToastNotification from '../shared/ToastNotification';

const useStyles = makeStyles(() => ({
    loader: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 70px)',
        width: '100vw',
    },
}));

const AuthenticatedRoutes = ({ dispatch }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);

    const handleGetUserDetails = () => {
        setLoading(true);
        getUserDetails()
            .then((response) => {
                const apiRes = response.success;
                dispatch(setTransactions(apiRes.user.transactionList));
                dispatch(
                    setUserDetails({
                        name: apiRes.user.name,
                        userName: apiRes.user.userName,
                        email: apiRes.user.email,
                        _id: apiRes.user._id,
                    })
                );
                setLoading(false);
            })
            .catch((error) => {
                console.error(error.response.data.error);
                ToastNotification(error.response.data.error.message);
            });
    };
    useEffect(() => {
        handleGetUserDetails();
        // eslint-disable-next-line
    }, []);

    return loading ? (
        <div className={classes.loader}>
            <CircularProgress />
        </div>
    ) : (
        <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/transactions" component={Transactions} />
            <Route exact path="/profile" component={Profile} />
            <Redirect to="/" />
        </Switch>
    );
};

export default connect((state) => {
    return {
        transactions: state.transactions.transactions,
    };
})(AuthenticatedRoutes);
