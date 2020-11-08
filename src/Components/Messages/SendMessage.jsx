import React from "react";
import s from "./SendMessage.module.css";

const SendMessage = ({
  sendMessageAction,
  draftChangeAction,
  draftText,
  currentChatId,
  dispatch,
}) => {
  const onSendMessageHandle = (event) => {
    event.preventDefault();
    dispatch(sendMessageAction(currentChatId));
  };

  const onInputText = (event) => {
    const newText = event.currentTarget.value;
    dispatch(draftChangeAction(newText, currentChatId));
  };

  return (
    <form className={s.sendMessage} onSubmit={onSendMessageHandle}>
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
