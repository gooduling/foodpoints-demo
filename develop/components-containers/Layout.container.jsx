import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { closeModal } from '../actions/common.actions';
import { logout } from '../actions/user.actions';

import LayoutContainer from '../components-dumbs/pages/Layout.page.jsx';

class Layout extends Component {

    render() {
        return (
            <LayoutContainer {...this.props} />
        );
    }
}

Layout.propTypes = {
    common: PropTypes.object,
    isModalOpen: PropTypes.bool,
    currentUser: PropTypes.object,
    isLogged: PropTypes.bool,
    handleCloseModal: PropTypes.func,
    handleLogout: PropTypes.func
};

const mapStateToProps = (state) => ({
    common: state.common,
    isModalOpen: state.common.isModalOpen,
    currentUser: state.user.currentUser,
    isLogged: state.user.isLogged
});

const mapDispatchToProps = (dispatch) => ({
    handleCloseModal: bindActionCreators(closeModal, dispatch),
    handleLogout: bindActionCreators(logout, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
