import React from "react";
import ContactItem from "./ContactItem/ContactItem";

const Contacts = ({ chats, onViewChat, currentChatId }) => {
  return (
    <div className="contacts">
      <ul className="contacts-list">
        {Object.values(chats).map((chat) => {
          const isChatActive = currentChatId === chat.id;
          return (
            <ContactItem
              key={chat.id}
              id={chat.id}
              title={chat.title}
              onViewChat={onViewChat}
              isChatActive={isChatActive}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Contacts;
