import axios from 'axios';
import { endpoints } from '../config/appConfigs';
import { AxiosConfig } from '../shared/AxiosConfig';

const authRoot = endpoints.expenseManagerRoot + '/auth';

const SIGNIN_URL = authRoot + '/signin';
const SIGNUP_URL = authRoot + '/signup';

export const userSignIn = async (body) => {
    const response = await axios.post(SIGNIN_URL, body, AxiosConfig);
    return response.data;
};

export const userSignUp = async (body) => {
    const response = await axios.post(SIGNUP_URL, body, AxiosConfig);
    return response.data;
};
