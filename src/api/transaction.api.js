import axios from 'axios';
import { endpoints } from '../config/appConfigs';
import { AxiosConfig } from '../shared/AxiosConfig';

const transactionRoot = endpoints.expenseManagerRoot + '/transaction';

const ADD_TRANSACTION = transactionRoot + '/add';

export const addTransaction = async (body) => {
    const response = await axios.post(ADD_TRANSACTION, body, AxiosConfig);
    return response.data;
};
