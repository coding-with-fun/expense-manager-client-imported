import DateFnsUtils from '@date-io/date-fns';
import {
    Backdrop,
    CircularProgress,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    Fade,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Modal,
    OutlinedInput,
    Select,
    Slide,
    TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    Close as CloseIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Save as SaveIcon,
} from '@material-ui/icons';
import {
    DatePicker,
    MuiPickersUtilsProvider,
    TimePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setTransactions } from '../../actions/transactionsActions';
import {
    deleteTransaction,
    updateTransaction,
} from '../../api/transaction.api';
import ToastNotification from '../../shared/ToastNotification';

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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const TransactionInfoModal = ({
    isModalOpen,
    setIsModalOpen,
    transaction,
    dispatch,
}) => {
    const [newTransactionData, setNewTransactionData] = useState({
        title: '',
        description: '',
        category: 'expense',
        amount: '',
        date: moment().format(),
    });
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [editEntry, setEditEntry] = useState(false);
    const [loadingDeleteEntry, setLoadingDeleteEntry] = useState(false);
    const [loadingSaveEntry, setLoadingSaveEntry] = useState(false);

    const classes = useStyles();

    useEffect(() => {
        setNewTransactionData({
            title: transaction.title,
            description: transaction.description,
            category: transaction.category,
            amount: transaction.amount,
            date: moment.unix(transaction.date).format(),
        });
    }, [transaction]);

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
        setLoadingSaveEntry(true);
        const data = {
            ...newTransactionData,
            date: moment(newTransactionData.date).format('X'),
        };
        updateTransaction(data, transaction._id)
            .then((response) => {
                const apiRes = response.success;
                ToastNotification(apiRes.message, 'success');
                dispatch(setTransactions(apiRes.transactionList));
                setLoadingSaveEntry(false);
                handleCloseModal();
            })
            .catch((error) => {
                console.error(error.response.data.error);
                ToastNotification(error.response.data.error.message);
                setLoadingSaveEntry(false);
            });
    };

    const handleDeleteEntry = () => {
        setLoadingDeleteEntry(true);
        setIsDeleteAlertOpen(false);
        deleteTransaction(transaction._id)
            .then(async (response) => {
                const apiRes = response.success;
                await dispatch(setTransactions(apiRes.transactionList));
                setLoadingDeleteEntry(false);
            })
            .catch((error) => {
                console.error(error.response.data.error);
                ToastNotification(error.response.data.error.message);
            });
    };

    const handleCloseModal = () => {
        setNewTransactionData({
            title: transaction.title,
            description: transaction.description,
            category: transaction.category,
            amount: transaction.amount,
            date: moment.unix(transaction.date).format(),
        });
        setEditEntry(false);
        setIsDeleteAlertOpen(false);
        setIsModalOpen(false);
    };

    return (
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
                <div className={`${classes.paper} new-transaction-modal`}>
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
                        disabled={!editEntry}
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
                        disabled={!editEntry}
                    />

                    <div className="d-flex">
                        <FormControl
                            variant="outlined"
                            margin="dense"
                            className="w-50 flex-fill mr-3"
                            disabled={!editEntry}>
                            <InputLabel htmlFor="category">Category</InputLabel>
                            <Select
                                labelId="category"
                                id="category"
                                value={newTransactionData.category}
                                onChange={handleSaveInput}
                                label="Category"
                                name="category">
                                <MenuItem value={'expense'}>Expense</MenuItem>
                                <MenuItem value={'income'}>Income</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl
                            margin="dense"
                            variant="outlined"
                            disabled={!editEntry}>
                            <InputLabel htmlFor="amount">Amount</InputLabel>
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
                                disabled={!editEntry}
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
                                disabled={!editEntry}
                            />
                        </MuiPickersUtilsProvider>
                    </div>

                    <div className="d-flex justify-content-around mt-4">
                        <Fab
                            variant="extended"
                            aria-label="delete"
                            size="medium"
                            className="delete-entry"
                            onClick={() => setIsDeleteAlertOpen(true)}>
                            {loadingDeleteEntry ? (
                                <CircularProgress
                                    size={24}
                                    style={{
                                        color: '#fff',
                                    }}
                                />
                            ) : (
                                <>
                                    <DeleteIcon className="mr-3" />
                                    Delete
                                </>
                            )}
                        </Fab>
                        {editEntry && (
                            <Fab
                                variant="extended"
                                aria-label="add"
                                size="medium"
                                className="save-entry"
                                disabled={loadingDeleteEntry}
                                onClick={handleSaveData}>
                                {loadingSaveEntry ? (
                                    <CircularProgress
                                        size={24}
                                        style={{
                                            color: '#fff',
                                        }}
                                    />
                                ) : (
                                    <>
                                        <SaveIcon className="mr-3" />
                                        Save
                                    </>
                                )}
                            </Fab>
                        )}
                        {!editEntry && (
                            <Fab
                                variant="extended"
                                aria-label="add"
                                size="medium"
                                className="edit-entry"
                                disabled={loadingDeleteEntry}
                                onClick={() => setEditEntry(true)}>
                                <EditIcon className="mr-3" />
                                Edit
                            </Fab>
                        )}
                    </div>

                    <Dialog
                        open={isDeleteAlertOpen}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={() => setIsDeleteAlertOpen(false)}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description">
                        <DialogTitle id="alert-dialog-slide-title">
                            {'Are you sure to delete the entry?'}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                This will permanently delete your entry. You can
                                not undo the action. Continue?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => setIsDeleteAlertOpen(false)}
                                color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleDeleteEntry} color="primary">
                                Continue
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Fade>
        </Modal>
    );
};

export default connect()(TransactionInfoModal);
