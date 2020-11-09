import React from "react";
import logo from "../../images/icons/globe-americas.svg";
import s from "./ChatList.module.css";

const ChatListHeader = () => {
  return (
    <div className={s.chatListTop}>
      <img className={s.logo} src={logo} alt="" />
      <span className={s.title}>QuickChat</span>
    </div>
  );
};

export default ChatListHeader;
