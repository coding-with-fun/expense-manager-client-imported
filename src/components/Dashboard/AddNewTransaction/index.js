import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';

const AddNewTransaction = () => {
    return (
        <div className="add-new-transaction-container">
            <Fab color="primary" variant="extended">
                <AddIcon />
                Add New Transaction
            </Fab>
        </div>
    );
};

export default AddNewTransaction;
