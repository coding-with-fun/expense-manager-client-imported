import {
    Button,
    CircularProgress,
    Container,
    Grid,
    Link,
    TextField,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { userSignIn } from '../../api/auth.api';
import { UserContext } from '../../context/UserContext';
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

const SignIn = () => {
    const classes = useStyles();
    const history = useHistory();
    const { setUserToken } = useContext(UserContext);

    const [userInput, setUserInput] = useState({
        username: '',
        usernameError: false,
        password: '',
        passwordError: false,
    });
    const [loading, setLoading] = useState(false);

    const handleUserSignIn = async () => {
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

        userSignIn(body)
            .then((response) => {
                console.log(response);
                setLoading(false);
                setUserToken('abc');
            })
            .catch((error) => {
                console.log({ error });
                ToastNotification('Error');

                setLoading(false);
                // TODO Remove it after API integration
                setUserToken('abc');
            });
    };

    const validateSignInData = (e) => {
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

        handleUserSignIn();
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
                    Sign In
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
                        onClick={(e) => validateSignInData(e)}>
                        {loading ? <CircularProgress size={24} /> : 'Sign In'}
                    </Button>
                    <Grid container className={'justify-content-center'}>
                        <Grid item className="d-flex">
                            <Typography variant="body1" className="mr-1">
                                Don't have an account?
                            </Typography>
                            <Link
                                variant="body1"
                                onClick={() => history.push('/signup')}
                                className={classes.signUpLink}>
                                {'Sign Up'}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default SignIn;
