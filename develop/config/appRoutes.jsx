import React from 'react';
import { Route, IndexRedirect } from 'react-router';

import App from '../components-containers/App.jsx';
import Layout from '../components-containers/Layout.container.jsx';
import Welcome from '../components-containers/Welcome.container.jsx';
import FoodPoints from '../components-containers/Foodpoints.container.jsx';
import UserProfile from '../components-containers/UserProfile.container.jsx'
import FindPeople from '../components-containers/FindPeople.container.jsx'

const getRoutes = (store) => {
    const requireAuth = (nextState, replace) => {
        const state = store.getState();
        if (!state.user.isLogged) {
            replace('/welcome');
        }
        return true;
    };

    return (
        <Route path="/" component={App}>
            <Route component={Layout}>
                <IndexRedirect to="welcome"/>
                <Route path="welcome" component={Welcome}/>
                <Route path="users/:id" component={UserProfile} onEnter={requireAuth}/>
                <Route path="foodpoints" component={FoodPoints} onEnter={requireAuth}/>
                <Route path="findpeople" component={FindPeople} onEnter={requireAuth}/>
            </Route>
        </Route>
    );
};

export default getRoutes;
