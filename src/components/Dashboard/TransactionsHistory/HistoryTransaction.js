import { Paper, Popover } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
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
                }}>
                The content of the Popover.
            </Popover>
        </Paper>
    );
};

export default HistoryTransaction;
