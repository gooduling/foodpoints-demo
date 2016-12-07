import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectUser } from '../actions/user.actions';
import UserPage from '../components-dumbs/pages/UserProfile.page.jsx';

class UserContainer extends Component {
   
    componentDidMount() {
        const { params, handleSelectUser } = this.props;
        handleSelectUser({ userId: params.id });
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.params !== this.props.params) {
            const { params, handleSelectUser } = this.props;
            handleSelectUser({ userId: params.id });
        }
    }

    render() {
        const { selectedUser } = this.props; 
        return selectedUser.name ? (
            <UserPage
              user={selectedUser}
            />
        ) : null;
    }
}

UserContainer.propTypes = {
    selectedUser: PropTypes.object,
    handleSelectUser: PropTypes.func
};

const mapStateToProps = (state) => ({
    selectedUser: state.user.selectedUser
});

const mapDispatchToProps = (dispatch) => ({
    handleSelectUser: bindActionCreators(selectUser, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
