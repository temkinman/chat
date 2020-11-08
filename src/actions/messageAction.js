import { SEND_MESSAGE } from "../redux/constants";

export const sendMessageAction = (currentChatId) => {
  return {
    type: SEND_MESSAGE,
    currentChatId,
  };
};
