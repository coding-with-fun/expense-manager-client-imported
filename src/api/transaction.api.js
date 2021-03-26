import axios from 'axios';
import { endpoints } from '../config/appConfigs';

const transactionRoot = endpoints.expenseManagerRoot + '/transaction';

const ADD_TRANSACTION = transactionRoot + '/add';
const UPDATE_TRANSACTION = transactionRoot + '/update';
const DELETE_TRANSACTION = transactionRoot + '/delete';

export const addTransaction = async (body) => {
    const headers = {
        'x-auth-token': 'Bearer ' + localStorage.getItem('emc-token'),
    };

    const response = await axios.post(ADD_TRANSACTION, body, { headers });
    return response.data;
};

export const updateTransaction = async (body, id) => {
    const headers = {
        'x-auth-token': 'Bearer ' + localStorage.getItem('emc-token'),
    };

    const response = await axios.put(UPDATE_TRANSACTION + '?id=' + id, body, {
        headers,
    });
    return response.data;
};

export const deleteTransaction = async (id) => {
    const headers = {
        'x-auth-token': 'Bearer ' + localStorage.getItem('emc-token'),
    };

    const response = await axios.delete(DELETE_TRANSACTION + '?id=' + id, {
        headers,
    });
    return response.data;
};
