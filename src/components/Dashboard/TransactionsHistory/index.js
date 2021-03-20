import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { useHistory } from 'react-router';
import HistoryTransaction from '../../HistoryTransaction';

const TransactionHistory = () => {
    const history = useHistory();

    const routeToAllTransactions = () => {
        history.push('/transactions');
    };

    return (
        <div className="transaction-history-container">
            <div className="heading">Last 3 Transactions</div>

            <HistoryTransaction />
            <HistoryTransaction />
            <HistoryTransaction />

            <p className="see-more mt-4" onClick={routeToAllTransactions}>
                See More
                <ExpandMoreIcon />
            </p>
        </div>
    );
};

export default TransactionHistory;
