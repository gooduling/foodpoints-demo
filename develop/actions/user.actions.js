import api from '../api';
import apiActions from './api.actions';
import userTypes from './types/user.types';

export const login = (params = {}) => (dispatch) => {
    return api.foodpoints.login(params).then(
        (data) => {
            dispatch({ type: userTypes.LOG_IN, payload: data });
        },
        (error) => {
            console.error(error);
            dispatch(apiActions.failure(userTypes.LOG_IN, error));
        }
    );
};

export const logout = () => ({
    type: userTypes.LOG_OUT,
});

export const signUp = (params = {}) => (dispatch) => {
    return api.foodpoints.addUser(params).then(
    (data) => {
        dispatch(apiActions.success(userTypes.LOG_IN, data));
    },
    (error) => {
        console.error(error);
        dispatch(apiActions.failure(userTypes.LOG_IN, error));
    }
  );
};

export const selectUser = (params = {}) => (dispatch) => {
    dispatch(apiActions.request(userTypes.SELECT_USER));
    return api.foodpoints.selectUser(params).then(
        (data) => {
            dispatch(apiActions.success(userTypes.SELECT_USER, data));
        },
        (error) => {
            dispatch(apiActions.failure(userTypes.SELECT_USER, error));
        }
    );
};

export const joinAppointment = (params = {}) => (dispatch) => {
    dispatch(apiActions.request(userTypes.ADD_APPOINTMENT));
    return api.foodpoints.joinAppointment(params).then(
        (data) => {
            dispatch(apiActions.success(userTypes.ADD_APPOINTMENT, data));
        },
        (error) => {
            dispatch(apiActions.failure(userTypes.ADD_APPOINTMENT, error));
        }
    );
};
