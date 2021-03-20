export const getAllTransactions = () => {
    return {
        type: 'GET_ALL_TRANSACTIONS',
    };
};

export const insertTransaction = (entry) => {
    return {
        type: 'INSERT_TRANSACTION',
        payload: {
            entry,
        },
    };
};

export const updateTransaction = (data, index) => {
    return {
        type: 'UPDATE_TRANSACTION',
        payload: {
            data,
            index,
        },
    };
};

export const deleteTransaction = (index) => {
    return {
        type: 'DELETE_TRANSACTION',
        payload: {
            index,
        },
    };
};
