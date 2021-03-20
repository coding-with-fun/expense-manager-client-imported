const initialState = {
    token: undefined,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_TOKEN':
            localStorage.setItem('emc-token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
            };

        case 'REMOVE_USER_TOKEN':
            localStorage.removeItem('emc-token');
            return {
                ...state,
                token: undefined,
            };

        case 'CHECK_USER_AUTHENTICATION':
            const userToken = localStorage.getItem('emc-token');
            return userToken ? true : false;

        default:
            return state;
    }
};

export default authReducer;
