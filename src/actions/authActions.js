export const setUserToken = (token) => {
    return {
        type: 'SET_USER_TOKEN',
        payload: {
            token,
        },
    };
};

export const removeUserToken = () => {
    return {
        type: 'REMOVE_USER_TOKEN',
    };
};

export const checkUserAuthentication = () => {
    return {
        type: 'CHECK_USER_AUTHENTICATION',
    };
};
