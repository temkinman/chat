import React from "react";
import ContactItem from './Components/Contacts/ContactItem/ContactItem'

const ChatList = ({ chats, onViewChat, onGoToAddChat }) => {

  return (
    <div>
      <ContactItem />
      <button onClick={onGoToAddChat}>add new chat</button>
      <ul>
        {Object.values(chats).map((chat) => (
          <li
            key={chat.id}
            onClick={() => {
              onViewChat(chat.id);
            }}
          >
            {chat.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
