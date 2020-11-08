import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import produce from "immer";
import "./App.css";
import "./styles/styles.css";
import ChatListHeader from "./Components/ChatListHeader/ChatListHeader";
import Chats from "./Components/ChatList/Chats";
import Messages from "./Components/Messages/Messages";
import ChatControl from "./Components/ChatControl/ChatControl";
import NoSelectedChat from "./Components/Messages/NoSelectedChat";
import s from "./Components/Messages/Messages.module.css";
import AddChat from "./Components/AddChat/AddChat";
import { useSelector, useDispatch } from "react-redux";
import { openModalAddNewChatAction } from "./actions/newChatAction";

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

export const generateId = () => Math.floor(Math.random() * 100000);

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
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const isOpen = state.newChatModal;

  const onOpenAddChat = () => dispatch(openModalAddNewChatAction(true));

  const onCloseAddChat = () => dispatch(openModalAddNewChatAction(false));

  return (
    <BrowserRouter>
      <div className="container">
        <div className="chatList">
          <ChatListHeader />
          <ChatControl onOpenAddChat={onOpenAddChat} />
          <Chats />
        </div>
        <AddChat
          isOpen={isOpen}
          onClose={onCloseAddChat}
        />

        {state.currentChatId === null ? (
          <div className={s.messagesBlock}>
            <div className={s.messages}>
              <NoSelectedChat />
            </div>
          </div>
        ) : (
          <Messages
            getTime={getTime}
            currentChatId={state.currentChatId}
          />
        )}
      </div>
    </BrowserRouter>
  );
};

export default Router;
