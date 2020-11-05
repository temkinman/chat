import React, { useState, useContext } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import produce from "immer";
import "./App.css";
import "./styles/styles.css";
import ChatListHeader from "./Components/ChatListHeader/ChatListHeader";
import Chats from "./Components/ChatList/Chats";
import Messages from "./Components/Messages/Messages";
import ContactControl from "./Components/ChatControl/ChatControl";
import NoSelectedChat from "./Components/Messages/NoSelectedChat";
import s from "./Components/Messages/Messages.module.css";
import AddChat from "./Components/AddChat/AddChat";
import rootReducer from "./reducers/rootReducer";
import { createStore } from "redux";
import { Provider } from "react-redux";
import initialState from './redux/store'



const months = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

const generateId = () => (Math.random() * 100000).toString();

const store = createStore(rootReducer);
console.log('store', store.getState());

export const StateContext = React.createContext();

const getTime = (isoTime) => {
  const time = new Date(isoTime);

  return `${time.getHours()}:${time.getMinutes().toString().padStart(2, "0")}`;
};

const getFullTime = (isoTime) => {
  const time = new Date(isoTime);

  return `${time.getHours()}:${time
    .getMinutes()
    .toString()
    .padStart(2, "0")} ${time.getDate()} ${
    months[time.getMonth()]
  } ${time.getFullYear()}г.`;
};

const Router = () => {
  const [state, setState] = useState(initialState);
  // const state = store.getState();
  console.log('state!!! ', state )
  const currentChat = state.chats[state.currentChatId];

  // const onViewChat = (chatId) => {
  //   const newState = {
  //     ...state,
  //     currentPage: { type: "chat", currentChatId: chatId },
  //   };
  //   setState(newState);
  // };

  // const onBack = () => {
  //   const newState = { ...state, currentPage: { type: "chatList" } };
  //   setState(newState);
  // };

  const onSendMessage = () => {
    if (currentChat.draft === "") return;

    const newMessage = {
      time: new Date(),
      from: currentChat.title,
      text: currentChat.draft,
      messageId: generateId(),
    };

    const newState = produce(state, (draftState) => {
      draftState.chats[draftState.currentPage.currentChatId].messages.unshift(
        newMessage
      );
      draftState.chats[draftState.currentPage.currentChatId].draft = "";
    });

    setState(newState);
  };

  const onDraftChange = (text) => {
    const newState = produce(state, (draftState) => {
      draftState.chats[draftState.currentPage.currentChatId].draft = text;
    });
    //setState(newState);
  };

  const onGoToAddChat = () => {
    const newState = { ...state, currentPage: { type: "addChat" } };
    setState(newState);
  };

  const onAddChat = (chatName) => {
    const id = generateId();
    const newChat = { id: id, title: chatName, messages: [], draft: "" };

    const newState = produce(state, (draftState) => {
      draftState.chats[id] = newChat;
      draftState.currentPage = { type: "chat", currentChatId: id };
    });
    /*  const newState = {
      ...state,
      chats: {
        ...state.chats,
        [id]: { title: chatName, id: id, messages: [], draft: "" },
      },
      currentPage: { type: "chat", currentChatId: id },
    };*/
    setState(newState);
  };

  const [isOpen, setIsOpen] = useState(false);
  const onOpenAddChat = () => {
    setIsOpen(true);
  };

  const onCloseAddChat = () => {
    setIsOpen(false);
  };

  return (
    <BrowserRouter>
      <Provider store={store}>
        {/* <StateContext.Provider value={state}> */}
          <div className="container">
            <div className="chatList">
              {/* <Route path='/' component={ChatListHeader}/> */}
              <ChatListHeader />
              <ContactControl onOpenAddChat={onOpenAddChat} />
              <Chats
              //chats={state.chats}
              //onViewChat={onViewChat}
              //currentChatId={state.currentPage.currentChatId}
              />
            </div>
            <Route path="/addcontact" AddChat />
            <AddChat
              open={isOpen}
              onClose={onCloseAddChat}
              onAddChat={onAddChat}
            />

            {state.currentChatId === null ? (
              <div className={s.messagesBlock}>
                <div className={s.messages}>
                  <NoSelectedChat />
                </div>
              </div>
            ) : (
              <Messages
                onSendMessage={onSendMessage}
                onDraftChange={onDraftChange}
                getTime={getTime}
              />
            )}
          </div>
        {/* </StateContext.Provider> */}
      </Provider>
    </BrowserRouter>
  );
};

export default Router;
