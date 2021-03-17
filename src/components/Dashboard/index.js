import { Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(2, 0),
        padding: theme.spacing(2, 0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '88vh',
        background: 'pink',
        flexGrow: 1,
    },
    gridItems: {
        textAlign: 'center',
    },
}));

const Dashboard = () => {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={1} className={classes.paper}>
                <Grid container justify="center" spacing={3}>
                    <Grid item xs={12} sm={6} className={classes.gridItems}>
                        Dashboard
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.gridItems}>
                        Dashboard
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default Dashboard;
