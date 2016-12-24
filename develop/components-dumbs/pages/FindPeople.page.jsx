import React, { Component, PropTypes } from 'react';
import ColorPicker from '../circular-pickers/CircularColorPicker.jsx';
import NumberPicker from '../circular-pickers/CircularNumberPicker.jsx';
import TimePicker from '../circular-pickers/CircularTimePicker.jsx';
import DayPicker from '../circular-pickers/СircularDayPicker.jsx';

class UserProfilePage extends Component {   

    render() {
        const { handlePickersDemoAction, pickersDemoResult: {time, day, color, number}} = this.props;
        const weekdaysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return (
            <div className="findpeoplePage page">

                <div className="demoResults">
                    <h4>Results</h4>
                    <hr/>
                    {time && time.start ? <p>Time: {`${time.start.hours}:${time.start.minutes || "00"} - ${time.finish.hours}:${time.finish.minutes || "00"}`}</p> : null}
                    <p>Day: {weekdaysMap[day]}</p>  
                    <p className="flexRow">Your color: <span className="colorBlock" style={{"background": color}}></span></p>
                    <p>Friends age: {number}</p>
                </div>
                <div className="demoPickersWrapper">
                    <h4>Week Days</h4>
                    <div className="demoRow">
                        <DayPicker
                            outerRadius={90}
                            onClick={(value)=>{handlePickersDemoAction({key: "day", value})}}
                            centerLabel={"Day"}
                            showResults
                        />
                    </div>
                    <h4>Numbers</h4>
                    <div className="searchPanel demoRow">
                        <NumberPicker
                            outerRadius={120}
                            range={[16,55]}
                            onClick={(value)=>{handlePickersDemoAction({key: "number", value})}}
                            centerLabel={"Age Single"}
                            showResults
                        />
                        <NumberPicker
                            outerRadius={90}
                            range={[16,55]}
                            step={5}
                            onClick={(value)=>{handlePickersDemoAction({key: "number", value})}}
                            centerLabel={"Age Range"}
                            showResults
                        />
                    </div>
                    <h4>Colors</h4>
                    <div className="demoRow">
                        <ColorPicker
                            outerRadius={90}
                            colorsNumber={5}
                            onClick={(value)=>{handlePickersDemoAction({key: "color", value})}}
                            centerLabel={"Color 4"}
                            showResults
                        />
                        <ColorPicker
                            outerRadius={90}
                            colorsNumber={13}
                            onClick={(value)=>{handlePickersDemoAction({key: "color", value})}}
                            centerLabel={"Color 20"}
                            showResults
                        />
                    </div>
                    <h4>Time</h4>
                    <div className="demoRow">
                        <TimePicker
                            interval={60}
                            outerRadius={90}
                            useMomentJs={false}
                            centerLabel={"Time"}
                            showResults
                            onClick={(value)=>{handlePickersDemoAction({key: "time", value: value.combined[0]})}}
                        />
                        <TimePicker
                            interval={30}
                            outerRadius={120}
                            useMomentJs={false}
                            centerLabel={"Time"}
                            showResults
                            onClick={(value)=>{handlePickersDemoAction({key: "time", value: value.combined[0]})}}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

UserProfilePage.propTypes = {
    user: PropTypes.object
};

export default UserProfilePage;
