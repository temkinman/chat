import React from "react";
import Chat from "./Chat/Chat";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChatAction } from "../../actions/chatAction";

const Chats = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats);
  const currentChatId = useSelector((state) => state.currentChatId);

  return (
    <div className="contacts">
      <ul className="contacts-list">
        {Object.values(chats).map((chat) => {
          const isChatActive = currentChatId === chat.id;
          return (
            <Chat
              key={chat.id}
              id={chat.id}
              title={chat.title}
              setCurrentChatAction={setCurrentChatAction}
              dispatch={dispatch}
              isChatActive={isChatActive}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Chats;
