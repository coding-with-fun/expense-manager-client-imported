import axios from 'axios';
import { endpoints } from '../config/appConfigs';
import { AxiosConfig as headers } from '../shared/AxiosConfig';

const authRoot = endpoints.expenseManagerRoot + '/auth';

const SIGNIN_URL = authRoot + '/signin';
const SIGNUP_URL = authRoot + '/signup';

export const authenticateUser = async (body, routeType) => {
    const response = await axios.post(
        routeType === 0 ? SIGNIN_URL : SIGNUP_URL,
        body,
        { headers }
    );
    return response.data;
};
