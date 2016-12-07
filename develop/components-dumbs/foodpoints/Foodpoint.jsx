import React, { Component, PropTypes } from 'react';
import MeetingRow from './MeetingRow.jsx';

class Foodpoint extends Component {
    render() {
        const { foodpoint: fp, showMeetingHandler, index, short } = this.props;
        return (
            <div className="foodpoint">
                <div className="fpHeader">
                    {index ? <span>#{index}</span> : null}
                    <span>{fp.location}</span>
                    <span className="fpTime">{fp.dayofweekstr.substr(0,3)}, {fp.start24} - {fp.end24}</span>
                </div>
                {short ? null: <div className="fpDescription">{fp.optionaltext}</div>}
                {fp.meetingSlots.map((mSlot, n)=>(
                    <MeetingRow
                        key={n}
                        meeting={mSlot}
                        showMeetingHandler={showMeetingHandler}
                        noLinks={!short}
                    />
                ))}
            </div>
        );
    }
}

Foodpoint.propTypes = {
    foodpoint: PropTypes.object.isRequired,
    index: PropTypes.number,
    short: PropTypes.bool,
    showMeetingHandler: PropTypes.func.isRequired
};

export default Foodpoint;
