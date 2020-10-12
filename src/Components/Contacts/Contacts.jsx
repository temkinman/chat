import React from "react";
import ContactItem from "./ContactItem/ContactItem";

const Contacts = ({ chats, currentPage }) => {
  console.log(chats);
  console.log(currentPage);
  return (
    <div className="contacts">
      <ul className="contacts-list">
        {Object.values(chats).map((chat) => (
            <ContactItem key={chat.id} />
          <li
            key={chat.id}
            onClick={() => {
              onViewChat(chat.id);
            }}
          >
            {chat.title}
          </li>
        ))}
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
      </ul>
    </div>
  );
};

export default Contacts;
