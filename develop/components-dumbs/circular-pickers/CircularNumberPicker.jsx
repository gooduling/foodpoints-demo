/* (c) Andrii Ulianenko ua.ulin@gmail.com*/

import React, { Component, PropTypes } from 'react';
import * as d3 from 'd3';
//import '../../../assets/timespanpicker.css';
const config = {
    labelsPAdding: 13,
    segmentsColorsArray: ['#46F56E', '#8AF557'],
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
        step : React.PropTypes.number,
        onClick   : React.PropTypes.func,
        multiSelect : React.PropTypes.bool
    };

    static defaultProps = {
        outerRadius : 150,
        showResults: false,
        multiSelect : false,
        step: 1
    };

    componentWillMount() {
        let { outerRadius, innerRadius, onClick, showResults, range, multiSelect, step } = this.props;
        innerRadius = (innerRadius && innerRadius < outerRadius) ? innerRadius : outerRadius/config.defaultInnerRadiusIndex;

        const width = outerRadius * 2 + config.defaultChartPadding;
        const numberOfSegments = (range[1] - range[0] + 1)/step;
        const pie = d3.pie().sort(null).value(d => 1);
        const segmentsArray = pie(new Array(numberOfSegments));
        const colorScale = d3.scaleOrdinal().domain([0, 1]).range(config.segmentsColorsArray);
        const segmentsArcFn = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);
        const minutesArcFn = d3.arc()
            .outerRadius(outerRadius + config.labelsPAdding)
            .innerRadius(outerRadius + config.labelsPAdding);
            // .startAngle(d => d.startAngle + Math.PI / 7)
            // .endAngle(d => d.endAngle + Math.PI  / 7);

        const initialObject = {
            width, segmentsArcFn, minutesArcFn, segmentsArray, onClick, step,
            colorScale, innerRadius, outerRadius, showResults, multiSelect, rangeMinimum: range[0]
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
        const selectedDays = multiSelect ? { ...segments, ...currentSegment} : { ...currentSegment};

        this.setState({selectedDays});
        onClick(Object.keys(selectedDays).filter(key=>selectedDays[key]));
    }

    storeMouseIsClickedDown(mouseIsClickedDown) {
        const { initialObject } = this.state;
        this.setState({initialObject: { ...initialObject, mouseIsClickedDown }})
    }
    renderSegments() {
        const { width, segmentsArcFn, minutesArcFn, segmentsArray, colorScale, showResults,
            rangeMinimum, innerRadius, outerRadius, step } = this.state.initialObject;
        const { centerLabel } = this.props;
        const { selectedDays } = this.state;
        return (segmentsArray.map((item, index) => {
            const value = step === 1 ? index + rangeMinimum : `${index * step + rangeMinimum}-${index * step + rangeMinimum + step - 1}`;
            return (
            <Segment
                key={index}
                index={index}
                item={item}
                segmentArcFn={segmentsArcFn}
                minutesArcFn={minutesArcFn}
                fill={colorScale(step === 1 && value % 10 ? 1 : 0)}
                value={value}
                handleClick={this.handleClick.bind(this)}
                isActive={selectedDays[value]}
            />
        )}))
    }
    render() {
        if (!this.state.initialObject) return null;
        const { width, showResults, innerRadius, outerRadius} = this.state.initialObject;
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
                        {this.renderSegments()}
                        <text className="centerLabel">{centerLabel}</text>
                        <g className="boundaryGroup">
                            <path
                                className="boundaryLine"
                                d={`M 0 -${innerRadius-20} V -${outerRadius+4}`}
                                transform={`rotate(0)`}
                            />
                        </g>
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
    const {item, segmentArcFn, minutesArcFn, fill, value, handleClick, isActive, index } = props;
    return (
        <g className={`segment${isActive ? " active":""}`}
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
            <text
                className="minuteLabel"
                transform={`translate(${minutesArcFn.centroid(item)})`}
                dy=".35em"
            >
                {value}
            </text>
        </g>
    )
}

function DayResults({results}) {
    const numbers = Object.keys(results).filter(item => results[item]);
    return numbers.length ?
        (<div className="results">
            <div>Selected numbers</div>
            {numbers.map((item, n) => <p key={n}>{item}</p>)}
        </div>)
        : <div className="results">Choose a number</div>
}