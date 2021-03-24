import { Fab } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import TransactionInfoModal from '../../TransactionHistory/TransactionInfoModal';

const AddNewTransaction = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="add-new-transaction-container">
            <Fab
                color="primary"
                variant="extended"
                onClick={() => setIsModalOpen(true)}>
                <AddIcon />
                Add New Transaction
            </Fab>

            {isModalOpen && (
                <TransactionInfoModal
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    type={0}
                />
            )}
        </div>
    );
};

export default connect()(AddNewTransaction);
