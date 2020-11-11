import { SET_CURRENT_CHAT } from "../constants";
import { OPEN_CONTEXT_MENU } from "../constants";

export const setCurrentChatAction = (chatId) => {
  return {
    type: SET_CURRENT_CHAT,
    chatId,
  };
};

export const openContextMenuAction = (isOpen) => {
  return {
    type: OPEN_CONTEXT_MENU,
    isOpen,
  }
}
