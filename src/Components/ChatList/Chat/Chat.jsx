import React from "react";
import avatarMale from "../../../images/faces/male-default-avatar.png";
import avatarMan from "../../../images/faces/man-default-avatar.png";
import s from "./Chat.module.css";

const Chat = ({ id, title, isChatActive, dispatch, setCurrentChatAction }) => {
  const styleContact = `${s.item} ${isChatActive ? 'active' : ''}`;
  return (
    <li className={styleContact} onClick={() => dispatch(setCurrentChatAction(id))}>
      <img className={s.avatar} src={avatarMale} alt="" />
      <span className={s.name}>{title}</span>
      <span className={s.unreadMessage}>3</span>
    </li>
  );
};

export default Chat;
