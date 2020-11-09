import React, { useState } from "react";
import ReactDom from "react-dom";
import s from "./AddChat.module.css";
import { useDispatch } from "react-redux";
import { addNewChatAction } from "../../store/actions/newChatAction";

const AddChat = ({ isOpen, onClose }) => {
  const [titleChat, setTitleChat] = useState("");
  const dispatch = useDispatch();

  const onChangeInput = (event) => {
    const newTitleChat = event.currentTarget.value;
    setTitleChat(newTitleChat);
  };

  const onAddChatHandle = (event) => {
    event.preventDefault();
    if (titleChat.length === 0) {
      return;
    }

    dispatch(addNewChatAction(titleChat));
    onClose();
  };

  if (!isOpen) {
    return null;
  }
  
  return ReactDom.createPortal(
    <>
      <div className={s.overlay} onClick={onClose}></div>
      <form className={s.modal} onSubmit={onAddChatHandle}>
        <div className={s.header}>
          <button type="button" className={s.close} onClick={onClose}>
            {"\u00D7"}
          </button>
        </div>
        <div className={s.body}>
          <span className={s.nameChat}>chat name</span>
          <input
            type="text"
            className={s.nameInput}
            placeholder="enter name"
            onChange={onChangeInput}
            autoFocus
          ></input>
        </div>
        <div className={s.footer}>
          <button type="submit" className={s.btn}>
            ok
          </button>
          <button type="button" onClick={onClose} className={s.btn}>
            cancel
          </button>
        </div>
      </form>
    </>,
    document.getElementById("portal")
  );
};

export default AddChat;
