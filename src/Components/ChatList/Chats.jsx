import React, { useEffect, useState } from "react";
import Chat from "./Chat/Chat";
import ContextMenu from "./../ContextMenu/ContextMenu";
import { useDispatch, useSelector } from "react-redux";
import { openRenameChatAction } from "./../../store/actions/openRenameChatAction";
import {
  setCurrentChatAction,
  openContextMenuAction,
} from "../../store/actions/chatAction";
import RenameChat from "../RenameChat/RenameChat";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { openConfirmAction } from "../../store/actions/openConfirmAction";
import { chatsFetched } from "../../store/actions/chatsFetched";
import renamedChat from "../../store/actions/renamedChat";
// import axios from "axios";

const Chats = () => {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats);
  const state = useSelector((state) => state);
  const currentChatId = useSelector((state) => state.currentChatId);
  const [currentChatTitle, setCurrentChatTitle] = useState("");
  const isOpenContextMenu = useSelector((state) => state.contextMenu);
  const isOpenRenameChat = useSelector((state) => state.renameChatModal);
  const isOpenConfirmModal = useSelector((state) => state.confirmModal);
  const currentUserId = useSelector((state) => state.currentUser);
  const [positionMenu, setPositionMenu] = useState({});
  const [questionText, setQuestionText] = useState("");
  let actionWithChat = true;

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

  async function changeData(url = "", data = {}, method) {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }

  const changeChatName = async (title) => {
    dispatch(renamedChat(title, currentChatId));
  }

  async function deleteChat(currentChatId) {  
    actionWithChat = this.deleteChat();
    const chatsResponse = changeData(
      `http://localhost:3000/chat/${currentChatId}`,
      null,
      "DELETE"
    );
    dispatch(setCurrentChatAction(null));
    dispatch(chatsFetched(await chatsResponse));
  }

  async function clearHistory(currentChatId) {
    console.log('clearHistory client')
    const chatsResponse = changeData(
      `http://localhost:3000/chat/history/${currentChatId}`,
      null,
      "DELETE"
    );
    dispatch(chatsFetched(await chatsResponse));
  }

  const onChooseHandle = (id) => {
    switch (id) {
      case 0: //rename chat
        dispatch(openRenameChatAction(true));
        break;
      case 1:
        console.log("deleting chat ...");
        // needToDeleteChat = true;
        setQuestionText("Do you want to delete this chat?");
        dispatch(openConfirmAction(true));
        break;
      case 2:
        // needToDeleteChat = false;
        actionWithChat = false;
        setQuestionText("Do you want to clear history?");
        dispatch(openConfirmAction(true));
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
                  confirmChangeChatName={changeChatName}
                />
              )}
              {isOpenConfirmModal && (
                <ConfirmModal
                  isOpen={isOpenConfirmModal}
                  questionText={questionText}
                  actionHandle={ actionWithChat ? deleteChat : clearHistory}
                  currentChatId={currentChatId}
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
