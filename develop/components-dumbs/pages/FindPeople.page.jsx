import React, { Component, PropTypes } from 'react';
import defaultAvatar from '../../assets/images/defaultAvatar.jpg';
import ColorPicker from '../foodpoints/CircularColorPicker.jsx';

class UserProfilePage extends Component {   

    render() {
        const { user} = this.props;
        console.debug("FP");
        return (
            <div className="userProfilePage page">
                <div className="userProfileWrapper">
                    <img className="userIcon" src={user.avatar || defaultAvatar} alt="User's icon"/>
                    <h3 className="userHeader">{user.name}, {user.age || ''}, {user.city || ''}</h3>
                    <ColorPicker
                        outerRadius={90}
                        colorsNumber={4}
                        onClick={(param)=>{console.debug(param);}}
                        centerLabel={"Color"}
                        showResults
                    />
                    <ColorPicker
                        outerRadius={90}
                        colorsNumber={7}
                        onClick={(param)=>{console.debug(param);}}
                        centerLabel={"Color"}
                        showResults
                    />
                    <ColorPicker
                        outerRadius={90}
                        colorsNumber={13}
                        onClick={(param)=>{console.debug(param);}}
                        centerLabel={"Color"}
                        showResults
                    />
                </div>
            </div>
        );
    }
}

UserProfilePage.propTypes = {
    user: PropTypes.object
};

export default UserProfilePage;
