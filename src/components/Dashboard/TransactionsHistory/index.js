import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import HistoryTransaction from '../../HistoryTransaction';

const TransactionHistory = ({ transactions }) => {
    const history = useHistory();

    const routeToAllTransactions = () => {
        history.push('/transactions');
    };

    return (
        <div className="transaction-history-container">
            <div className="heading">Last 3 Transactions</div>

            {transactions.map((transaction) => {
                return <HistoryTransaction transaction={transaction} />;
            })}

            {transactions.length > 3 ? (
                <p className="see-more mt-4" onClick={routeToAllTransactions}>
                    See More
                    <ExpandMoreIcon />
                </p>
            ) : (
                <p className="text-center">No Transactions to show...</p>
            )}
        </div>
    );
};

export default connect((state) => {
    return {
        transactions: state.transactions.transactions,
    };
})(TransactionHistory);
