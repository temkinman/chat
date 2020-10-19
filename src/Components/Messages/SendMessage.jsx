import React, {useState} from "react";

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
    <form action="" className="send-message" onSubmit={onSendMessageHandle}>
      <input
        className="send-text"
        type="text"
        placeholder="Enter your message here"
        onChange={onInputText}
        value={draftText}
      />
      <button className="send-btn" type="submit">
        send
      </button>
    </form>
  );
};

export default SendMessage;
