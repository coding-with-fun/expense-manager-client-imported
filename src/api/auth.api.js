import axios from 'axios';
import { endpoints } from '../config/appConfigs';

const expenseManagerRoot = endpoints.expenseManagerRoot;

const SIGNIN_URL = expenseManagerRoot + '/signin';
const SIGNUP_URL = expenseManagerRoot + '/signup';

export const userSignIn = async (body) => {
    await axios.post(SIGNIN_URL, body);
    return body;
};

export const userSignUp = async (body) => {
    await axios.post(SIGNUP_URL, body);
    return body;
};
