const initialState = {
    transactions: [],
    totalIncome: 0,
    totalExpense: 0,
    totalBalance: 0,
};

const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TRANSACTIONS':
            action.payload.data.sort(
                (a, b) => parseFloat(b.date) - parseFloat(a.date)
            );

            let totalIncome = 0;
            let totalExpense = 0;
            let totalBalance = 0;

            action.payload.data.map((transaction) => {
                if (transaction.category === 'income') {
                    totalIncome += transaction.amount;
                    totalBalance += transaction.amount;
                } else if (transaction.category === 'expense') {
                    totalExpense += transaction.amount;
                    totalBalance -= transaction.amount;
                }

                return { totalIncome, totalExpense, totalBalance };
            });
            return {
                ...state,
                transactions: [...action.payload.data],
                totalIncome,
                totalExpense,
                totalBalance,
            };

        default:
            return state;
    }
};

export default transactionsReducer;
