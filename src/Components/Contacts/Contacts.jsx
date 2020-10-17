import React from "react";
import ContactItem from "./ContactItem/ContactItem";

const Contacts = ({ chats, currentPage, onViewChat }) => {
  
  return (
    <div className="contacts">
      <ul className="contacts-list">
        {Object.values(chats).map((chat) => (
          <ContactItem key={chat.id} id={chat.id} title={chat.title} onViewChat={onViewChat} />
          // <li
          //   key={chat.id}
          //   onClick={() => {
          //     onViewChat(chat.id);
          //   }}
          // >
          //   {chat.title}
          // </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
