import { Paper } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import React from 'react';

const HistoryTransaction = () => {
    return (
        <Paper variant="outlined" className="history-transaction-container">
            <div className="details">
                <div className="title">Hello</div>
                <div className="amount">$300</div>
            </div>
            <div className="success-status">
                <ArrowRightIcon />
            </div>
        </Paper>
    );
};

export default HistoryTransaction;
