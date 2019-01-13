import { combineReducers } from 'redux';
import accountReducer from './accountReducer'
import travellersReducer from './travellersReducer'
import authReducer from './authReducer'
import tripsReducer from './tripsReducer'
import tripReducer from './tripReducer'

export default combineReducers({
    accountReducer,
    authReducer,
    travellersReducer,
    tripsReducer,
    tripReducer
});