import { SET_CURRENT_CHAT } from "../constants";

export const setCurrentChatAction = (chatId) => {
  return {
    type: SET_CURRENT_CHAT,
    chatId,
  };
};
