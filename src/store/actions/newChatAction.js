import { OPEN_MODAL_ADD_CHAT } from "../constants";

export const openAddNewChatAction = (isOpen) => {
  return {
    type: OPEN_MODAL_ADD_CHAT,
    newChatModal: isOpen,
  };
};
