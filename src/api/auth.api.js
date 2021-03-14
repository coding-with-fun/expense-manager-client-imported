import axios from 'axios';
import { endpoints } from '../config/appConfigs';

const expenseManagerRoot = endpoints.expenseManagerRoot;

const SIGNIN_URL = expenseManagerRoot + '/signin';

export const userSignIn = async (body) => {
    await axios.post(SIGNIN_URL, body);
    return body;
};
