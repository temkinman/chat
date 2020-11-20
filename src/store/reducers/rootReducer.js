import { initialState } from "../store";
import {
  SET_CURRENT_CHAT,
  SEND_MESSAGE,
  DRAFT_CHANGE,
  ADD_CHAT,
  OPEN_MODAL_ADD_CHAT,
  OPEN_CONTEXT_MENU,
  CHATS_FETCHED,
  SET_CURRENT_USER
} from "../constants";
import produce from "immer";
import { combineReducers } from "redux";

const currentChatReducer = (state = initialState.currentChatId, action) => {
  switch (action.type) {
    case SET_CURRENT_CHAT:
      return action.chatId;
    case ADD_CHAT:
      return action.id;
    default:
      return state;
  }
};

const chatsReducer = (state = initialState.chats, action) => {
  switch (action.type) {
    case CHATS_FETCHED:
      return action.chats.reduce((chats, chat) => {
        chats[chat.id] = chat;
        return chats;
      }, {});
    case SEND_MESSAGE:
      const currentChat = state[action.currentChatId];
      if (currentChat.draft === "") return;

      const newMessage = {
        time: new Date(),
        from: currentChat.title,
        text: currentChat.draft,
        messageId: action.messageId,
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
      const newChat = {
        id: action.id,
        title: action.title,
        messages: [],
        draft: "",
      };
      return produce(state, (draftState) => {
        draftState[action.id] = newChat;
      });

    default:
      return state;
  }
};

const newChatModalReducer = (state = initialState.newChatModal, action) => {
  switch (action.type) {
    case OPEN_MODAL_ADD_CHAT:
      return action.newChatModal;
    default:
      return state;
  }
};

const contextMenuReducer = (state = initialState.contextMenu, action) => {
  switch (action.type) {
    case OPEN_CONTEXT_MENU:
      return action.isOpen;
    default:
      return state;
  }
};

const currentUserReducer = (state = initialState.currentUser, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.currentUser;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  chats: chatsReducer,
  currentChatId: currentChatReducer,
  newChatModal: newChatModalReducer,
  contextMenu: contextMenuReducer,
  currentUser: currentUserReducer,
});

export default rootReducer;
