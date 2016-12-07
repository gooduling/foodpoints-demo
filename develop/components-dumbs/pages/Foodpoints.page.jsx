import React, { Component, PropTypes } from 'react';
import Spinner from '../Spinner.jsx';
import SearchPanel from '../foodpoints/SearchPanel.jsx';
import FoodResults from '../foodpoints/FoodResults.jsx';


class FoodpointsPage extends Component {

    render() {
        const { handleSearchByParams, apiMeta, ...propsForResults } = this.props;
        return (
            <div className="foodpointsPage page">
                <SearchPanel
                    handleSearchByParams={handleSearchByParams}
                />
                <FoodResults
                    {...propsForResults}
                />
                {apiMeta.isLoading ? <Spinner/> : null}
            </div>
        );
    }
}

FoodpointsPage.propTypes = {
    apiMeta: PropTypes.object,
    handleSearchByParams: PropTypes.func
};

export default FoodpointsPage;
