import { Paper } from '@material-ui/core';
import React from 'react';

const IndividualBalance = () => {
    return (
        <Paper elevation={3} className="individual-balance-container">
            <div className="income-balance">
                <div className="heading">Income</div>

                <div className="balance">$300</div>
            </div>

            <div className="expense-balance">
                <div className="heading">Expense</div>

                <div className="balance">$300</div>
            </div>
        </Paper>
    );
};

export default IndividualBalance;
