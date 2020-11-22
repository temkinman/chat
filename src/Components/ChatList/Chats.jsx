import React, { useState } from "react";
import Chat from "./Chat/Chat";
import ContextMenu from "./../ContextMenu/ContextMenu";
import { useDispatch, useSelector } from "react-redux";
import { openRenameChatAction } from "./../../store/actions/openRenameChatAction";
import {
  setCurrentChatAction,
  openContextMenuAction,
} from "../../store/actions/chatAction";
import RenameChat from "../RenameChat/RenameChat";

const Chats = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats);
  const currentChatId = useSelector((state) => state.currentChatId);
  const [currentChatTitle, setCurrentChatTitle] = useState("");
  const isOpenContextMenu = useSelector((state) => state.contextMenu);
  const isOpenRenameChat = useSelector((state) => state.renameChatModal);
  const [positionMenu, setPositionMenu] = useState({});

  const contextMenuList = [
    { title: "rename chat", action: () => openRenameChatAction(true) },
    { title: "delete chat", action: () => console.log("deleting chat ...") },
    {
      title: "clear history",
      action: () => console.log("clearing history ..."),
    },
  ];

  const onOpenContextMenuHandle = (e, id, title) => {
    e.preventDefault();
    setCurrentChatTitle(title);
    setPositionMenu({
      top: `${e.clientY}px`,
      left: `${e.clientX}px`,
    });
    dispatch(openContextMenuAction(true));
    dispatch(setCurrentChatAction(id));
  };

  const onChooseHandle = (id) => {
    console.log("onChooseHandle id ", id);
    switch (id) {
      case 0:
        console.log("renaming chat ...");
        dispatch(openRenameChatAction(true));
        // setIsOpenModal(true);
        break;
      case 1:
        console.log("deleting chat ...");
        break;
      case 2:
        console.log("clearing history ...");
        break;
      default:
        break;
    }
    dispatch(openContextMenuAction(false));
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
                contextMenuList={contextMenuList}
              />
              {isOpenContextMenu && (
                <ContextMenu
                  isActive={isOpenContextMenu}
                  contextMenuList={contextMenuList}
                  positionMenu={positionMenu}
                  onChooseHandle={onChooseHandle}
                />
              )}
              {isOpenRenameChat && (
                <RenameChat
                  isOpen={isOpenRenameChat}
                  title={currentChatTitle}
                />
              )}
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Chats;
