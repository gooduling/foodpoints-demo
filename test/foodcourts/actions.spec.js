import { expect } from 'chai';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureStore from 'redux-mock-store';
import { httpStatusHandler } from '../../develop/constants/httpErrors.constant.js';

import apiTypes from '../../develop/actions/types/api.types';
import apiActions from '../../develop/actions/api.actions';

import commonTypes from '../../develop/actions/types/common.types';
import * as commonActions from '../../develop/actions/common.actions';

import fpTypes from '../../develop/actions/types/foodpoints.types';
import * as fpActions from '../../develop/actions/foodpoints.actions';

import userTypes from '../../develop/actions/types/user.types';
import * as userActions from '../../develop/actions/user.actions';

/**
 * Add your middlewares like `redux-thunk`
 * @type {Array}
 */
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('API Actions', () => {
    const testType = 'TEST_TYPE';
    const expectedStopLoadingAction = {
        type: apiTypes.SET_LOADING,
        payload: { key: testType, value: false },
    };

    it('request: should create an action SET_LOADING with a proper payload', () => {
        const expectedAction = {
            type: apiTypes.SET_LOADING,
            payload: { key: testType, value: true },
        };

        expect(apiActions.request(testType)).to.deep.equal(expectedAction);
    });

    it('success: should create an action with a type recieved as first argument', () => {
        const store = mockStore({});
        const expectedSuccessAction = {
            type: testType,
        };

        store.dispatch(apiActions.success(testType));
        const requestAction = store.getActions()[0];
        const successAction = store.getActions()[1];

        expect(requestAction).to.deep.equal(expectedStopLoadingAction);
        expect(successAction).to.deep.equal(expectedSuccessAction);
    });

    it('failure: should create an action SET_ERROR with a proper payload', () => {
        const store = mockStore({});
        const error = {
            testData: 'test error message',
            status: 500,
        };
        const expectedErrorAction = {
            type: apiTypes.SET_ERROR,
            error: {
                key: testType,
                value: {
                    ...error,
                    ...httpStatusHandler(error.status),
                },
            },
        };
        store.dispatch(apiActions.failure(testType, error));
        const requestAction = store.getActions()[0];
        const successAction = store.getActions()[1];

        expect(requestAction).to.deep.equal(expectedStopLoadingAction);
        expect(successAction).to.deep.equal(expectedErrorAction);
    });

    it('clearState: should create an action CLEAR_API_STATE with a proper payload', () => {
        const expectedAction = {
            type: apiTypes.CLEAR_API_STATE,
            payload: { key: testType },
        };

        expect(apiActions.clearState(testType)).to.deep.equal(expectedAction);
    });
});

describe('Common Actions', () => {
    const testPayload = { test: true };
    it('openModal: should create an action SET_LOADING with a proper payload', () => {
        const expectedAction = {
            type: commonTypes.OPEN_MODAL,
            payload: testPayload,
        };

        expect(commonActions.openModal(testPayload)).to.deep.equal(expectedAction);
    });

    it('closeModal: should create an action SET_LOADING with a proper payload', () => {
        const expectedAction = {
            type: commonTypes.CLOSE_MODAL,
        };

        expect(commonActions.closeModal()).to.deep.equal(expectedAction);
    });
});

describe('Foodpoints Actions', () => {
    it('getFoodpoints: should create an action to get foodpoints', () => {
        nock('https://data.sfgov.org/resource/bbb8-hzi6.json')
        .get('')
        .reply(200, [{}, {}]);

        const store = mockStore({});
        const expectedAction = {
            type: fpTypes.GET_FOODPOINTS,
            payload: [],
        };

        return store.dispatch(fpActions.getFoodpoints())
            .then(() => {
                // As #0 and #1 actions are api meta-actions ("request" and "success")
                // We are looking for the next action #2:
                const testedAction = store.getActions()[2];
                expect(testedAction).to.deep.equal(expectedAction);
            });
    });

    it('clearDataState: should create an action to delete all foodpoints', () => {
        const expectedAction = {
            type: fpTypes.CLEAR_DATA_STATE,
        };

        expect(fpActions.clearDataState()).to.deep.equal(expectedAction);
    });
});
// TODO: Add tests for users actions when users will be saved on server
// Now it is hard to omit LocalStorage
// describe('User Actions', () => {
//     const testUser =  {
//             id: 1001,
//             name: 'John Fork',
//             city: 'San Francisco',
//             age: 12,
//             avatar: 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png',
//             appointments: []
//         };
//     it('selectUser: should create an action SELECT_USER', () => {
//
//         const store = mockStore({});
//         const expectedAction = {
//             type: userTypes.SELECT_USER,
//             payload: testUser
//         };
//
//         return store.dispatch(userActions.selectUser({}))
//             .then(() => {
//                 // As #0 and #1 actions are api meta-actions
//                 // We are looking for the next action #2:
//                 const testedAction = store.getActions()[2];
//                 expect(testedAction).to.deep.equal(expectedAction);
//             });
//     });
// });

