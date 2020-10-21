import React from "react";
import { NavLink } from "react-router-dom";
import s from "./ContactControl.module.css";

const ContactControls = ({ onOpenAddChat }) => {
  return (
    <div className={s.contactsControl}>
      
        <NavLink to="/addcontact" className={s.link}>
        <button className="btn btn-secondary btn-sm" onClick={onOpenAddChat}>add contact</button>
        </NavLink>
      
      {/* <button>remove contact</button> */}
    </div>
  );
};

export default ContactControls;
