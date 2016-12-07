import React from 'react';
import HeaderUserInfo from './HeaderUserInfo.jsx';
import { IndexLink } from 'react-router';

const MainHeader = (props) => (
    <header className="mainHeader">
        <div className="logoWrapper">
            <IndexLink className="logo" to="/welcome">
                Nice to eat you!
            </IndexLink>
        </div>
        <HeaderUserInfo {...props} />
    </header>
);

export default MainHeader;   
