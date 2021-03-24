export const setTransactions = (data) => {
    return {
        type: 'SET_TRANSACTIONS',
        payload: {
            data,
        },
    };
};
