import DateFnsUtils from '@date-io/date-fns';
import {
    Fab,
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Select,
    TextField,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import {
    KeyboardDatePicker,
    KeyboardTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import React from 'react';

const NewTransactionModal = () => {
    return (
        <div className="new-transaction-modal">
            <TextField
                id="outlined-basic"
                label="Title"
                variant="outlined"
                margin="dense"
                fullWidth
            />

            <TextField
                id="outlined-multiline-flexible"
                label="Description"
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
                    className="flex-fill mr-3">
                    <InputLabel htmlFor="outlined-age-native-simple">
                        Category
                    </InputLabel>
                    <Select
                        native
                        label="Category"
                        defaultValue={'Expense'}
                        inputProps={{
                            name: 'category',
                            id: 'outlined-category-native-simple',
                        }}>
                        <option value={'Expense'}>Expense</option>
                        <option value={'Income'}>Income</option>
                    </Select>
                </FormControl>

                <FormControl
                    margin="dense"
                    variant="outlined"
                    className="flex-fill">
                    <InputLabel htmlFor="outlined-adornment-amount">
                        Amount
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        startAdornment={
                            <InputAdornment position="start">$</InputAdornment>
                        }
                        labelWidth={60}
                    />
                </FormControl>
            </div>

            <MuiPickersUtilsProvider utils={DateFnsUtils} className="d-flex">
                <KeyboardDatePicker
                    margin="dense"
                    inputVariant="outlined"
                    className="flex-fill mr-3"
                    id="date-picker-dialog"
                    label="Date"
                    format="MM/dd/yyyy"
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                <KeyboardTimePicker
                    margin="dense"
                    inputVariant="outlined"
                    id="time-picker"
                    label="Time"
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                />
            </MuiPickersUtilsProvider>

            <div className="d-flex justify-content-around mt-4">
                <Fab
                    variant="extended"
                    aria-label="cancel"
                    size="medium"
                    className="cancel-entry">
                    <CancelIcon className="mr-3" />
                    Cancel
                </Fab>
                <Fab
                    variant="extended"
                    aria-label="add"
                    size="medium"
                    className="save-entry">
                    <SaveIcon className="mr-3" />
                    Save
                </Fab>
            </div>
        </div>
    );
};

export default NewTransactionModal;
