import React from "react";
import { BrowserRouter } from "react-router-dom";
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
import { openAddNewChatAction } from "./store/actions/newChatAction";
import {getTime} from './Utils/Utils'

export const StateContext = React.createContext();

const Router = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const isOpen = state.newChatModal;

  const onOpenAddChat = () => dispatch(openAddNewChatAction(true));
  const onCloseAddChat = () => dispatch(openAddNewChatAction(false));

  return (
    <BrowserRouter>
      <div className="container">
        <div className="chatList">
          <ChatListHeader />
          <ChatControl onOpenAddChat={onOpenAddChat} />
          <Chats />
        </div>
        {<AddChat isOpen={isOpen} onClose={onCloseAddChat} />}

        {state.currentChatId === null ? (
          <div className={s.messagesBlock}>
            <div className={s.messages}>
              <NoSelectedChat />
            </div>
          </div>
        ) : (
          <Messages getTime={getTime} currentChatId={state.currentChatId} />
        )}
      </div>
    </BrowserRouter>
  );
};

export default Router;
