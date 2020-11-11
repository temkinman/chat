import React, { useState } from "react";
import avatarMale from "../../../images/faces/male-default-avatar.png";
import avatarMan from "../../../images/faces/man-default-avatar.png";
import s from "./Chat.module.css";
import "./contextMenu.css";
import ContextMenu from "../../ContextMenu/ContextMenu";
import { context_menu_chats } from "../../../store/constants";

const Chat = ({
  id,
  title,
  isChatActive,
  dispatch,
  setCurrentChatAction,
  onOpenContextMenuHandle,
  isOpenContextMenu,
  currentChatId,
  positionMenu,
}) => {
  const styleContact = `${s.item} ${isChatActive ? "active" : ""}`;

  return (
    <>
      <li
        className={styleContact}
        onClick={() => dispatch(setCurrentChatAction(id))}
        onContextMenu={(e) => onOpenContextMenuHandle(e, id)}
      >
        <img className={s.avatar} src={avatarMale} alt="" />
        <span className={s.name}>{title}</span>
        <span className={s.unreadMessage}>3</span>
      </li>
      {isOpenContextMenu && currentChatId === id && (
        <ContextMenu
          isActive={isOpenContextMenu}
          listItems={context_menu_chats.items}
          classNames={context_menu_chats.classNames}
          positionMenu={positionMenu}
        />
      )}
    </>
  );
};

export default Chat;
