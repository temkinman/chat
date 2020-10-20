import React, { useContext } from "react";
import UserMessage from "./UserMessage";
import SendMessage from "./SendMessage";
import s from "./Messages.module.css";
import { StateContext } from "../../App";

const Messages = ({ onSendMessage, onDraftChange, getTime }) => {
  const contextData = useContext(StateContext);
  const currentChat = contextData.currentPage.currentChatId;
  const activeChat = contextData.chats[currentChat];
  
  const messages = activeChat.messages;
  const draftText = activeChat.draft;
  const currentChatName = activeChat.title;

  return (
    <div className={s.messagesBlock}>
      <p className={s.currentChatName}>{currentChatName}</p>
      <div className={s.messages}>
        {messages.map((message) => {
          return (
            <UserMessage
              key={message.messageId}
              message={message}
              getTime={getTime}
            />
          );
        })}
      </div>
      <SendMessage
        onSendMessage={onSendMessage}
        onDraftChange={onDraftChange}
        draftText={draftText}
      />
    </div>
  );
};

export default Messages;
