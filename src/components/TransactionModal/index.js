import DateFnsUtils from '@date-io/date-fns';
import {
    Backdrop,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    Fade,
    FormControl,
    FormHelperText,
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
    Cancel as CancelIcon,
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
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setTransactions } from '../../actions/transactionsActions';
import {
    addTransaction,
    deleteTransaction,
    updateTransaction,
} from '../../api/transaction.api';
import ToastNotification from '../../shared/ToastNotification';
import { RemoveWhiteSpace } from '../../shared/ValidateData';

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

const TransactionModal = ({
    isModalOpen,
    setIsModalOpen,
    transaction,
    type,
    dispatch,
}) => {
    const initialState = {
        title: type === 0 ? '' : transaction.title,
        description: type === 0 ? '' : transaction.description,
        category: type === 0 ? 'expense' : transaction.category,
        amount: type === 0 ? '' : transaction.amount,
        date:
            type === 0
                ? moment().format()
                : moment.unix(transaction.date).format(),
    };

    const initialErrorState = {
        titleMessage: '',
        titleError: false,
        descriptionMessage: '',
        descriptionError: false,
        categoryMessage: '',
        categoryError: false,
        amountMessage: '',
        amountError: false,
        dateMessage: '',
        dateError: false,
    };

    const [newTransactionData, setNewTransactionData] = useState(initialState);
    const [newTransactionErrorData, setNewTransactionErrorData] = useState(
        initialErrorState
    );
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [editEntry, setEditEntry] = useState(false);
    const [loadingDeleteEntry, setLoadingDeleteEntry] = useState(false);
    const [loadingSaveEntry, setLoadingSaveEntry] = useState(false);

    const classes = useStyles();

    const handleSaveInput = (event) => {
        const inputName = event.target.name;

        setNewTransactionData((userInput) => ({
            ...userInput,
            [inputName]:
                inputName === 'amount' && event.target.value
                    ? parseInt(event.target.value)
                    : event.target.value,
        }));

        setNewTransactionErrorData((newTransactionErrorData) => ({
            ...newTransactionErrorData,
            [`${inputName}Error`]: event.target.value
                ? !RemoveWhiteSpace(event.target.value)
                : false,
            [`${inputName}Message`]:
                event.target.value && !RemoveWhiteSpace(event.target.value)
                    ? `Please enter a ${inputName}`
                    : '',
        }));
    };

    const handleSaveDate = (data) => {
        setNewTransactionData((userInput) => ({
            ...userInput,
            date: moment(data).format(),
        }));
    };

    const validateData = () => {
        const data = {
            ...newTransactionData,
            date: moment(newTransactionData.date).format('X'),
        };

        console.log(data);

        for (let field in data) {
            if (!RemoveWhiteSpace(data[`${field}`])) {
                setNewTransactionErrorData((newTransactionErrorData) => ({
                    ...newTransactionErrorData,
                    [`${field}Message`]: `Please enter a ${field}`,
                    [`${field}Error`]: true,
                }));
                return;
            }
        }

        handleSaveData(data);
    };

    const handleSaveData = (data) => {
        setLoadingSaveEntry(true);
        if (type === 0) {
            addTransaction(data)
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
        } else {
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
        }
    };

    const handleDeleteEntry = () => {
        setLoadingDeleteEntry(true);
        setIsDeleteAlertOpen(false);
        deleteTransaction(transaction._id)
            .then((response) => {
                const apiRes = response.success;
                ToastNotification(apiRes.message, 'success');
                setLoadingDeleteEntry(false);
                setIsModalOpen(false);
                dispatch(setTransactions(apiRes.transactionList));
            })
            .catch((error) => {
                console.error(error.response.data.error);
                ToastNotification(error.response.data.error.message);
            });
    };

    const handleCloseModal = () => {
        setNewTransactionData(initialState);
        setNewTransactionErrorData(initialErrorState);
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
                        autoFocus
                        disabled={
                            (type !== 0 && !editEntry) || loadingSaveEntry
                        }
                        error={newTransactionErrorData.titleError}
                        helperText={newTransactionErrorData.titleMessage}
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
                        disabled={
                            (type !== 0 && !editEntry) || loadingSaveEntry
                        }
                        error={newTransactionErrorData.descriptionError}
                        helperText={newTransactionErrorData.descriptionMessage}
                    />

                    <div className="d-flex">
                        <FormControl
                            variant="outlined"
                            margin="dense"
                            className="w-50 flex-fill mr-3"
                            error={newTransactionErrorData.categoryError}>
                            <InputLabel htmlFor="category">Category</InputLabel>
                            <Select
                                labelId="category"
                                id="category"
                                value={newTransactionData.category}
                                onChange={handleSaveInput}
                                label="Category"
                                name="category"
                                disabled={
                                    (type !== 0 && !editEntry) ||
                                    loadingSaveEntry
                                }>
                                <MenuItem value={'expense'}>Expense</MenuItem>
                                <MenuItem value={'income'}>Income</MenuItem>
                            </Select>
                            <FormHelperText>
                                {newTransactionErrorData.categoryMessage}
                            </FormHelperText>
                        </FormControl>

                        <FormControl
                            margin="dense"
                            variant="outlined"
                            disabled={
                                (type !== 0 && !editEntry) || loadingSaveEntry
                            }
                            error={newTransactionErrorData.amountError}>
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
                            <FormHelperText>
                                {newTransactionErrorData.amountMessage}
                            </FormHelperText>
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
                                disabled={
                                    (type !== 0 && !editEntry) ||
                                    loadingSaveEntry
                                }
                                error={newTransactionErrorData.dateError}
                                helperText={newTransactionErrorData.dateMessage}
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
                                disabled={
                                    (type !== 0 && !editEntry) ||
                                    loadingSaveEntry
                                }
                                error={newTransactionErrorData.dateError}
                                helperText={newTransactionErrorData.dateMessage}
                            />
                        </MuiPickersUtilsProvider>
                    </div>

                    <div className="d-flex justify-content-around mt-4">
                        {type === 0 && (
                            <Fab
                                variant="extended"
                                aria-label="cancel"
                                size="medium"
                                disabled={
                                    loadingDeleteEntry || loadingSaveEntry
                                }
                                className="cancel-entry"
                                onClick={handleCloseModal}>
                                <CancelIcon className="mr-3" />
                                Cancel
                            </Fab>
                        )}
                        {type !== 0 && (
                            <Fab
                                variant="extended"
                                aria-label="delete"
                                size="medium"
                                className="delete-entry"
                                disabled={
                                    loadingDeleteEntry || loadingSaveEntry
                                }
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
                        )}
                        {(editEntry || type === 0) && (
                            <Fab
                                variant="extended"
                                aria-label="add"
                                size="medium"
                                className="save-entry"
                                disabled={
                                    loadingDeleteEntry || loadingSaveEntry
                                }
                                onClick={validateData}>
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
                        {!editEntry && type !== 0 && (
                            <Fab
                                variant="extended"
                                aria-label="add"
                                size="medium"
                                className="edit-entry"
                                disabled={
                                    loadingDeleteEntry || loadingSaveEntry
                                }
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

export default connect()(TransactionModal);
