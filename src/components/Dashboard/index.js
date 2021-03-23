import { Container, makeStyles, Paper } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setTransactions } from '../../actions/transactionsActions';
import { getUserDetails } from '../../api/user.api';
import ToastNotification from '../../shared/ToastNotification';
import AddNewTransaction from './AddNewTransaction';
import IndividualBalance from './IndividualBalance';
import TotalBalance from './TotalBalance';
import TransactionHistory from './TransactionsHistory';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(3, 0),
        padding: theme.spacing(2, 0),
        display: 'flex',
        flexDirection: 'column',
        height: '86vh',
        flexGrow: 1,
        position: 'relative',
    },
    loader: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 70px)',
        width: '100vw',
    },
}));

const Dashboard = ({ dispatch }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getUserDetails()
            .then((response) => {
                const apiRes = response.success;
                ToastNotification(apiRes.message, 'success');
                dispatch(setTransactions(apiRes.user.transactionList));
                setLoading(false);
            })
            .catch((error) => {
                console.error(error.response.data.error);
                ToastNotification(error.response.data.error.message);
            });
        // eslint-disable-next-line
    }, []);

    return !loading ? (
        <div className={classes.loader}>
            <CircularProgress />
        </div>
    ) : (
        <Container component="main" maxWidth="xs">
            <Paper elevation={0} className={classes.paper}>
                <TotalBalance />
                <IndividualBalance />
                <TransactionHistory />
                <AddNewTransaction />
            </Paper>
        </Container>
    );
};

export default connect()(Dashboard);
