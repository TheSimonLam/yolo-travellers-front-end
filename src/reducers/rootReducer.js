import { combineReducers } from 'redux';
import accountReducer from './accountReducer'
import authReducer from './authReducer'

export default combineReducers({
    accountReducer,
    authReducer
});