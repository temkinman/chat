import React from "react";
import avatarMale from "../../../images/faces/male-default-avatar.png";
import s from "./Chat.module.css";

const Chat = ({
  id,
  title,
  isChatActive,
  dispatch,
  setCurrentChatAction,
  onOpenContextMenuHandle,
}) => {
  const styleContact = `${s.item} ${isChatActive ? "active" : ""}`;

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
