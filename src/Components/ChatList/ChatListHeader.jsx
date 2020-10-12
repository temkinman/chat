import React from "react";
import logo from "../../images/icons/globe-americas.svg";
import style from './ChatList.module.css'

const ChatListHeader = () => {
  return (
    <div className={style.chatListTop}>
      <img class={style.logo} src={logo} alt="" />
      <span class={style.title}>QuickChat</span>
    </div>
  );
};

export default ChatListHeader;
