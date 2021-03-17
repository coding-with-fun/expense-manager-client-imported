import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';

const AddNewTransaction = () => {
    return (
        <div className="add-new-transaction-container">
            <Button variant="contained" size="large" startIcon={<AddIcon />}>
                Add New Transaction
            </Button>
        </div>
    );
};

export default AddNewTransaction;
