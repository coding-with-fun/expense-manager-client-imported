export const setUserDetails = (data) => {
    return {
        type: 'SET_USER_DETAILS',
        payload: {
            data,
        },
    };
}