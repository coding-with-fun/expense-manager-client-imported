import { Paper } from '@material-ui/core';
import React, { useState } from 'react';
import TransactionInfoModal from './TransactionInfoModal';

const HistoryTransaction = () => {
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
                        <div className="date mb-3">12 Jan 2020</div>
                        <div className="title">Hello</div>
                    </div>
                    <div className="amount">$300</div>
                </div>
                <div className="success-status" />
            </div>

            <TransactionInfoModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </Paper>
    );
};

export default HistoryTransaction;
