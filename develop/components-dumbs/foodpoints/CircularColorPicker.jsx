/* (c) Andrii Ulianenko ua.ulin@gmail.com*/

import React, { Component, PropTypes } from 'react';
import * as d3 from 'd3';
//import '../../../assets/timespanpicker.css';
const config = {
    labelsPAdding: 13,
    defaultInnerRadiusIndex: 1.4,
    defaultChartPadding: 60
};

class CircularColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDays: {}
        };
    }
    static propTypes = {
        outerRadius : React.PropTypes.number,
        innerRadius : React.PropTypes.number,
        colorsNumber : React.PropTypes.number,
        multiSelect : React.PropTypes.bool,
        onClick   : React.PropTypes.func
    };

    static defaultProps = {
        colorsNumber: 7,
        outerRadius : 150,
        showResults: false,
        multiSelect: false
    };

    componentWillMount() {
        let { outerRadius, innerRadius, onClick, showResults, colorsNumber } = this.props;
        innerRadius = (innerRadius && innerRadius < outerRadius) ? innerRadius : outerRadius/config.defaultInnerRadiusIndex;

        const width = outerRadius * 2 + config.defaultChartPadding;

        const pie = d3.pie().sort(null).value(d => 1);
        const segmentsArray = pie(new Array(colorsNumber));
        const colorScale = d3.scaleSequential()
            .domain([0, colorsNumber])
            .interpolator(d3.interpolateRainbow);
        const segmentsArcFn = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);
      

        const initialObject = {
            width, segmentsArcFn, segmentsArray, onClick, colorScale, innerRadius, outerRadius, showResults
        };
        this.setState({ initialObject })
    }

    /* On click on segment convert simple segment's value [startValue, endValue] in moment.js object and save it in a state as "selected" */
    handleClick(clickedValue, isEntered) {
        /* skip handling if click anf hover were started out of segments*/
        if (isEntered && !this.state.initialObject.mouseIsClickedDown) return;

        clickedValue = String(clickedValue);
        const {initialObject: { onClick, multiSelect }, selectedDays: {...segments}} = this.state;
        const segmentPreviousValue = segments[clickedValue];
        const currentSegment = {[clickedValue] : segmentPreviousValue ? null : true };
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
        const { centerLabel } = this.props;
        const { width, segmentsArcFn, segmentsArray, colorScale, showResults } = this.state.initialObject;
        const { selectedDays } = this.state;
        return (
            <div className="color circularpickerwrapper"
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
                                fill={colorScale(index)}
                                value={colorScale(index).toString()}
                                handleClick={this.handleClick.bind(this)}
                                isActive={selectedDays[colorScale(index)]}
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
export default CircularColorPicker;


/* Stateless Components */
function Segment(props) {
    const {item, segmentArcFn, fill, value, handleClick, isActive, index } = props;
    return (
        <g className={`segment${isActive ? " colorActive":""}`}
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
        </g>
    )
}

function DayResults({results}) {
    const days = Object.keys(results).filter(item => results[item]);
    return days.length ?
        (<div className="results">
            <div>Selected colors</div>
            {days.map((day, n) => <div className="colorBlock" key={n} style={{"background": day}}></div>)}
        </div>)
        : <div className="results">Choose a color</div>
}