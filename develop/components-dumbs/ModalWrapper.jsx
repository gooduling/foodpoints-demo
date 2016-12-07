import React, { Component, PropTypes } from 'react';

class ModalContainer extends Component {


 render() {
        const { modalData: {innerComponent, componentProps } } = this.props;
        return (
            <div className='modalWrapper blackLayer'>
                <div className="container-modal" onClick={e => e.stopPropagation()}>
                    {innerComponent(componentProps)}
                </div>
            </div>
        );
    }
}

ModalContainer.propTypes = {
    modalData: PropTypes.object
};

export default ModalContainer;
