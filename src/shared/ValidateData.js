import validator from 'validator';

const oneAlphabetRegex = /\w*[a-zA-Z]\w*/i;

export const RemoveWhiteSpace = (data) => {
    if (typeof data !== 'number') return data.replace(/\s+/g, ' ').trim();
    return data;
};

export const ValidateAlphabet = (data) => {
    return oneAlphabetRegex.test(data);
};

export const ValidateEmail = (data) => {
    return validator.isEmail(data);
};

export const ComparePasswords = (password, confirmPassword) => {
    return password === confirmPassword;
};
