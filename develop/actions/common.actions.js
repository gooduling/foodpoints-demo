import cTypes from './types/common.types';

export const openModal = (payload) => ({
    type: cTypes.OPEN_MODAL,
    payload,
});

export const closeModal = () => ({
    type: cTypes.CLOSE_MODAL,
});
