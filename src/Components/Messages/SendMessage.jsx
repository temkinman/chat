import React from "react";
import sentMessage from "../../store/actions/sentMessage";
import s from "./SendMessage.module.css";
import draftChanged from '../../store/actions/draftChanged'

const SendMessage = ({
  draftChangeAction,
  draftText,
  currentChatId,
  dispatch,
}) => {
  const onSendMessageHandle = (event) => {
    event.preventDefault();
    dispatch(sentMessage(currentChatId));
  };

  const onInputText = (event) => {
    const newText = event.currentTarget.value;
    dispatch(draftChangeAction(newText, currentChatId));
    // dispatch(draftChanged(newText, currentChatId))
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
