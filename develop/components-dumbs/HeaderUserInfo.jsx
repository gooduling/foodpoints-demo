import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

class HeaderUserBlock extends Component {
    render() {
        const { currentUser: { name, avatar, id}, isLogged, isHomeScreen, handleLogout } = this.props;
        if (isLogged) {
            return (
            <div className="headerUserInfoBlock">
                <Link to={`/users/${id}`}>
                  <img className="userIcon" title={`See ${name}'s profile`} src={avatar} alt="User's icon"/>
                  <span className="name"><b>{name}</b></span>
                </Link>
                <button onClick={handleLogout} className="smallBtn">Log Out</button>
            </div>
            )
        } else {
            return isHomeScreen ? null : <div className="headerUserInfoBlock"><IndexLink to="/welcome">Login/Sign Up</IndexLink></div> 
        }
    }
}
HeaderUserBlock.propTypes = {
    currentUser: PropTypes.object,
    isLogged: PropTypes.bool,
    isHomeScreen: PropTypes.bool,
    handleLogout: PropTypes.func
};
export default HeaderUserBlock;
