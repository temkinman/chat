import React from "react";
import UserMessage from "./UserMessage";
import SendMessage from "./SendMessage";
import s from "./Messages.module.css";
import { useSelector, useDispatch } from "react-redux";
import { draftChangeAction } from "../../store/actions/draftChangeAction";
import { sendMessageAction } from "../../store/actions/messageAction";

const Messages = ({ getTime, currentChatId }) => {
  const currentChat = useSelector((state) => state.chats)[currentChatId];
  const dispatch = useDispatch();

  const messages = currentChat.messages;
  const draftText = currentChat.draft;
  const currentChatName = currentChat.title;

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
        sendMessageAction={sendMessageAction}
        draftChangeAction={draftChangeAction}
        draftText={draftText}
        dispatch={dispatch}
        currentChatId={currentChatId}
      />
    </div>
  );
};

export default Messages;
