/* (c) Andrii Ulianenko ua.ulin@gmail.com*/

import React, { Component, PropTypes } from 'react';
import * as d3 from 'd3';
//import '../../../assets/timespanpicker.css';
const config = {
    labelsPAdding: 13,
    segmentsColorsArray: ['#bbb', '#ddd'],
    defaultInnerRadiusIndex: 1.4,
    defaultChartPadding: 60
};

class CircularDaypicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDays: {}
        };
    }
    static propTypes = {
        outerRadius : React.PropTypes.number,
        innerRadius : React.PropTypes.number,
        onClick   : React.PropTypes.func,
        multiSelect : React.PropTypes.bool,
    };

    static defaultProps = {
        outerRadius : 150,
        showResults: false,
        multiSelect : false
    };

    componentWillMount() {
        let { outerRadius, innerRadius, onClick, showResults, multiSelect } = this.props;
        innerRadius = (innerRadius && innerRadius < outerRadius) ? innerRadius : outerRadius/config.defaultInnerRadiusIndex;

        const width = outerRadius * 2 + config.defaultChartPadding;

        const pie = d3.pie().sort(null).value(d => 1);
        const segmentsArray = pie(new Array(7));
        const hoursLabelsArray = pie(new Array(12));
        const colorScale = d3.scaleOrdinal().domain([0, 1, 2]).range(config.segmentsColorsArray);
        const segmentsArcFn = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);
        const minutesArcFn = d3.arc()
            .outerRadius(outerRadius + config.labelsPAdding)
            .innerRadius(outerRadius + config.labelsPAdding)
            .startAngle(d => d.startAngle + Math.PI / 7)
            .endAngle(d => d.endAngle + Math.PI  / 7);
        const hoursArcFn = d3.arc()
            .outerRadius(outerRadius + config.labelsPAdding)
            .innerRadius(outerRadius + config.labelsPAdding)
            .startAngle(d => d.startAngle - 0.26)
            .endAngle(d => d.endAngle - 0.26);

        const initialObject = {
            width, segmentsArcFn, minutesArcFn, hoursArcFn, segmentsArray, onClick,
            hoursLabelsArray, colorScale, innerRadius, outerRadius, showResults, multiSelect
        };
        this.setState({ initialObject })
    }

    /* On click on segment convert simple segment's value [startValue, endValue] in moment.js object and save it in a state as "selected" */
    handleClick(clickedValue, isEntered) {
        /* skip handling if click anf hover were started out of segments*/
        if (isEntered && !this.state.initialObject.mouseIsClickedDown) return;

        clickedValue = String(clickedValue);
        const {initialObject: {onClick, multiSelect}, selectedDays: {...segments}} = this.state;
        const segmentPreviousValue = segments[clickedValue];
        const currentSegment = { [clickedValue]: segmentPreviousValue ? null : true };
        const selectedDays = multiSelect ? { ...segments, ...currentSegment} : {...currentSegment}; 

        this.setState({selectedDays});
        onClick(Object.keys(selectedDays).filter(key=>selectedDays[key]));
    }

    storeMouseIsClickedDown(mouseIsClickedDown) {
        const { initialObject } = this.state;
        this.setState({initialObject: { ...initialObject, mouseIsClickedDown }})
    }

    render() {
        if (!this.state.initialObject) return null;
        const { width, segmentsArcFn, minutesArcFn, segmentsArray, colorScale, showResults } = this.state.initialObject;
        const { centerLabel } = this.props;
        const { selectedDays } = this.state;
        return (
            <div className="day circularpickerwrapper"
                onMouseDown={()=>{this.storeMouseIsClickedDown(true)}}
                onMouseUp={()=>{this.storeMouseIsClickedDown(false)}}
                onMouseLeave={()=>{this.storeMouseIsClickedDown(false)}}
            >
                <svg width={width} height={width}>
                    <g transform={`translate(${width/2},${width/2})`}>
                        {segmentsArray.map((item, index) =>(
                            <Segment
                                key={index}
                                index={index}
                                item={item}
                                segmentArcFn={segmentsArcFn}
                                minutesArcFn={minutesArcFn}
                                fill={colorScale(index % 2)}
                                value={index}
                                handleClick={this.handleClick.bind(this)}
                                isActive={selectedDays[index]}
                            />
                        ))}
                        <text className="centerLabel">{centerLabel}</text>
                    </g>
                </svg>
                {showResults ? <DayResults results={selectedDays}/> : null}
            </div>
        );
    }
}
export default CircularDaypicker;


/* Stateless Components */
function Segment(props) {
    const {item, segmentArcFn, minutesArcFn, label, fill, value, handleClick, isActive, index } = props;
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return (
        <g className={`segment${isActive ? " active": !index || index===6 ? " weekend":""}`}
           onClick={()=>{handleClick(value)}}
           onMouseDown={()=>{handleClick(value, true)}}
        >
            <path
                id={`day-${index}`}
                d={segmentArcFn(item)}
                fill={fill}
                onMouseLeave={()=>{handleClick(value, true)}}
                onDragLeave={()=>{handleClick(value, true)}}
                onMouseDown={()=>{handleClick(value, true)}}
            />
            {
                <text
                    className="dayLabel"
                    dy="-0.5em"
                    dx="40"
                    dangerouslySetInnerHTML={{__html: `<textPath xlink:href="#day-${index}">${weekdays[index]}</textPath>`}}
                >
                </text>
            }
        </g>
    )
}

function DayResults({results}) {
    const dayMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const days = Object.keys(results).filter(item => results[item]);
    return days.length ?
        (<div className="results">
            <div>Selected days</div>
            {days.map((day, n) => <p className="timeRow" key={n}>{dayMap[day]}</p>)}
        </div>)
        : <div className="results">Choose a day</div>
}