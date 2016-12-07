import api from '../api';
import apiActions from './api.actions';
import fpTypes from './types/foodpoints.types';
import fpMapper from '../utils/foodpoints.mapper';

export const setFilters = (payload) => ({
    type: fpTypes.SET_FILTERPARAMS,
    payload,
});

export const getFoodpoints = (params = {}) => (dispatch) => {
    dispatch(apiActions.request(fpTypes.GET_FOODPOINTS));

    if (params.filterParams) dispatch(setFilters(params.filterParams));

    return api.foodpoints.getFoodpoints(params).then(
        (data) => {
            // Map API response
            const mResponse = fpMapper.res.getAll(data);  
            dispatch(apiActions.success(fpTypes.GET_FOODPOINTS, mResponse));
        },
        (error) => {
            dispatch(apiActions.failure(fpTypes.GET_FOODPOINTS, error));
        }
    );
};

export const clearDataState = () => ({
    type: fpTypes.CLEAR_DATA_STATE,
});
