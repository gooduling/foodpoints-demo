/* (c) Andrii Ulianenko ua.ulin@gmail.com*/

import React, { Component, PropTypes } from 'react';
import * as d3 from 'd3';
import moment from 'moment';
//import '../../../assets/timespanpicker.css';
const config = {
    labelsPAdding: 13,
    segmentsColorsArray: ['#bbb', '#ddd'],
    defaultInnerRadiusIndex: 1.4,
    defaultChartPadding: 60
};

class CircularTimespanpicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSegments: {},
            combined: []
        };
    }
    static propTypes = {
        outerRadius : React.PropTypes.number,
        innerRadius : React.PropTypes.number,
        showResults : React.PropTypes.bool,
        useMomentJs : React.PropTypes.bool,
        onClick   : React.PropTypes.func,
        multiSelect : React.PropTypes.bool,
        interval : (props, propName, componentName) => {
            const interval = props[propName];
            if ( !Number.isInteger(interval) || interval > 60 || 60 % interval) {
                return new Error(
                    `Invalid prop ${propName} supplied to ${componentName}. Validation failed.
                    Expects integer equal or less than 60 and 60 is divisible by it`
                );
            }
        },
        boundaryHour : (props, propName, componentName) => {
            const boundaryHour = props[propName];
            if ( !Number.isInteger(boundaryHour) || boundaryHour > 24) {
                return new Error(
                    `Invalid prop ${propName} supplied to ${componentName}. Validation failed.
                    Expects integer less than 24`
                );
            }
        },
    };

    static defaultProps = {
        outerRadius : 150,
        interval : 30,
        boundaryHour: 8,
        showResults : true,
        useMomentJs : true,
        multiSelect : false,
        onClick   : (value) => { console.log (value) }
    };

    componentWillMount() {
        let { outerRadius, innerRadius, interval, boundaryHour, onClick, showResults, useMomentJs, multiSelect } = this.props;
        innerRadius = (innerRadius && innerRadius < outerRadius) ? innerRadius : outerRadius/config.defaultInnerRadiusIndex;

        const width = outerRadius * 2 + config.defaultChartPadding;
        const segmentsInHour = 60/interval;
        const totalNumberOfSegments = 720/interval;
        const boundaryIsPostMeridiem = boundaryHour > 12;

        const pie = d3.pie().sort(null).value(d => 1);
        const segmentsArray = pie(new Array(totalNumberOfSegments));
        const hoursLabelsArray = pie(new Array(12));
        const colorScale = d3.scaleOrdinal().domain([0, 1, 2]).range(config.segmentsColorsArray);
        const segmentsArcFn = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);
        const minutesArcFn = d3.arc()
            .outerRadius(outerRadius + config.labelsPAdding)
            .innerRadius(outerRadius + config.labelsPAdding)
            .startAngle(d => d.startAngle + Math.PI / totalNumberOfSegments)
            .endAngle(d => d.endAngle + Math.PI  / totalNumberOfSegments);
        const hoursArcFn = d3.arc()
            .outerRadius(outerRadius + config.labelsPAdding)
            .innerRadius(outerRadius + config.labelsPAdding)
            .startAngle(d => d.startAngle - 0.26)
            .endAngle(d => d.endAngle - 0.26);

        const initialObject = {
            interval, boundaryHour, width, segmentsInHour, boundaryIsPostMeridiem, useMomentJs,
            segmentsArcFn, minutesArcFn, hoursArcFn, segmentsArray, showResults, onClick, multiSelect,
            hoursLabelsArray, colorScale, innerRadius, outerRadius, totalNumberOfSegments
        };
        this.setState({ initialObject })
    }

    /* On click on segment convert simple segment's value [startValue, endValue] in moment.js object and save it in a state as "selected" */
    handleClick(clickedSegment, isEntered) {
        /* skip handling if click anf hover were started out of segments*/
        if (isEntered && !this.state.initialObject.mouseIsClickedDown) return;

        const {initialObject: { onClick, multiSelect }, selectedSegments: {...segments}} = this.state;
        const segmentPreviousValue = segments[clickedSegment.name];
        const currentSegment = {[clickedSegment.name]: segmentPreviousValue ? null : clickedSegment.value};
        if(!multiSelect) {
            this.setState({selectedSegments: currentSegment, combined: [clickedSegment.value]});
            onClick({selectedSegments: currentSegment, combined: [clickedSegment.value]});
        } else {
            const selectedSegments = {...segments, ...currentSegment};
            let filteredSegments = {};
            for (let key in selectedSegments) {
                if (selectedSegments[key]) filteredSegments[key] = selectedSegments[key];
            }
            const combined = this.getReducedArray({...segments, ...currentSegment});
            this.setState({selectedSegments, combined});
            onClick({selectedSegments: filteredSegments, combined});
        }
    }

    /* Define an hours labels. "showSingleBoundaryHour" set displaying of doubled boundary hours (e.g. '8|20', '16|4') */
    getHoursLabels(boundary, index, showSingleBoundaryHour) {
        const hour24 = index + 12,
            hour12 = showSingleBoundaryHour ? index: index || "00",
            isInBottomQuadrants = (index > 3 && index < 10);

        if (boundary > 12) {
            boundary = boundary - 12;
            if (index === boundary) return showSingleBoundaryHour ? hour24 : isInBottomQuadrants ? `${hour24} | ${hour12}` : `${hour12} | ${hour24}`;
            return index < boundary ? hour12: hour24;
        } else {
            if (index === boundary) return showSingleBoundaryHour ? hour12 :  isInBottomQuadrants ? `${hour12} | ${hour24}`: `${hour24} | ${hour12}`;
            return index < boundary ? hour24 : hour12;
        }
    }

    /* combine the neighbour time spans in a one node (e.g. '5:20-5:30' and '5:30-5:40' will be combined in a '5:20-5:40') */
    getReducedArray(segments, useMomentJs) {
        const timeObjectToNumber = ({start: {hours, minutes}}) => Number(hours + minutes);
        const labelToNumber = str => Number(str.split(":").join(""));
        const sortBy24HoursLabel = (a, b) => (timeObjectToNumber(a) - timeObjectToNumber(b));
        const keysArr = Object.keys(segments).filter(key => segments[key]).sort((a,b) => labelToNumber(a) - labelToNumber(b));
        if (keysArr.length) {
            if(keysArr.length === 1)  {
                /* if is single, returns it - no needs to combine */
                return [segments[keysArr[0]]];
            } else {
                /* combine time spans */
                let reducedArr = keysArr.reduce((prev, currentKey) => {
                    let tempArr = Array.isArray(prev) ? prev : [segments[prev]];
                    let currentEl = segments[currentKey];
                    const item = tempArr[tempArr.length-1];
                    let wasJoined = false;
                    if (!useMomentJs) {
                        tempArr.forEach((item, n) => {
                            const isLessCondition = ((currentEl.start.hours === item.finish.hours)
                            && (currentEl.start.minutes === item.finish.minutes));
                            const isMoreCondition = ((currentEl.finish.hours === item.start.hours)
                            && (currentEl.finish.minutes === item.start.minutes));
                            if (isLessCondition) {
                                currentEl = {start: item.start, finish: currentEl.finish};
                                tempArr[n] = wasJoined ? null : currentEl;
                                wasJoined = true;
                            } else if (isMoreCondition) {
                                currentEl  = {start: currentEl.start, finish: item.finish};
                                tempArr[n] = wasJoined ? null : currentEl;
                                wasJoined = true;
                            }
                        });
                    } else if (useMomentJs && !currentEl.start.diff(item.finish, 'minutes')) {
                        /*if last element finished in the same time current started, combine them as ['start of the last', 'end of the current]*/
                        tempArr[tempArr.length-1] = {start: item.start, finish: currentEl.finish}
                        wasJoined = true;
                    }
                    if (!wasJoined) {
                        tempArr.push(currentEl);
                    }                 

                    return tempArr.filter(item => item).sort(sortBy24HoursLabel);
                });

                return reducedArr;
            }
        }
        /* if there is no chosen spans in the segments, returns empty array */
        return []
    }

    getBoundaryLinesRotationDegree() {
        let { boundaryHour, boundaryIsPostMeridiem } = this.state.initialObject;
        return 30 * (boundaryIsPostMeridiem ? boundaryHour - 12 : boundaryHour);
        /* 1 hour = 360 / 12 = 30 degrees */
    }
    setSegmentsValue(index) {
        const {interval, boundaryHour, totalNumberOfSegments, segmentsInHour,
            boundaryIsPostMeridiem, useMomentJs } = this.state.initialObject;
        index = boundaryIsPostMeridiem ? index + totalNumberOfSegments : index;
        const boundaryIndex = boundaryHour * segmentsInHour;
        const recalculatedIndex = index - boundaryIndex + (index < boundaryIndex ? totalNumberOfSegments : 0);
        const startMinutes = recalculatedIndex * interval;
        let result = {};
        if (useMomentJs) {
            result.value = {
                start: moment().set('hour', boundaryHour).set('minute', 0).minute(startMinutes),
                finish: moment().set('hour', boundaryHour).set('minute', 0).minute(startMinutes + interval)
            };
            result.name = result.value.start.format("HH:mm");
        } else {
            const addMinutesToBoundary = minutes => {
                const newTime = {
                    hours: boundaryHour + Math.floor(minutes/60),
                    minutes: minutes % 60
                };
                if (newTime.hours > 24) newTime.hours = newTime.hours - 24;
                return newTime;
            };
            result.value = {
                start: addMinutesToBoundary(startMinutes),
                finish: addMinutesToBoundary(startMinutes + interval)
            };
            result.name = `${result.value.start.hours}:${result.value.start.minutes || "00"}`
        }
        return result;
    }

    storeMouseIsClickedDown(mouseIsClickedDown) {
        const { initialObject } = this.state;
        this.setState({initialObject: { ...initialObject, mouseIsClickedDown }})
    }

    render() {
        if (!this.state.initialObject) return null;
        const {
            interval, boundaryHour, width, segmentsInHour, useMomentJs,
            segmentsArcFn, minutesArcFn, hoursArcFn, segmentsArray,
            hoursLabelsArray, colorScale, outerRadius, innerRadius, showResults
        } = this.state.initialObject;
        const { centerLabel } = this.props;
        const { selectedSegments, combined } = this.state;

        return (
            <div className="time circularpickerwrapper"
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
                                label={((index % segmentsInHour) + 1) * interval}
                                fill={colorScale((Math.floor(index/segmentsInHour)) % 2)}
                                value={this.setSegmentsValue(index)}
                                handleClick={this.handleClick.bind(this)}
                                isActive={selectedSegments[this.setSegmentsValue(index).name]}
                            />
                        ))}
                        <g className="hoursLabelsGroup">
                            {hoursLabelsArray.map((item, index) => (
                                <text
                                    key={index}
                                    className={`hourLabel${index === boundaryHour ? " boundary": ""}`}
                                    transform={`translate(${hoursArcFn.centroid(item)})`}
                                    dy=".35em"
                                    style={{'textAnchor':'middle'}}
                                >
                                    {this.getHoursLabels(boundaryHour, index, true)}
                                </text>
                            ))}
                        </g>
                        <g className="boundaryGroup">
                            <path
                                className="boundaryLine"
                                d={`M 0 -${innerRadius-20} V -${outerRadius+4}`}
                                transform={`rotate(${this.getBoundaryLinesRotationDegree()})`}
                            />
                        </g>
                        <text className="centerLabel">{centerLabel}</text>
                    </g>
                </svg>
                {showResults ? <TimeResults results={combined} useMomentJs={useMomentJs} /> : null}
            </div>
        );
    }
}
export default CircularTimespanpicker;


