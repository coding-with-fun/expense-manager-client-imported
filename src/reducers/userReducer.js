const initialState = {
    userDetails: [],
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_DETAILS':
            return {
                ...state,
                userDetails: action.payload.data,
            };

        default:
            return state;
    }
};

export default userReducer;
