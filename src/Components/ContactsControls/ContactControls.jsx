import React from "react";
import { NavLink } from "react-router-dom";
import s from "./ChatControls.module.css";

const ContactControls = () => {
  return (
    <div className={s.contactsControl}>
      <button className="btn btn-secondary btn-sm">
        <NavLink to="/addchat" className={s.link}>
          add contact
        </NavLink>
      </button>
      {/* <button>remove contact</button> */}
    </div>
  );
};

export default ContactControls;
