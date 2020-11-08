import { SEND_MESSAGE } from "../redux/constants";
import { generateId } from './../App';

export const sendMessageAction = (currentChatId) => {
  return {
    type: SEND_MESSAGE,
    currentChatId,
    messageId: generateId() 
  };
};
