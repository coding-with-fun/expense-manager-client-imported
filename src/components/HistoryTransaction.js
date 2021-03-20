import { Paper, Popover } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from 'react';

const HistoryTransaction = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Paper variant="outlined" className="history-transaction-container">
            <div className="details">
                <div className="info w-100 mr-3">
                    <div className="date mb-3">12 Jan 2020</div>
                    <div className="title">Hello</div>
                </div>
                <div className="amount">$300</div>
            </div>
            <div className="success-status" onClick={handleClick}>
                <ArrowRightIcon />
            </div>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                className="history-transaction-popover-container ml-4">
                <Fab size="small" aria-label="edit" className="mb-2 edit-icon">
                    <EditIcon />
                </Fab>
                <Fab size="small" aria-label="edit" className="delete-icon">
                    <DeleteIcon />
                </Fab>
            </Popover>
        </Paper>
    );
};

export default HistoryTransaction;
