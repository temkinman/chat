import React from "react";
import ReactDom from "react-dom";
import s from "./ConfirmModal.module.css";
import { useDispatch } from "react-redux";
import { openConfirmAction } from "../../store/actions/openConfirmAction";

const ConfirmModal = ({ isOpen, questionText, actionWithChat, currentChatId  }) => {
  const dispatch = useDispatch();

  const onSubmitFormHandle = (event) => {
    event.preventDefault();
    dispatch(openConfirmAction(false));
    // console.log('actionHandle ',actionHandle)
    actionWithChat(currentChatId);
  };

  const onClose = () => {
    dispatch(openConfirmAction(false));
  }

  if (!isOpen) {
    return null;
  }
  
  return ReactDom.createPortal(
    <>
      <div className={s.overlay} onClick={onClose}></div>
      <form className={s.modal} onSubmit={onSubmitFormHandle}>
        <div className={s.header}>
          <button type="button" className={s.close} onClick={onClose}>
            {"\u00D7"}
          </button>
        </div>
        <div className={s.body}>
          {questionText}
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

export default ConfirmModal;
