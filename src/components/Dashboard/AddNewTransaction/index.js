import { Backdrop, Fab, Fade, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import React, { useState } from 'react';
import NewTransactionModal from './NewTransactionModal';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        outline: 0,
    },
}));

const AddNewTransaction = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const classes = useStyles();

    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="add-new-transaction-container">
            <Fab color="primary" variant="extended" onClick={handleToggleModal}>
                <AddIcon />
                Add New Transaction
            </Fab>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={isModalOpen}
                onClose={handleToggleModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={isModalOpen}>
                    <div className={classes.paper}>
                        <NewTransactionModal />
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default AddNewTransaction;
