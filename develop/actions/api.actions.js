import apiTypes from './types/api.types';
import { httpStatusHandler } from '../constants/httpErrors.constant';

// * Actions structure *
//
// - have a { type } property.
// - have a { error } property.
// - have a { payload } property.
// - have a { meta } property.

export default {
    /* get TYPE as a key and set 'isLoading' for this key in api.reducer */
    request(key, value = true) {
        return {
            type: apiTypes.SET_LOADING,
            payload: { key, value },
        };
    },
/* if success,
    1)call 'request' actionto set 'isLoad' to false,
    2)then dispatch actually an action recieved as first argument (key)
*/
    success(type, payload) {
        return (dispatch) => {
            dispatch(this.request(type, false));

            const action = payload
                ? { type, payload }
                : { type };

            dispatch(action);
        };
    },

    /* if error,
        1)call 'request' actionto set 'isLoad' to false,
        2)dispatch SET_ERROR action for cpecified key to be savedin the api Reducer
    */
    failure(key, error) {
        return (dispatch) => {
            dispatch(this.request(key, false));
            const action = {
                type: apiTypes.SET_ERROR,
                error: {
                    key,
                    value: {
                        ...error,
                        ...httpStatusHandler(error.status),
                    },
                },
            };

            dispatch(action);
        };
    },
/* clear all records for specified key */
    clearState(key) {
        const action = {
            type: apiTypes.CLEAR_API_STATE,
            payload: { key },
        };

        return action;
    },
};
