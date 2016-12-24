import React, { Component, PropTypes } from 'react';
import TimePicker from '../circular-pickers/CircularTimePicker.jsx';
import DayPicker from '../circular-pickers/СircularDayPicker.jsx';
import SearchBar from 'react-search-input'

class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keywordParam: "",
            dayParam: [],
            timeParam: {}
        };
    }
    shouldComponentUpdate() {
        return false;
    }
    storeFilterParam(param) {
        this.setState(param)
    }
    handleDayParam(value) {
        this.setState({dayParam: value})
    }
    render() {
        const { handleSearchByParams } = this.props;

        return (
            <div className="searchPanel">
                <DayPicker
                    outerRadius={90}
                    onClick={(param)=>{this.storeFilterParam({dayParam: param})}}
                    centerLabel={"Day"}
                    multiSelect   
                    showResults
                />
                <div className="centered searchWrapper">
                    <SearchBar
                        onChange={(param)=>{this.storeFilterParam({keywordParam: param})}}
                        placeholder={"Choose a dish"}
                    />
                    <button onClick={()=>handleSearchByParams(this.state)}>Find Food</button>
                </div>
                <TimePicker
                    interval={60}
                    outerRadius={90}
                    useMomentJs={false}
                    centerLabel={"Time"}
                    multiSelect
                    showResults
                    onClick={(param)=>{this.storeFilterParam({timeParam: param.selectedSegments})}}
                />
            </div>
        );
    }
}

SearchPanel.propTypes = {
    handleSearchByParams: PropTypes.func,
};

export default SearchPanel;
