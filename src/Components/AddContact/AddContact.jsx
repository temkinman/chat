import React, { useState } from "react";
import ReactDom from "react-dom";
import s from "./AddContact.module.css";

const AddContact = ({ open, onClose, onAddChat }) => {
  const [titleChat, setTitleChat] = useState("");

  const onChangeInput = (event) => {
    const newTitleChat = event.currentTarget.value;
    setTitleChat(newTitleChat);
  };

  const onAddChatHandle = (event) => {
    event.preventDefault();
    if (titleChat.length === 0) {
      return;
    }

    onAddChat(titleChat);
    onClose();
  };

  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div className={s.overlay} onClick={onClose}></div>
      <form action="" className={s.modal} onSubmit={onAddChatHandle}>
        <div className={s.header}>
          <button className={s.close} onClick={onClose}>{"\u00D7"}</button>
        </div>
        <div className={s.body}>
          <span className={s.nameContact}>contact name</span>
          <input className={s.nameInput} placeholder="enter name" onChange={onChangeInput}></input>
        </div>
        <div className={s.footer}>
          <button type="submit" className={s.okBtn}>ok</button>
          <button onClick={onClose}>cancel</button>
        </div>
      </form>
    </>,
    document.getElementById("portal")
  );
};

export default AddContact;
