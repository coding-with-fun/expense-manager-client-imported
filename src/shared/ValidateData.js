const oneAlphabetRegex = /\w*[a-zA-Z]\w*/i;

export const ValidateUsername = (data) => {
    return oneAlphabetRegex.test(data.username);
};

export const ValidatePassword = (data) => {
    return oneAlphabetRegex.test(data.password);
};
