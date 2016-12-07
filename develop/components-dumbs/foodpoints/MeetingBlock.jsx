import React, { Component, PropTypes } from 'react';

const MeetingBlock = (props) => {
    const { handleCloseModal, handleLeaveOrJoinMeeting, meeting } = props;
    return (
        <div className="meetingBlock">
            <div className="mbHeader">
                <span>{meeting.foodpointLocation}</span>
                <span className="meetingTime">{meeting.meetingDay}, {meeting.meetingStart}:00 - {meeting.meetingEnd}:00</span>
            </div>

            <div>Participants:</div>
            {meeting.users.map((user, n) => (
                <div className="userRow" key={n}>
                    <span>#{n+1}</span>
                    <span>{user.name}</span>
                    <img className="userIcon smallIcon" alt="User icon" title={user.name} src={user.avatar}/>
                </div>
            ))}
            {!meeting.isJoined
                ? <button type="button" onClick={()=>handleLeaveOrJoinMeeting(meeting)}>Join</button>
                : <button type="button" onClick={()=>handleLeaveOrJoinMeeting(meeting, true)}>Leave</button>
            }
            <button className="secondary" type="button" onClick={handleCloseModal}>Close</button>
        </div>
    );
};
MeetingBlock.propTypes = {
    meeting: PropTypes.object.isRequired,
    handleCloseModal: PropTypes.func,
    handleLeaveOrJoinMeeting: PropTypes.func
};

export default MeetingBlock;
