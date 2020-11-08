import { ADD_CHAT, OPEN_MODAL_ADD_CHAT } from "../redux/constants";
import { generateId } from './../App';

export const addNewChatAction = (title) => {
  return {
    type: ADD_CHAT,
    title,
    id: generateId(),
  };
};

export const openModalAddNewChatAction = (isOpen) => {
  return {
    type: OPEN_MODAL_ADD_CHAT,
    newChatModal: isOpen,
  };
};
