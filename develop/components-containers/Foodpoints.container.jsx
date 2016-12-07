import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterByTime } from '../utils/helper';
import { getFoodpoints, clearDataState } from '../actions/foodpoints.actions';
import { joinAppointment } from '../actions/user.actions';
import { openModal, closeModal } from '../actions/common.actions';
import apiActions from '../actions/api.actions';
import pTypes from '../actions/types/foodpoints.types';

import FoodpointsPage from '../components-dumbs/pages/Foodpoints.page.jsx';
import MeetingModal from '../components-dumbs/foodpoints/MeetingBlock.jsx';

class FoodpointsContainer extends Component {

    componentDidMount() {
        this.props.handleGetFoodpoints({limit: 50});
    }

    componentWillUnmount() {
        this.props.handleClearDataState();
    }

    handleGetFoodpointsNext() {
        const { apiMeta: { paginator }, handleGetFoodpoints } = this.props;

        handleGetFoodpoints({ ...paginator });
    }

    handleSearchByParams(filterParams) {
        let query = {
            filterParams,
            limit: 50
        };
        this.props.handleGetFoodpoints(query);
    }
    handleLeaveOrJoinMeeting(meeting, isLeaveAction = false) {
        const { handleJoinAppointment, currentUser } = this.props;
        handleJoinAppointment({meeting, currentUser, isLeaveAction})
    }
    handleShowMeeting(meeting, isLeaveAction = false) {
        const { currentUser, handleOpenModal, handleCloseModal } = this.props;
        const propsForMeetingModal = { handleCloseModal, meeting, isLeaveAction, currentUser };
        propsForMeetingModal.handleLeaveOrJoinMeeting = this.handleLeaveOrJoinMeeting.bind(this);

        handleOpenModal({
            isOpen: true,
            modalType: 'JOIN_MEETING',
            innerComponent: MeetingModal,
            componentProps: propsForMeetingModal
        });
    }

    render() {
        const { apiMeta, foodpoints } = this.props;
        return (
            <FoodpointsPage
                apiMeta={apiMeta}
                foodpoints={foodpoints}
                showMeetingHandler={(m)=>this.handleShowMeeting(m)}
                handleSearchByParams={this.handleSearchByParams.bind(this)}
            />
        );
    }
}

FoodpointsContainer.propTypes = {
    foodpoints: PropTypes.array,
    apiMeta: PropTypes.object,
    currentUser: PropTypes.object,
    handleGetFoodpoints: PropTypes.func,
    handleClearApiState: PropTypes.func,
    handleClearDataState: PropTypes.func,
    handleJoinAppointment: PropTypes.func,
    handleOpenModal: PropTypes.func,
    handleCloseModal: PropTypes.func
};

const mapStateToProps = (state) => ({
    apiMeta: state.api[pTypes.GET_FOODPOINTS] || {},
    foodpoints: state.foodpoints.foodpoints.filter(item => filterByTime(item, state.foodpoints.filterParams.timeParam )),
    currentUser: state.user.currentUser
});

const mapDispatchToProps = (dispatch) => ({
    handleGetFoodpoints: bindActionCreators(getFoodpoints, dispatch),
    handleClearApiState: bindActionCreators(apiActions.clearState, dispatch),
    handleClearDataState: bindActionCreators(clearDataState, dispatch),
    handleJoinAppointment: bindActionCreators(joinAppointment, dispatch),
    handleOpenModal: bindActionCreators(openModal, dispatch),
    handleCloseModal: bindActionCreators(closeModal, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FoodpointsContainer);
