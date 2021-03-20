const initialState = {
    transactions: [],
};

const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_TRANSACTIONS':
            return state;

        case 'INSERT_TRANSACTION': {
            return {
                ...state,
                transactions: [...state.transactions, action.payload.entry],
            };
        }

        case 'UPDATE_TRANSACTION': {
            const updatedTransaction = action.payload.data;
            let transactionList = [...state.transactions];
            transactionList[action.payload.index] = updatedTransaction;

            return {
                ...state,
                transactions: transactionList,
            };
        }

        case 'DELETE_TRANSACTION': {
            let transactionList = [...state.transactions];
            transactionList.splice(action.payload.index, 1);

            return {
                ...state,
                transactions: transactionList,
            };
        }

        default:
            return state;
    }
};

export default transactionsReducer;
