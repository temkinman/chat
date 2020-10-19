import React, { useContext } from "react";
import UserMessage from "./UserMessage";
import SendMessage from "./SendMessage";
import s from "./Messages.module.css";
import { StateContext } from "../../App";
import NoSelectedChat from "./NoSelectedChat";

const Messages = ({ onSendMessage, onDraftChange }) => {
  const contextData = useContext(StateContext);
  const currentChat = contextData.currentPage.currentChatId;
  let messages = [];
  let draftText = "";
  let currentChatName = "";

  if (currentChat !== null) {
    messages = contextData.chats[currentChat].messages;
    draftText = contextData.chats[currentChat].draft;
    currentChatName = contextData.chats[currentChat].title;
  }

  return (
    <div className={s.messagesBlock}>
      <p className={s.currentChatName}>{currentChatName}</p>
      <div className={s.messages}>
        {currentChat === null ? (
          <NoSelectedChat />
        ) : (
          messages.map((_, ind, messages) => {
            const item = messages[messages.length - 1 - ind];
            return (
              <UserMessage
                key={item.messageId}
                message={item}
                getTime={contextData.getTime}
              />
            );
          })
        )}
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
