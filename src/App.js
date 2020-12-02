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
import { getTime } from "./Utils/Utils";
import { useEffect } from "react";
import { chatsFetched } from "./store/actions/chatsFetched";
import Authorization from "./Components/Authorization/AuthorizationForm";

const Router = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const isOpen = state.newChatModal;

  const onOpenAddChat = () => dispatch(openAddNewChatAction(true));
  const onCloseAddChat = () => dispatch(openAddNewChatAction(false));

  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }

  useEffect(() => {
    async function fetchData() {
      // const chatsResponse = postData("http://localhost:3000/chats", {
      //   id: state.currentUser,
      // });
      const chatsResponse = postData("http://localhost:3000/chats");
      dispatch(chatsFetched(await chatsResponse));
    }
    fetchData();
  }, [dispatch]);

  return (
    <BrowserRouter>
      {false ? (
        <div className="container">
          <Authorization />
        </div>
      ) : (
        <div className="containerApp">
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
      )}
    </BrowserRouter>
  );
};

export default Router;
