import React from 'react';
import HistoryTransaction from './HistoryTransaction';

const TransactionHistory = () => {
    return (
        <div className="transaction-history-container">
            <div className="heading">History</div>

            <HistoryTransaction />
            <HistoryTransaction />
            <HistoryTransaction />
            <HistoryTransaction />
        </div>
    );
};

export default TransactionHistory;
