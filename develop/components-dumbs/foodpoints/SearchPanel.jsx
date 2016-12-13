import React, { Component, PropTypes } from 'react';
import Timepicker from './Timespanpicker.jsx';
import CircularDaypicker from './СircularDayPicker.jsx';
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
                <CircularDaypicker
                    outerRadius={90}
                    onClick={(param)=>{this.storeFilterParam({dayParam: param})}}
                    centerLabel={"Day"}
                    showResults
                />
                <div className="centered searchWrapper">
                    <SearchBar
                        onChange={(param)=>{this.storeFilterParam({keywordParam: param})}}
                        placeholder={"Choose a dish"}
                    />
                    <button onClick={()=>handleSearchByParams(this.state)}>Find Food</button>
                </div>
                <Timepicker
                    interval={60}
                    outerRadius={90}
                    useMomentJs={false}
                    centerLabel={"Time"}
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
