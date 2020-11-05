import React, {useState} from "react";
import s from './SendMessage.module.css';

const SendMessage = ({onSendMessage, onDraftChange, draftText}) => {

  const onSendMessageHandle = (event) => {
    event.preventDefault();
    onSendMessage();
  }

  const onInputText = (event) => {
    const newText = event.currentTarget.value;
    onDraftChange(newText);
  }

  return (
    <form action="" className={s.sendMessage} onSubmit={onSendMessageHandle}>
      <input
        className={s.sendText}
        type="text"
        placeholder="Enter your message here"
        onChange={onInputText}
        value={draftText}
      />
      <button className={s.sendBtn} type="submit">
        send
      </button>
    </form>
  );
};

export default SendMessage;
