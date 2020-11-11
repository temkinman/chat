import React, {useState} from "react";
import Chat from "./Chat/Chat";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentChatAction,
  openContextMenuAction,
} from "../../store/actions/chatAction";

const Chats = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats);
  const currentChatId = useSelector((state) => state.currentChatId);
  const isOpenContextMenu = useSelector((state) => state.contextMenu);
  const [positionMenu, setPositionMenu] = useState({})

  const onOpenContextMenuHandle = (e, id) => {
    e.preventDefault();
    setPositionMenu({
      top: `${e.clientY}px`,
      left: `${e.clientX}px`,
    });
    dispatch(openContextMenuAction(true));
    dispatch(setCurrentChatAction(id));
  };

  return (
    <div className="contacts">
      <ul className="contacts-list">
        {Object.values(chats).map((chat) => {
          const isChatActive = currentChatId === chat.id;
          return (
            <>
              <Chat
                key={chat.id}
                id={chat.id}
                title={chat.title}
                setCurrentChatAction={setCurrentChatAction}
                dispatch={dispatch}
                isChatActive={isChatActive}
                isOpenContextMenu={isOpenContextMenu}
                openContextMenuAction={openContextMenuAction}
                onOpenContextMenuHandle={onOpenContextMenuHandle}
                currentChatId={currentChatId}
                positionMenu={positionMenu}
              />
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Chats;
