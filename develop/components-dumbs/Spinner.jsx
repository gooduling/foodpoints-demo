import React, { Component, PropTypes } from 'react';
import spinnerGif from '../assets/images/spinner.gif';

const Spinner = (props) => (
    <div className="blackLayer">
        <img className="spinnerImg" src={spinnerGif} alt="Loading..."/>
    </div>
);

export default Spinner;
