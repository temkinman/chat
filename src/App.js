import React, { useState, useContext } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import produce from "immer";
import "./App.css";
import "./styles/styles.css";
import ChatListHeader from "./Components/ChatList/ChatListHeader";
import Contacts from "./Components/Contacts/Contacts";
import Messages from "./Components/Messages/Messages";
import ContactControl from "./Components/ContactControl/ContactControl";
import NoSelectedChat from "./Components/Messages/NoSelectedChat";
import s from "./Components/Messages/Messages.module.css";
import AddContact from "./Components/AddContact/AddContact";

const initialState = {
  userProfile: {
    id: "1",
    nickName: "Alex",
    avatar: "img",
  },
  chats: {
    111: {
      title: "onliner",
      id: "111",
      messages: [
        {
          time: "2020-07-20T14:12",
          from: "onliner",
          text: "Hello Belarus",
          messageId: "-1",
        },
      ],
      draft: "",
    },
    777: {
      title: "nexta",
      id: "777",
      messages: [
        {
          time: "2020-09-30T20:00",
          from: "nexta",
          text: "Hello",
          messageId: "-2",
        },
      ],
      draft: "",
    },
    888: {
      title: "tutby",
      id: "888",
      messages: [
        {
          time: "2020-08-30T24:00",
          from: "tutBY",
          text: "Hi",
          messageId: "-3",
        },
      ],
      draft: "",
    },
  },
  currentPage: {
    type: "chatList",
    currentChatId: null,
  },
};

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

export const StateContext = React.createContext();

const Router = () => {
  const [state, setState] = useState(initialState);
  const currentChat = state.chats[state.currentPage.currentChatId];

  const onViewChat = (chatId) => {
    const newState = {
      ...state,
      currentPage: { type: "chat", currentChatId: chatId },
    };
    setState(newState);
  };

  const onBack = () => {
    const newState = { ...state, currentPage: { type: "chatList" } };
    setState(newState);
  };

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
    setState(newState);
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

  const getTime = (isoTime) => {
    const time = new Date(isoTime);

    return `${time.getHours()}:${time
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
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

  const [isOpen, setIsOpen] = useState(false);
  const onOpenAddChat = () => {
    setIsOpen(true);
  };

  const onCloseAddChat = () => {
    setIsOpen(false);
  };

  return (
    <BrowserRouter>
      <StateContext.Provider value={state}>
        <div className="container">
          <div className="chatList">
            {/* <Route path='/' component={ChatListHeader}/> */}
            <ChatListHeader />
            <ContactControl onOpenAddChat={onOpenAddChat} />
            <Contacts
              chats={state.chats}
              onViewChat={onViewChat}
              currentChatId={state.currentPage.currentChatId}
            />
          </div>
          <Route path="/addcontact" component={AddContact} />
          <AddContact
            open={isOpen}
            onClose={onCloseAddChat}
            onAddChat={onAddChat}
          />

          {state.currentPage.currentChatId === null ? (
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
      </StateContext.Provider>
    </BrowserRouter>
  );
};

export default Router;
