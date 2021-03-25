import { Paper } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';

const IndividualBalance = ({ totalIncome, totalExpense }) => {
    return (
        <Paper elevation={3} className="individual-balance-container">
            <div className="income-balance">
                <div className="heading">Income</div>

                <div className="balance">${totalIncome}</div>
            </div>

            <div className="expense-balance">
                <div className="heading">Expense</div>

                <div className="balance">${totalExpense}</div>
            </div>
        </Paper>
    );
};

export default connect((state) => {
    return {
        totalIncome: state.transactions.totalIncome,
        totalExpense: state.transactions.totalExpense,
    };
})(IndividualBalance);
