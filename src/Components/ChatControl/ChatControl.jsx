import React from "react";
import s from "./ChatControl.module.css";

const ChatControl = ({ onOpenAddChat }) => {
  return (
    <div className={s.chatControl}>
      <button className="btn btn-secondary btn-sm" onClick={onOpenAddChat}>
        +
      </button>
    </div>
  );
};

export default ChatControl;
