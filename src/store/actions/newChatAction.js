import { ADD_CHAT, OPEN_MODAL_ADD_CHAT } from "../constants";
import { generateId } from "../../Utils/Utils";

export const addNewChatAction = (title) => {
  return {
    type: ADD_CHAT,
    title,
    id: generateId(),
  };
};

export const openAddNewChatAction = (isOpen) => {
  return {
    type: OPEN_MODAL_ADD_CHAT,
    newChatModal: isOpen,
  };
};
