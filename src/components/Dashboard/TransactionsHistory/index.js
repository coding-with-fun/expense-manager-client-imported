import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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

            <p className="see-more mt-4">
                See More
                <ExpandMoreIcon />
            </p>
        </div>
    );
};

export default TransactionHistory;
