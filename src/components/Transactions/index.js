import { Container } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import HistoryTransaction from '../HistoryTransaction';

const Transactions = ({ transactions }) => {
    return (
        <Container component="main" maxWidth="xs" className="all-transactions">
            {transactions.map((transaction) => {
                return <HistoryTransaction transaction={transaction} />;
            })}

            {transactions.length < 1 && (
                <p className="text-center">No Transactions to show...</p>
            )}
        </Container>
    );
};

export default connect((state) => {
    return {
        transactions: state.transactions.transactions,
    };
})(Transactions);
