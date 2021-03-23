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
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import validator from 'validator';
import { setUserToken } from '../../actions/authActions';
import { authenticateUser } from '../../api/auth.api';
import ToastNotification from '../../shared/ToastNotification';
import {
    RemoveWhiteSpace,
    ValidateAlphabet,
    ComparePasswords,
} from '../../shared/ValidateData';

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
    routeLink: {
        cursor: 'pointer',
    },
}));

const AuthForm = ({ dispatch, routeType }) => {
    const classes = useStyles();
    const history = useHistory();

    const initialState = {
        name: '',
        nameError: false,
        nameMessage: 'Name should have at least one alphabet.',
        username: '',
        usernameError: false,
        usernameMessage: 'Username should have at least one alphabet.',
        email: '',
        emailError: false,
        emailMessage: 'Must be a valid email address.',
        password: '',
        passwordError: false,
        passwordMessage: 'Password should have at least one alphabet.',
        confirmPassword: '',
        confirmPasswordError: false,
        confirmPasswordMessage: 'Password should have at least one alphabet.',
    };

    const InputField = (label, name) => {
        return (
            <TextField
                margin="normal"
                required
                fullWidth
                autoFocus={
                    routeType === 0
                        ? name === 'username'
                        : routeType === 1 && name === 'name'
                }
                label={label}
                name={name}
                disabled={loading}
                type={
                    ['password', 'confirmPassword'].includes(name)
                        ? 'password'
                        : 'text'
                }
                autoComplete={name}
                value={userInput[`${name}`]}
                onChange={(e) => handleInput(e)}
                error={userInput[`${name}Error`]}
                helperText={userInput[`${name}Message`]}
            />
        );
    };

    const [userInput, setUserInput] = useState(initialState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setUserInput(initialState);
        // eslint-disable-next-line
    }, [routeType]);

    const handleAuthenticateUser = (data) => {
        setLoading(true);

        let body = {
            userName: data.username,
            password: data.password,
        };

        if (routeType === 1) {
            body = {
                ...body,
                name: data.name,
                email: data.email,
                confirmPassword: data.confirmPassword,
            };
        }
        setUserInput(initialState);

        authenticateUser(body, routeType)
            .then((response) => {
                const apiRes = response.success;
                ToastNotification(apiRes.message, 'success');
                dispatch(setUserToken(apiRes.token));
            })
            .catch((error) => {
                console.error(error.response.data.error);
                ToastNotification(error.response.data.error.message);
                setLoading(false);
            });
    };

    const validateUserData = (e) => {
        e.preventDefault();
        const data = { ...userInput };

        data.name = RemoveWhiteSpace(data.name);
        data.username = RemoveWhiteSpace(data.username);
        data.email = RemoveWhiteSpace(data.email);
        data.password = RemoveWhiteSpace(data.password);
        data.confirmPassword = RemoveWhiteSpace(data.confirmPassword);

        if (routeType === 1 && !ValidateAlphabet(data.name)) {
            setUserInput((userInput) => ({
                ...userInput,
                nameMessage: 'Please enter a valid name.',
                nameError: true,
            }));
            return;
        }

        if (!ValidateAlphabet(data.username)) {
            setUserInput((userInput) => ({
                ...userInput,
                usernameMessage: 'Please enter a valid username.',
                usernameError: true,
            }));
            return;
        }

        if (routeType === 1 && !validator.isEmail(data.email)) {
            setUserInput((userInput) => ({
                ...userInput,
                emailMessage: 'Please enter a valid email address.',
                emailError: true,
            }));
            return;
        }

        if (!ValidateAlphabet(data.password)) {
            setUserInput((userInput) => ({
                ...userInput,
                passwordMessage: 'Please enter a valid password.',
                passwordError: true,
            }));
            return;
        }

        if (routeType === 1 && !ValidateAlphabet(data.confirmPassword)) {
            setUserInput((userInput) => ({
                ...userInput,
                confirmPasswordMessage: 'Please enter a valid password.',
                confirmPasswordError: true,
            }));
            return;
        }

        if (
            routeType === 1 &&
            !ComparePasswords(data.password, data.confirmPassword)
        ) {
            setUserInput((userInput) => ({
                ...userInput,
                passwordMessage: 'Passwords does not match.',
                passwordError: true,
                confirmPasswordMessage: 'Passwords does not match.',
                confirmPasswordError: true,
            }));
            return;
        }

        if (
            !userInput.nameError &&
            !userInput.usernameError &&
            !userInput.emailError &&
            !userInput.passwordError &&
            !userInput.confirmPasswordError
        )
            handleAuthenticateUser(data);
    };

    const handleInput = (e) => {
        setUserInput((userInput) => ({
            ...userInput,
            [`${e.target.name}Error`]:
                e.target.name === 'email'
                    ? !validator.isEmail(e.target.value)
                    : !ValidateAlphabet(e.target.value),
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h3">
                    {routeType === 0 ? 'Sign In' : 'Sign Up'}
                </Typography>
                <form className={classes.form} noValidate>
                    {routeType === 1 && InputField('Name', 'name')}
                    {InputField('Username', 'username')}
                    {routeType === 1 && InputField('Email', 'email')}
                    {InputField('Password', 'password')}
                    {routeType === 1 &&
                        InputField('Confirm Password', 'confirmPassword')}
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
                        onClick={(e) => validateUserData(e)}>
                        {loading ? (
                            <CircularProgress size={24} />
                        ) : routeType === 0 ? (
                            'Sign In'
                        ) : (
                            'Sign Up'
                        )}
                    </Button>
                    <Grid container className={'justify-content-center'}>
                        <Grid item className="d-flex">
                            <Typography variant="body1" className="mr-1">
                                {routeType === 0
                                    ? "Don't have an account?"
                                    : 'Already have an account?'}
                            </Typography>
                            <Link
                                variant="body1"
                                onClick={() =>
                                    history.push(
                                        routeType === 0 ? '/signup' : '/signin'
                                    )
                                }
                                className={classes.routeLink}>
                                {routeType === 0 ? 'Sign Up' : 'Sign In'}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default connect()(AuthForm);
