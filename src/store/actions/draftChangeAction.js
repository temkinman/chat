import { DRAFT_CHANGE } from "./../constants";

export const draftChangeAction = (text, currentChatId) => {
  return {
    type: DRAFT_CHANGE,
    text,
    currentChatId,
  };
};
