import { Container, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import IndividualBalance from './IndividualBalance';
import TotalBalance from './TotalBalance';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(3, 0),
        padding: theme.spacing(2, 0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '86vh',
        flexGrow: 1,
    },
}));

const Dashboard = () => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={0} className={classes.paper}>
                <TotalBalance />
                <IndividualBalance />
            </Paper>
        </Container>
    );
};

export default Dashboard;
