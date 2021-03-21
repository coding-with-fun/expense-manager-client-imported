import {
    Button,
    CircularProgress,
    Container,
    Grid,
    Link,
    TextField,
    Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { userSignUp } from '../../api/auth.api';
import ToastNotification from '../../shared/ToastNotification';
import { ValidatePassword, ValidateUsername } from '../../shared/ValidateData';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(4, 0, 2),
    },
    signUpLink: {
        cursor: 'pointer',
    },
}));

const SignUp = () => {
    const classes = useStyles();
    const history = useHistory();

    const [userInput, setUserInput] = useState({
        username: '',
        usernameError: false,
        password: '',
        passwordError: false,
    });
    const [loading, setLoading] = useState(false);

    const handleUserSignUp = () => {
        setLoading(true);

        const body = {
            username: userInput.username,
            password: userInput.password,
        };
        setUserInput({
            username: '',
            usernameError: false,
            password: '',
            passwordError: false,
        });

        userSignUp(body)
            .then((response) => {
                console.log(response);
                setLoading(false);
            })
            .catch((error) => {
                console.log({ error });

                ToastNotification('Error');
                setLoading(false);
            });
    };

    const validateSignUpData = (e) => {
        e.preventDefault();
        if (!ValidateUsername(userInput)) {
            setUserInput((userInput) => ({
                ...userInput,
                usernameError: true,
            }));
            return;
        }
        if (!ValidatePassword(userInput)) {
            setUserInput((userInput) => ({
                ...userInput,
                passwordError: true,
            }));
            return;
        }

        handleUserSignUp();
    };

    const handleInput = (e) => {
        setUserInput((userInput) => ({
            ...userInput,
            [`${e.target.name}Error`]: !e.target.value.trim(),
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h3">
                    Sign Up
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        name="username"
                        disabled={loading}
                        autoComplete="username"
                        value={userInput.username}
                        onChange={(e) => handleInput(e)}
                        autoFocus
                        error={userInput.usernameError}
                        helperText={
                            userInput.usernameError
                                ? 'Please enter a valid username.'
                                : 'Username should have at least one alphabet.'
                        }
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        name="password"
                        disabled={loading}
                        type="password"
                        autoComplete="current-password"
                        value={userInput.password}
                        onChange={(e) => handleInput(e)}
                        error={userInput.passwordError}
                        helperText={
                            userInput.passwordError
                                ? 'Please enter a valid password.'
                                : 'Password should have at least one alphabet.'
                        }
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        color={
                            userInput.usernameError || userInput.passwordError
                                ? 'secondary'
                                : 'primary'
                        }
                        className={classes.submit}
                        disabled={loading}
                        onClick={(e) => validateSignUpData(e)}>
                        {loading ? <CircularProgress size={24} /> : 'Sign Up'}
                    </Button>
                    <Grid container className={'justify-content-center'}>
                        <Grid item className="d-flex">
                            <Typography variant="body1" className="mr-1">
                                Already have an account?
                            </Typography>
                            <Link
                                variant="body1"
                                onClick={() => history.push('/signin')}
                                className={classes.signUpLink}>
                                {'Sign In'}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default SignUp;
