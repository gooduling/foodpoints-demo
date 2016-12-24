import cTypes from '../actions/types/common.types';

const DEFAULT_STATE = {
    time: {},
    day: 3,
    color: "#500",
    number: 56
}
;

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case cTypes.SET_PICKERSDEMO: return setPickers(state, action.payload);

        default: return state;
    }
};

function setPickers(state, {key, value}) {
    let newState = {...state};
    newState[key] = value;
    return newState;
}