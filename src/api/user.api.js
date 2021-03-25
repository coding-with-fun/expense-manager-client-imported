import axios from 'axios';
import { endpoints } from '../config/appConfigs';
import { AxiosConfig as headers } from '../shared/AxiosConfig';

const userRoot = endpoints.expenseManagerRoot + '/user';

const GET_USER_DETAILS = userRoot;

export const getUserDetails = async () => {
    const response = await axios.get(GET_USER_DETAILS, { headers });
    return response.data;
};
