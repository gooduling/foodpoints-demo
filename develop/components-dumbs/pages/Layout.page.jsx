import React, { Component, PropTypes } from 'react';
import ModalContainer from '../ModalWrapper.jsx';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';

import '../../assets/boot_scss/bootstrap.scss';//TODO: remove bootstrap in future
import '../../assets/custom.scss';


class LayoutPage extends Component {
    renderContainerModal() {
        const { common: {isModalOpen, modalData}, handleCloseModal } = this.props;
        return !isModalOpen
            ? null
            : (
                <ModalContainer
                    {...{modalData, handleCloseModal}}
                />
            );
    }

    render() {
        const { currentUser, isLogged, handleLogout, location:{ pathname } }   = this.props;
        const propsForHeader = {currentUser, isLogged, handleLogout, isHomeScreen: pathname === '/welcome'};
        return (
            <div className="container-fluid appContainer">
                <Header {...propsForHeader}/>
                {this.props.children}
                {this.renderContainerModal()}
                <Footer/>
            </div>
        );
    }
}

LayoutPage.propTypes = {
    children: PropTypes.element
};

export default LayoutPage;