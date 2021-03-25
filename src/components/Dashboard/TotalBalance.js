import React from 'react';
import { connect } from 'react-redux';

const TotalBalance = ({ totalBalance }) => {
    return (
        <div className="total-balance-container">
            <div className="heading">Your Balance</div>

            <div className="balance">${totalBalance}</div>
        </div>
    );
};

export default connect((state) => {
    return {
        totalBalance: state.transactions.totalBalance,
    };
})(TotalBalance);
