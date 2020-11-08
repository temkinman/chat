import React from "react";
import { NavLink } from "react-router-dom";
import s from "./ChatControl.module.css";

const ChatControl = ({ onOpenAddChat }) => {
  return (
    <div className={s.chatControl}>
      
        <NavLink to="/addchat" className={s.link}>
          <button className="btn btn-secondary btn-sm" onClick={onOpenAddChat}>add contact</button>
        </NavLink>
      
      {/* <button>remove contact</button> */}
    </div>
  );
};

export default ChatControl;
