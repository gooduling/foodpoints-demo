import fpTypes from '../actions/types/foodpoints.types';
import userTypes from '../actions/types/user.types';

const DEFAULT_STATE = {
    filterParams: {
        dayParam: [],
        timeParam: [],
        keywordParam: '',
    },
    foodpoints: [],
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case fpTypes.SET_FILTERPARAMS: return setFilterParams(state, action);
        case fpTypes.SET_TIMESEARCHPARAMS: return setTimeSearchParams(state, action);
        case userTypes.ADD_APPOINTMENT: return addAppointmentToFoodpoint(state, action);
        case fpTypes.GET_FOODPOINTS: return getFoodpoints(state, action);
        case fpTypes.CLEAR_DATA_STATE: return clearDataState(state, action);

        default:
            return state;
    }
};

function addAppointmentToFoodpoint(state, { payload: { meeting, currentUser: { id, name, avatar }, isLeaveAction } }) {
    const { foodpoints } = state;
    const foodpointIndex = state.foodpoints.findIndex(item => item.foodpointId === meeting.foodpointId);
    const newFoodpoint = foodpoints[foodpointIndex];
    const { meetingSlots } = newFoodpoint;
    const meetingIndex = meetingSlots.findIndex(item => item.meetingId === meeting.meetingId);
    const { users } = meetingSlots[meetingIndex];
    if (isLeaveAction) {
        const userIndex = users.findIndex(item => item.id === id);
        users.splice(userIndex, 1);
    } else {
        users.push({ id, name, avatar });
    }
    meetingSlots[meetingIndex].isJoined = !isLeaveAction;
    return {
        ...state,
        foodpoints: [
            ...foodpoints.slice(0, foodpointIndex),
            newFoodpoint,
            ...foodpoints.slice(foodpointIndex + 1),
        ],
    };
}

function setFilterParams(state, action) {
    return {
        ...state,
        filterParams: action.payload,
    };
}

function setTimeSearchParams(state, action) {
    return {
        ...state,
        searchParams: {
            ...state.filterParams,
            byTime: action.payload.byTime,
        },
    };
}

function getFoodpoints(state, action) {
    return {
        ...state,
        foodpoints: [...action.payload],
    };
}

function clearDataState() {
    return {
        ...DEFAULT_STATE,
    };
}
