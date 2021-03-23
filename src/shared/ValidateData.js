import validator from 'validator';

const oneAlphabetRegex = /\w*[a-zA-Z]\w*/i;

export const RemoveWhiteSpace = (data) => {
    return data.replace(/\s+/g, ' ').trim();
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
