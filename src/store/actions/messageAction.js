import { SEND_MESSAGE } from "../constants";
import { generateId } from "./../../Utils/Utils";

export const sendMessageAction = (currentChatId) => {
  return {
    type: SEND_MESSAGE,
    currentChatId,
    messageId: generateId(),
  };
};
