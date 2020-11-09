import React from "react";
import avatarMale from "../../../images/faces/male-default-avatar.png";
import avatarMan from "../../../images/faces/man-default-avatar.png";
import s from "./Chat.module.css";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

const Chat = ({ id, title, isChatActive, dispatch, setCurrentChatAction }) => {
  const styleContact = `${s.item} ${isChatActive ? "active" : ""}`;

  function handleClick(e, data) {
    console.log("OK");
    console.log(data.foo);
  }
  return (
    <>
      <ContextMenuTrigger id="chatActions">
        <li
          className={styleContact}
          onClick={() => dispatch(setCurrentChatAction(id))}
        >
          <img className={s.avatar} src={avatarMale} alt="" />
          <span className={s.name}>{title}</span>
          <span className={s.unreadMessage}>3</span>
        </li>
      </ContextMenuTrigger>

      <ContextMenu id="chatActions" className={s.contextMenu}>
        <MenuItem
          data={{ foo: "bar1" }}
          onClick={(e) => handleClick()}
          className={styleContact + s.contextmenuItem}
        >
          rename chat
        </MenuItem>
        <MenuItem
          data={{ foo: "bar2" }}
          onClick={handleClick}
          className={styleContact + s.contextmenuItem}
        >
          delete chat
        </MenuItem>
        <MenuItem divider />
        <MenuItem
          data={{ foo: "bar3" }}
          onClick={handleClick}
          className={styleContact + s.contextmenuItem}
        >
          clear history
        </MenuItem>
      </ContextMenu>
    </>
  );
};

export default Chat;
