import React, { Component, PropTypes } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import Foodpoint from './Foodpoint.jsx';

const position = [37.77, -122.4];  

class FoodMap extends Component {
    render() {
        const {foodpoints} = this.props;
        return (
            <div className="mapWrapper">
                <Map className="leafletMap" center={position} zoom={13}>
                    <TileLayer
                        url='http://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {foodpoints.map((point, n)=>(
                        <Marker key={n} position={[point.latitude, point.longitude]}>
                            <Popup>
                                <Foodpoint
                                    foodpoint={point}
                                    key={n}
                                    index={n+1}
                                    {...this.props}
                                />
                            </Popup>
                        </Marker>
                    ))}
                </Map>
            </div>
        );
    }
}
FoodMap.propTypes = {
    foodpoints: PropTypes.array 
};
export default FoodMap;