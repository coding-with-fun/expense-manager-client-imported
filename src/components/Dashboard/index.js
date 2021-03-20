import { Container, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
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
}));

const Dashboard = () => {
    const classes = useStyles();

    return (
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

export default Dashboard;
