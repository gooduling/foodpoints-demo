import { expect } from 'chai';

import uTypes from '../../develop/actions/types/user.types';
import userReducer from '../../develop/reducers/user.reducer';
import rootReducer from '../../develop/reducers/root.reducer';

const expectedState = {
    'api': {},
    'common': {
        'modalData': {},
        'isModalOpen': false,
    },
    'foodpoints': {
        'filterParams': {
            'dayParam': [],
            'keywordParam': '',
            'timeParam': [],
        },
        'foodpoints': [],
    },
    'user': {
        'currentUser': {
            'appointments': [],
        },
        'isLogged': false,
        'selectedUser': {
            'appointments': [],
        },
    },
    'pickersDemo': {
        time: {},
        day: 3,
        color: '#e00',
        number: 56,
    },
};

describe('Root reducer', () => {
    it('init action: should return the initial state', () => {
        expect(
            rootReducer(undefined, {})
        ).to.deep.equal(expectedState);
    });
});

describe('Reducers: users', () => {
    const defaultUserState = expectedState.user;
    const userData = {
        'id': 'test@gmail.com',
        'email': 'test@gmail.com',
        'city': 'San francisco',
        'appointments': [],
    };

    it('init action: should return the initial state', () => {
        expect(userReducer(undefined, {})).to.deep.equal(defaultUserState);
    });

    it('LOG_IN', () => {
        const testedUserState = userReducer(undefined, {
            type: uTypes.LOG_IN,
            payload: userData,
        });

        expect(testedUserState.currentUser).to.deep.equal(userData);
        expect(testedUserState.isLogged).to.deep.equal(true);
    });

    it('LOG_OUT', () => {
        const testedUserState = userReducer(undefined, {
            type: uTypes.LOG_OUT,
        });

        expect(testedUserState.currentUser).to.deep.equal(defaultUserState.currentUser);
        expect(testedUserState.isLogged).to.deep.equal(false);
    });

    it('SELECT_USER', () => {
        const testedUserState = userReducer(undefined, {
            type: uTypes.SELECT_USER,
            payload: userData,
        });

        expect(testedUserState.selectedUser).to.deep.equal(userData);
    });

    it('ADD_APPOINTMENT', () => {
        const testedUserState = userReducer(undefined, {
            type: uTypes.ADD_APPOINTMENT,
            payload: { meeting: 'test' },
        });

        expect(testedUserState.currentUser.appointments[0]).to.equal('test');
    });
});
