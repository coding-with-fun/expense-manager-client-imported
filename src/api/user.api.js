import axios from 'axios';
import { endpoints } from '../config/appConfigs';
import { AxiosConfig } from '../shared/AxiosConfig';

const userRoot = endpoints.expenseManagerRoot + '/user';

const GET_USER_DETAILS = userRoot;

console.log(
    'AxiosConfig :: ',
    AxiosConfig,
    ' token :: ',
    localStorage.getItem('emc-token')
);

export const getUserDetails = async () => {
    const response = await axios.get(GET_USER_DETAILS, AxiosConfig);
    return response.data;
};
