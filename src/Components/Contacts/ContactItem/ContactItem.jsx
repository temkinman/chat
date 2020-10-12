import React from "react";
import style from "./ContactItem.module.css";
import avatarMale from '../../../images/faces/male-default-avatar.png'
import avatarMan from '../../../images/faces/man-default-avatar.png'

const ContactItem = () => {
  return (
    <li className={style.item}>
      <img
        className={style.avatar}
        src={avatarMale}
        alt=""
      />
      <span className={style.name}>John Smith</span>
      <span className={style.unreadMessage}>3</span>
    </li>
  );
};

export default ContactItem;
