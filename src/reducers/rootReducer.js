import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userDataReducer from './transactionsReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    transactions: userDataReducer,
});

export default rootReducer;
