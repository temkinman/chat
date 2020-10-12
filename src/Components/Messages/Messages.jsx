import React from "react";
import UserMessage from "./UserMessage";
import SendMessage from "./SendMessage";

const Messages = () => {
  return (
    <div className="messages-block">
      <p class="current-chat-name">currentChatName</p>
      <div className="messages">
        <UserMessage />
      </div>
      <SendMessage />
    </div>
  );
};

export default Messages;
