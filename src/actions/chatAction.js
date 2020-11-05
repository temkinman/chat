import { VIEW_CHAT } from "../redux/constants";

export const viewChatAction = (chatId) => {
    console.log('VIEW_CHAT')
  return {
    type: VIEW_CHAT,
    chatId,
  };
};
