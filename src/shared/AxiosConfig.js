export const AxiosConfig = {
    headers: {
        'x-auth-token': 'Bearer ' + localStorage.getItem('emc-token'),
    },
};
