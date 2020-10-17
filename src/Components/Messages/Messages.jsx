import React from "react";
import UserMessage from "./UserMessage";
import SendMessage from "./SendMessage";
import s from './Messages.module.css'

const NoSelectedChat = () => {
  return <h1 className={s.notSelectedChannel}>Choice contact, wich you will write</h1>
}

const Messages = ({currentPage}) => {
  return (
    <div className={s.messagesBlock}>
      <p class={s.currentChatName}>currentChatName</p>
      <div className={s.messages}>
        {currentPage === null ? <NoSelectedChat />: <UserMessage />}
      </div>
      <SendMessage />
    </div>
  );
};

export default Messages;
