import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signUp, login } from '../actions/user.actions';
import WelcomePage from '../components-dumbs/pages/Welcome.page.jsx';

class WelcomeContainer extends Component {
    render() {
        return (
            <WelcomePage {...this.props} />
        );
    }
}

WelcomeContainer.propTypes = {
    isLogged: PropTypes.bool,
    user: PropTypes.object,
    handleLogin: PropTypes.func,
    handleSignUp: PropTypes.func
};

const mapStateToProps = (state) => ({
    isLogged: state.user.isLogged,
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    handleLogin: bindActionCreators(login, dispatch),
    handleSignUp: bindActionCreators(signUp, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer);
