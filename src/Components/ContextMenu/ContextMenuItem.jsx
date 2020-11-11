import React from "react";
import s from "./ContextMenu.module.css";

const ContextMenuItem = ({ text, onCloseHandle }) => {
  return (
    <>
      <li
        className={s.rightClickMenuItem}
        onClick={(event) => onCloseHandle(event)}
      >
        {text}
      </li>
    </>
  );
};

export default ContextMenuItem;
