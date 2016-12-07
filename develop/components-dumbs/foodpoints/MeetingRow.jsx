import React from 'react';
import { Link } from 'react-router';

const MeetingRow = ({meeting, showMeetingHandler, noLinks}) => (
    <div className="fpMeetingRow">
        <span className="meetingTime">{meeting.meetingStart}:00 - {meeting.meetingEnd}:00</span>
            {meeting.users.map((user, n) => (
                noLinks ?
                    <div key={n}>{user.avatar ? <img className="userIcon smallIcon" alt="User icon" title={user.name} src={`${user.avatar}`}/> : null}</div>
                     :
                    <Link key={n} to={`/users/${user.id}`}>
                      {user.avatar ? <img className="userIcon smallIcon" alt="User icon" title={user.name} src={`${user.avatar}`}/> : null}
                    </Link>
            ))}
        <button className='joinBtn smallBtn' type="button" onClick={()=>{showMeetingHandler(meeting)}}>See</button>
    </div>
);

MeetingRow.propTypes = {
    meeting: React.PropTypes.object.isRequired,
    noLinks: React.PropTypes.bool,
    showMeetingHandler: React.PropTypes.func
};

export default MeetingRow;
