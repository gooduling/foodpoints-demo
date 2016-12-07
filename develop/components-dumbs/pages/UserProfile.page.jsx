import React, { Component, PropTypes } from 'react';
import defaultAvatar from '../../assets/images/defaultAvatar.jpg';

class UserProfilePage extends Component {
    renderMeetings(user) {
        return (
            <ul className="meetingsList">
                {user.appointments.map((m,n)=>(
                    <li className="meetingRow" key={n}>
                        <span>#{n+1}</span> <span>{m.foodpointLocation}:</span> <span>{m.meetingDay}, {m.meetingStart}:00 - {m.meetingEnd}:00</span>
                    </li>
                ))}
            </ul>
        )
    }

    render() {
        const { user} = this.props;
        return (
            <div className="userProfilePage page">
                <div className="userProfileWrapper">
                    <img className="userIcon" src={user.avatar || defaultAvatar} alt="User's icon"/>
                    <h3 className="userHeader">{user.name}, {user.age || ''}, {user.city || ''}</h3>
                    <h5>Meeting List:</h5>
                    {this.renderMeetings(user)}
                </div>
            </div>
        );
    }
}

UserProfilePage.propTypes = {
    user: PropTypes.object
};

export default UserProfilePage;
