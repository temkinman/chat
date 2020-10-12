import React, { useState } from "react";
import produce from "immer";
import "./App.css";
import ChatList from "./Chatlist";
import Chat from "./Chat";
import AddChat from "./AddChat";

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

const getTime = (isoTime) => {
  const time = new Date(isoTime);

  return `${time.getHours()}:${time
    .getMinutes()
    .toString()
    .padStart(2, "0")} ${time.getDate()} ${
    months[time.getMonth()]
  } ${time.getFullYear()}г.`;
};

// const generateMessageId = () => (Math.random() * 100000).toString();

const generateId = () => (Math.random() * 100000).toString();

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
      draftState.chats[draftState.currentPage.currentChatId].messages.push(
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
    const newChat = {id: id, title: chatName, messages:[], draft: ''};

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

  return state.currentPage.type === "chat" ? (
    <Chat
      currentChat={currentChat}
      onBack={onBack}
      onSendMessage={onSendMessage}
      onDraftChange={onDraftChange}
      getTime={getTime}
    />
  ) : state.currentPage.type === "chatList" ? (
    <div>
      <ChatList
        chats={state.chats}
        onViewChat={onViewChat}
        onGoToAddChat={onGoToAddChat}
      />
    </div>
  ) : state.currentPage.type === "addChat" ? (
    <AddChat onBack={onBack} onAddChat={onAddChat} />
  ) : (
    <div>page not found</div>
  );
};

export default Router;