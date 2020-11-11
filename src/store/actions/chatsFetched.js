import { CHATS_FETCHED } from "./../constants";

export const chatsFetched = (chats) => {
  return {
    type: CHATS_FETCHED,
    chats,
  };
};
