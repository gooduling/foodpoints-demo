import React, { Component, PropTypes } from 'react';
import Foodpoint from './Foodpoint.jsx';
import FoodMap from './FoodMap.jsx';

class FoodResults extends Component {
    renderFoodpointsList() {
        return this.props.foodpoints.map((foodpoint, n) => (
            <Foodpoint
              key={n}
              index={n+1}
              foodpoint={foodpoint}
              short
              {...this.props}
            />
        ));
    }

    render() {

        return (
            <div className="foodResults">
                <div className="sideList">
                    {this.renderFoodpointsList()}
                </div>
                <FoodMap
                    {...this.props}
                />
            </div>

        );
    }
}

export default FoodResults;
