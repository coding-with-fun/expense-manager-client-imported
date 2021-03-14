import {
    Button,
    Container,
    Grid,
    Link,
    TextField,
    Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { ValidatePassword, ValidateUsername } from "../../shared/ValidateData";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(4, 0, 2)
    },
    signInLink: {
        cursor: "pointer"
    }
}));

const SignUp = () => {
    const classes = useStyles();
    const history = useHistory();

    const [userInput, setUserInput] = useState({
        username: "",
        usernameError: false,
        password: "",
        passwordError: false
    });

    const submitSignUpData = () => {
        if (!ValidateUsername(userInput)) {
            setUserInput((userInput) => ({
                ...userInput,
                usernameError: true
            }));
        }
        if (!ValidatePassword(userInput)) {
            setUserInput((userInput) => ({
                ...userInput,
                passwordError: true
            }));
        }
    };

    const handleInput = (e) => {
        setUserInput((userInput) => ({
            ...userInput,
            [e.target.name]: e.target.value
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
                        autoComplete="username"
                        value={userInput.username}
                        onChange={(e) => handleInput(e)}
                        autoFocus
                        error={userInput.usernameError}
                        helperText={
                            userInput.usernameError
                                ? "Please enter a valid username."
                                : "Username should have at least one alphabet."
                        }
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        value={userInput.password}
                        onChange={(e) => handleInput(e)}
                        error={userInput.passwordError}
                        helperText={
                            userInput.usernameError
                                ? "Please enter a valid password."
                                : "Password should have at least one alphabet."
                        }
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="outlined"
                        color={
                            userInput.usernameError || userInput.passwordError
                                ? "secondary"
                                : "primary"
                        }
                        className={classes.submit}
                        onClick={submitSignUpData}>
                        Sign Up
                    </Button>
                    <Grid container className={"justify-content-center"}>
                        <Grid item className="d-flex">
                            <Typography variant="body1" className="mr-1">
                                Don't have an account?
                            </Typography>
                            <Link
                                variant="body1"
                                onClick={() => history.push("/signin")}
                                className={classes.signInLink}>
                                {"Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default SignUp;
