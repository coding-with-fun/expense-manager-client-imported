import { Paper } from '@material-ui/core';
import React, { useState } from 'react';
import TransactionInfoModal from './TransactionInfoModal';
import moment from 'moment';

const HistoryTransaction = ({ transaction, index }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Paper variant="outlined" className="history-transaction-container">
            <div
                className="d-flex w-100"
                onClick={() => {
                    setIsModalOpen(true);
                }}>
                <div className="details">
                    <div className="info w-100 mr-3">
                        <div className="date mb-3">
                            {moment(transaction.date).format('DD MMMM YYYY')}
                        </div>
                        <div className="title">{transaction.title}</div>
                    </div>
                    <div className="amount">${transaction.amount}</div>
                </div>
                <div className="success-status" />
            </div>

            <TransactionInfoModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                transaction={transaction}
                index={index}
            />
        </Paper>
    );
};

export default HistoryTransaction;
