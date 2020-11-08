import { DRAFT_CHANGE } from "./../redux/constants";

export const draftChangeAction = (text, currentChatId) => {
  return {
    type: DRAFT_CHANGE,
    text,
    currentChatId,
  };
};
