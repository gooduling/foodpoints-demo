import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Router } from 'react-router';

import getRoutes from './config/appRoutes.jsx';
import configureStore from './store/root.store';
import appHistory from './config/appHistory';

const initialState = {};
const store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <Router history={appHistory}>
            {getRoutes(store)}
        </Router>
    </Provider>,

    document.getElementById('react-view')
);

