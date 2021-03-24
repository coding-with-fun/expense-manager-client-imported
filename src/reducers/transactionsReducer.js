const initialState = {
    transactions: [],
};

const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TRANSACTIONS':
            action.payload.data.sort(
                (a, b) => parseFloat(b.date) - parseFloat(a.date)
            );

            return {
                ...state,
                transactions: [...action.payload.data],
            };

        default:
            return state;
    }
};

export default transactionsReducer;
