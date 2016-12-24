import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FindPeoplePage from '../components-dumbs/pages/FindPeople.page.jsx';
import { pickersDemoAction } from '../actions/common.actions';

class UserContainer extends Component {

    render() {
        return <FindPeoplePage
                {...this.props}
            />
    }
}

UserContainer.propTypes = {
    currentUser: PropTypes.object,
    handleSelectUser: PropTypes.func
};

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
    pickersDemoResult: state.pickersDemo
});

const mapDispatchToProps = (dispatch) => ({
    handlePickersDemoAction: bindActionCreators(pickersDemoAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
