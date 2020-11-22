import React from "react";
import s from "./ContextMenu.module.css";

const ContextMenuItem = ({ text, id, onChooseHandle }) => {
  return (
    <>
      <li
        className={s.rightClickMenuItem}
        onClick={() => onChooseHandle(id)}
      >
        {text}
      </li>
    </>
  );
};

export default ContextMenuItem;