/* Stateless Components */
function TimeResults(props) {
    const { results, useMomentJs } = props;
    const getRow = span => useMomentJs
        ? `${span.start.format('H:mm')} - ${span.finish.format('H:mm')}`
        : `${span.start.hours || "00"}:${span.start.minutes || "00"} - ${span.finish.hours || "00"}:${span.finish.minutes || "00"}`;
    return results.length ?
        (<div className="results">
            <div>Selected Time</div>
            {results.map((span, n)=><p className="timeRow" key={n}>{getRow(span)}</p>)}
        </div>)
        : <div className="results">Choose time</div>
}

function Segment(props) {
    const {item, segmentArcFn, minutesArcFn, label, fill, value, handleClick, isActive } = props;
    return (
        <g className={`segment${isActive ? " active":""}`}
           onClick={()=>{handleClick(value)}}
           onMouseDown={()=>{handleClick(value, true)}}
        >
            <path
                d={segmentArcFn(item)}
                fill={fill}
                onMouseLeave={()=>{handleClick(value, true)}}
                onDragLeave={()=>{handleClick(value, true)}}
                onMouseDown={()=>{handleClick(value, true)}}
            />
            {
                label === 60 ? null :
                <text
                    className="minuteLabel"
                    transform={`translate(${minutesArcFn.centroid(item)})`}
                    dy=".35em"
                >
                    {label}
                </text>
            }
        </g>
    )
}