import cTypes from '../actions/types/common.types';

const DEFAULT_STATE = {
    isModalOpen: false,
    containerModalData: {},
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case cTypes.OPEN_MODAL:
            return reduceOpenModal(state, action);
        case cTypes.CLOSE_MODAL:
            return reduceCloseModal(state, action);

        default:
            return state;
    }
};


function reduceOpenModal(state, { payload }) {
    const { isOpen, innerComponent, componentProps } = payload;

    return {
        ...state,
        isModalOpen: isOpen,
        modalData: { innerComponent, componentProps },
    };
}

function reduceCloseModal(state) {
    return {
        ...state,
        isModalOpen: false,
        modalData: {},
    };
}