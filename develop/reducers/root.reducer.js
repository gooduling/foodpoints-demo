import { combineReducers } from 'redux';

/**
 * Reducers
 */
import foodpoints from './foodpoints.reducer';
import common from './common.reducer';
import api from './api.reducer';
import user from './user.reducer';


const rootReducer = combineReducers({
    foodpoints,
    common,
    api,
    user
});

export default rootReducer;
