import { combineReducers } from 'redux';
import authReducer from './authReducer';
import transactionsReducer from './transactionsReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    transactions: transactionsReducer,
    user: userReducer,
});

export default rootReducer;
