import {
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Select,
    TextField,
} from '@material-ui/core';
import React, { Fragment } from 'react';

const NewTransactionModal = () => {
    return (
        <Fragment>
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

            <div>
                <FormControl variant="outlined" margin="dense" className="w-25">
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

                <FormControl margin="dense" variant="outlined" className="w-75">
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
        </Fragment>
    );
};

export default NewTransactionModal;
