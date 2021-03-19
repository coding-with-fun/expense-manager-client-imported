import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import React, { useState } from 'react';
import NewTransactionModal from './NewTransactionModal';

const AddNewTransaction = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="add-new-transaction-container">
            <Fab color="primary" variant="extended" onClick={handleToggleModal}>
                <AddIcon />
                Add New Transaction
            </Fab>

            <NewTransactionModal
                isModalOpen={isModalOpen}
                handleToggleModal={handleToggleModal}
            />
        </div>
    );
};

export default AddNewTransaction;
