import React from "react";
import avatarMale from "../../../images/faces/male-default-avatar.png";
import avatarMan from "../../../images/faces/man-default-avatar.png";
import s from "./Chat.module.css";
import ContextMenuContainer from "../../ContextMenu/ContextMenu";

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
  contextMenuList
}) => {
  const styleContact = `${s.item} ${isChatActive ? `${s.activeChat}` : ""}`;

  return (
    <>
      <li
        className={styleContact}
        onClick={() => dispatch(setCurrentChatAction(id))}
        onContextMenu={(e) => onOpenContextMenuHandle(e, id, title)}
      >
        <img className={s.avatar} src={avatarMale} alt="" />
        <span className={s.name}>{title}</span>
        <span className={s.unreadMessage}>3</span>
      </li>
      {/* {isOpenContextMenu && currentChatId === id && (
        <ContextMenuContainer
          isActive={isOpenContextMenu}
          contextMenuList={contextMenuList}
          positionMenu={positionMenu}
        />
      )} */}
    </>
  );
};

export default Chat;
