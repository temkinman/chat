import { ADD_CHAT, OPEN_MODAL_ADD_CHAT } from "../redux/constants";

export const addNewChatAction = (title) => {
  return {
    type: ADD_CHAT,
    title,
  };
};

export const openModalAddNewChatAction = (isOpen) => {
  return {
    type: OPEN_MODAL_ADD_CHAT,
    newChatModal: isOpen,
  };
};
