import userTypes from '../actions/types/user.types';

const DEFAULT_STATE = {
    currentUser: {
      appointments: []
    },
    selectedUser: {
      appointments: []
    },
    isLogged: false
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case userTypes.LOG_IN: return logIn(state, action);
        case userTypes.LOG_OUT: return logOut(state);
        case userTypes.SELECT_USER: return selectUser(state, action);
        case userTypes.ADD_APPOINTMENT: return addAppointment(state, action);

        default: return state;
    }
};

function logIn(state, action) {
    return {
        ...state,
        currentUser: {
            ...state.currentUser,
            ...action.payload,
        },
        isLoading: false,
        isLogged: true
    };
}

function logOut(state) { 
    return {
        ...state,
        isLogged: false,
        currentUser: DEFAULT_STATE.currentUser
    };
}

function addAppointment(state, action) {
    const updatedAppointments = [...state.currentUser.appointments];
    updatedAppointments.push(action.payload.meeting);   
    return {
        ...state,
        currentUser: {
            ...state.currentUser,
            appointments: updatedAppointments,
        }
    };
}


function selectUser(state, action) {
    return {
        ...state,
        selectedUser: action.payload
    };
}