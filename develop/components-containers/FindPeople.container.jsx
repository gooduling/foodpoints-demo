import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FindPeoplePage from '../components-dumbs/pages/FindPeople.page.jsx';

class UserContainer extends Component {

    render() {
        const { currentUser } = this.props;
        return <FindPeoplePage
              user={currentUser}
            />
    }
}

UserContainer.propTypes = {
    currentUser: PropTypes.object,
    handleSelectUser: PropTypes.func
};

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
