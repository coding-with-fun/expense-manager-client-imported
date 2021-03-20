import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { connect } from 'react-redux';
import HistoryTransaction from '../TransactionHistory/HistoryTransaction';

const useStyles = makeStyles(() => ({
    noData: {
        height: '82vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

const Transactions = ({ transactions }) => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs" className="all-transactions">
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
