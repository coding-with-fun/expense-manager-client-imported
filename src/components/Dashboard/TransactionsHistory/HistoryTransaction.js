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
                <div className="title">Hello</div>
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
                <Fab
                    size="small"
                    aria-label="add"
                    className="mb-2"
                    style={{ background: '#28a745', color: '#fff' }}>
                    <EditIcon />
                </Fab>
                <Fab
                    size="small"
                    color="secondary"
                    aria-label="edit"
                    style={{ background: '#dc3545', color: '#fff' }}>
                    <DeleteIcon />
                </Fab>
            </Popover>
        </Paper>
    );
};

export default HistoryTransaction;
