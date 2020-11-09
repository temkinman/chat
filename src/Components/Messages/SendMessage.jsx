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

  // var textarea = document.querySelectorAll("textarea");

  // textarea.addEventListener("keydown", autosize);

  // function autosize() {
  //   var el = this;
  //   setTimeout(function () {
  //     el.style.cssText = "height:auto; padding:0";
  //     // for box-sizing other than "content-box" use:
  //     // el.style.cssText = '-moz-box-sizing:content-box';
  //     el.style.cssText = "height:" + el.scrollHeight + "px";
  //   }, 0);
  // }

  return (
    <form className={s.sendMessage} onSubmit={onSendMessageHandle}>
      <input
        className={s.sendText}
        type="text"
        placeholder="Enter your message here"
        onChange={onInputText}
        value={draftText}
      />
      {/* <textarea
        className={s.sendText}
        name=""
        id=""
        cols="30"
        rows="1"
        placeholder="Enter your message here"
        onChange={onInputText}
        value={draftText}
      ></textarea> */}
      <button className={s.sendBtn} type="submit">
        send
      </button>
    </form>
  );
};

export default SendMessage;
