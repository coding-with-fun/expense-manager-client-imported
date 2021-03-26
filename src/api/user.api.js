import axios from 'axios';
import { endpoints } from '../config/appConfigs';

const userRoot = endpoints.expenseManagerRoot + '/user';

const GET_USER_DETAILS = userRoot;

export const getUserDetails = async () => {
    const response = await axios.get(GET_USER_DETAILS);
    return response.data;
};
