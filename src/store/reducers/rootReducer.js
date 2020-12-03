import { initialState } from "../store";
import {
  SET_CURRENT_CHAT,
  SEND_MESSAGE,
  DRAFT_CHANGE,
  ADD_CHAT,
  OPEN_MODAL_ADD_CHAT,
  OPEN_CONTEXT_MENU,
  CHATS_FETCHED,
  SET_CURRENT_USER,
  OPEN_MODAL_RENAME_CHAT,
  OPEN_CONFIRM_MODAL,
  ADDED_NEW_CHAT,
  RENAMED_CHAT,
  DELETED_CHAT,
  SENT_MESSAGE,
  DRAFT_CHANGED,
} from "../constants";
import produce from "immer";
import { combineReducers } from "redux";

const currentChatReducer = (state = initialState.currentChatId, action) => {
  switch (action.type) {
    case SET_CURRENT_CHAT:
      return action.chatId;
    case ADD_CHAT:
      return action.id;
    case DELETED_CHAT:
      return action.chatId;
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
      // if (currentChat.draft === "") return;

      // const newMessage = {
      //   time: new Date(),
      //   from: currentChat.title,
      //   text: currentChat.draft,
      //   messageId: action.messageId,
      // };

      // return produce(state, (draftState) => {
      //   draftState[action.currentChatId].messages.unshift(newMessage);
      //   draftState[action.currentChatId].draft = "";
      // });
      break;
    case SENT_MESSAGE:
      return produce(state, (draftState) => {
        draftState[action.currentChatId].messages.push(action.newMessage);
        draftState[action.currentChatId].draft = "";
      });
    case DRAFT_CHANGE:
      return produce(state, (draftState) => {
        draftState[action.currentChatId].draft = action.text;
      });
    case DRAFT_CHANGED:
      return produce(state, (draftState) => {
        draftState[action.currentChatId].draft = action.draftText;
      });
    case DELETED_CHAT:
      return produce(state, (draftState) => {
        delete draftState[action.deletedChatId];
      });
    case ADDED_NEW_CHAT:
      return produce(state, (draftState) => {
        draftState[action.newChat.id] = action.newChat;
      });
    case RENAMED_CHAT:
      return produce(state, (draftState) => {
        draftState[action.newTitleChat.id].title = action.newTitleChat.title;
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

const renameChatModalReducer = (
  state = initialState.renameChatModal,
  action
) => {
  switch (action.type) {
    case OPEN_MODAL_RENAME_CHAT:
      return action.renameChatModal;
    default:
      return state;
  }
};

const confirmModalReducer = (state = initialState.confirmModal, action) => {
  switch (action.type) {
    case OPEN_CONFIRM_MODAL:
      return action.confirmModal;
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
  renameChatModal: renameChatModalReducer,
  confirmModal: confirmModalReducer,
});

export default rootReducer;
