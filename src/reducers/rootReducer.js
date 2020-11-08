import { initialState } from "../redux/store";
import {
  SET_CURRENT_CHAT,
  SEND_MESSAGE,
  DRAFT_CHANGE,
  ADD_CHAT,
  OPEN_MODAL_ADD_CHAT,
} from "../redux/constants";
import produce from "immer";
import { generateId } from "../App";
import { combineReducers } from "redux";

const currentChatReducer = (state = initialState.currentChatId, action) => {
  switch (action.type) {
    case SET_CURRENT_CHAT:
      return action.chatId;
    default:
      return state;
  }
};

const chatsReducer = (state = initialState.chats, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      const currentChat = state[action.currentChatId];
      if (currentChat.draft === "") return;

      const newMessage = {
        time: new Date(),
        from: currentChat.title,
        text: currentChat.draft,
        messageId: generateId(),
      };

      return produce(state, (draftState) => {
        draftState[action.currentChatId].messages.unshift(newMessage);
        draftState[action.currentChatId].draft = "";
      });
    case DRAFT_CHANGE:
      return produce(state, (draftState) => {
        draftState[action.currentChatId].draft = action.text;
      });
    case ADD_CHAT:
      const id = generateId();
      const newChat = {
        id: id,
        title: action.title,
        messages: [],
        draft: "",
      };

      return produce(state, (draftState) => {
        draftState[id] = newChat;
        // draftState.currentChatId = id;
      });

    default:
      return state;
  }
};

const newChatModal = (state = initialState.newChatModal, action) => {
  switch (action.type) {
    case OPEN_MODAL_ADD_CHAT:
      return action.newChatModal;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  chats: chatsReducer,
  currentChatId: currentChatReducer,
  newChatModal,
});

export default rootReducer;
