import { expect } from 'chai';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureStore from 'redux-mock-store';

import fpTypes from '../../develop/actions/types/foodpoints.types';
import * as fpActions from '../../develop/actions/foodpoints.actions';


/**
 * Add your middlewares like `redux-thunk`
 * @type {Array}
 */
const middlewares = [thunk];
const mockStore = configureStore(middlewares);


describe('Foodpoints Actions', () => {
    it('getFoodpoints: should create an action to get foodpoints', () => {
    nock('https://data.sfgov.org/resource/bbb8-hzi6.json')
        .get('')
        .reply(200, [{},{}]);

    const store = mockStore({});
        const expectedAction = {
            type: fpTypes.GET_FOODPOINTS,
            payload: []
        };

        return store.dispatch(fpActions.getFoodpoints())
            .then(() => {
                //As #0 and #1 actions are api meta-actions ("request" and "success")
                //We are looking for the next action #2:
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