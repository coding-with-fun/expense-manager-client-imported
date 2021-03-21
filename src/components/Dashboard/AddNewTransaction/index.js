import DateFnsUtils from '@date-io/date-fns';
import {
    Backdrop,
    Fab,
    Fade,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Modal,
    OutlinedInput,
    Select,
    TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    Cancel as CancelIcon,
    Close as CloseIcon,
    Save as SaveIcon,
} from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import {
    DatePicker,
    MuiPickersUtilsProvider,
    TimePicker,
} from '@material-ui/pickers';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { insertTransaction } from '../../../actions/transactionsActions';
import moment from 'moment';

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
        borderRadius: '10px',
    },
    closeIcon: {
        cursor: 'pointer',
    },
}));

const AddNewTransaction = ({ dispatch }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTransactionData, setNewTransactionData] = useState({
        title: '',
        description: '',
        category: 'expense',
        amount: '',
        date: moment().format(),
    });

    const classes = useStyles();

    const handleSaveInput = (event) => {
        const inputName = event.target.name;

        setNewTransactionData((userInput) => ({
            ...userInput,
            [inputName]: event.target.value,
        }));
    };

    const handleSaveDate = (data) => {
        setNewTransactionData((userInput) => ({
            ...userInput,
            date: moment(data).format(),
        }));
    };

    const handleSaveData = () => {
        dispatch(insertTransaction(newTransactionData));
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setNewTransactionData({
            title: '',
            description: '',
            category: 'expense',
            amount: '',
            date: moment().format(),
        });
        setIsModalOpen(false);
    };

    return (
        <div className="add-new-transaction-container">
            <Fab
                color="primary"
                variant="extended"
                onClick={() => setIsModalOpen(true)}>
                <AddIcon />
                Add New Transaction
            </Fab>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={isModalOpen}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={isModalOpen}>
                    <div className={classes.paper}>
                        <div className="new-transaction-modal">
                            <div className="d-flex justify-content-end mb-4 mt-1">
                                <CloseIcon
                                    onClick={handleCloseModal}
                                    className={classes.closeIcon}
                                />
                            </div>
                            <TextField
                                id="title"
                                label="Title"
                                name="title"
                                value={newTransactionData.title}
                                onChange={handleSaveInput}
                                variant="outlined"
                                margin="dense"
                                fullWidth
                            />

                            <TextField
                                id="description"
                                label="Description"
                                name="description"
                                value={newTransactionData.description}
                                onChange={handleSaveInput}
                                multiline
                                rows={4}
                                variant="outlined"
                                margin="dense"
                                fullWidth
                            />

                            <div className="d-flex">
                                <FormControl
                                    variant="outlined"
                                    margin="dense"
                                    className="w-50 flex-fill mr-3">
                                    <InputLabel htmlFor="category">
                                        Category
                                    </InputLabel>
                                    <Select
                                        labelId="category"
                                        id="category"
                                        value={newTransactionData.category}
                                        onChange={handleSaveInput}
                                        label="Category"
                                        name="category">
                                        <MenuItem value={'expense'}>
                                            Expense
                                        </MenuItem>
                                        <MenuItem value={'income'}>
                                            Income
                                        </MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl margin="dense" variant="outlined">
                                    <InputLabel htmlFor="amount">
                                        Amount
                                    </InputLabel>
                                    <OutlinedInput
                                        id="amount"
                                        type="number"
                                        name="amount"
                                        value={newTransactionData.amount}
                                        onChange={handleSaveInput}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                $
                                            </InputAdornment>
                                        }
                                        labelWidth={60}
                                    />
                                </FormControl>
                            </div>

                            <div className="d-flex">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker
                                        margin="dense"
                                        inputVariant="outlined"
                                        className="flex-fill mr-3"
                                        id="date-picker-dialog"
                                        label="Date"
                                        name="date"
                                        value={newTransactionData.date}
                                        autoOk
                                        disableFuture
                                        onChange={handleSaveDate}
                                        animateYearScrolling
                                        format="dd/MM/yyyy"
                                    />
                                    <TimePicker
                                        margin="dense"
                                        inputVariant="outlined"
                                        className="flex-fill"
                                        id="time-picker"
                                        label="Time"
                                        name="time"
                                        value={newTransactionData.date}
                                        autoOk
                                        onChange={handleSaveDate}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>

                            <div className="d-flex justify-content-around mt-4">
                                <Fab
                                    variant="extended"
                                    aria-label="cancel"
                                    size="medium"
                                    className="cancel-entry"
                                    onClick={handleCloseModal}>
                                    <CancelIcon className="mr-3" />
                                    Cancel
                                </Fab>
                                <Fab
                                    variant="extended"
                                    aria-label="add"
                                    size="medium"
                                    className="save-entry"
                                    onClick={handleSaveData}>
                                    <SaveIcon className="mr-3" />
                                    Save
                                </Fab>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default connect()(AddNewTransaction);
