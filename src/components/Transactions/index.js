import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import HistoryTransaction from '../TransactionHistory/HistoryTransaction';

const useStyles = makeStyles(() => ({
    allTransactions: {
        height: 'inherit',
    },
    noData: {
        height: 'inherit',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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

const Transactions = ({ transactions }) => {
    const classes = useStyles();

    return (
        <Container
            component="main"
            maxWidth="xs"
            className={classes.allTransactions}>
            {transactions.map((transaction, index) => {
                return (
                    <HistoryTransaction
                        transaction={transaction}
                        index={index}
                        key={index}
                    />
                );
            })}

            {transactions.length < 1 && (
                <p className={`text-center ${classes.noData}`}>
                    No Transactions to show...
                </p>
            )}
        </Container>
    );
};

export default connect((state) => {
    return {
        transactions: state.transactions.transactions,
    };
})(Transactions);
