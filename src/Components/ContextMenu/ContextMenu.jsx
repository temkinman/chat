import React, { useState } from "react";
import ContextMenuItem from "./ContextMenuItem";
import s from "./ContextMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import { openContextMenuAction } from "../../store/actions/chatAction";
import { openRenameChatAction } from "../../store/actions/openRenameChatAction";
import RenameChat from "./../RenameChat/RenameChat";

const ContextMenu = ({ contextMenuList, isActive, positionMenu, onChooseHandle }) => {
  const isOpen = useSelector((state) => state.renameChatModal);
  const dispatch = useDispatch();

  const onClose = () => {
    console.log("onClosing....");
  };

  const onCloseHandle = (e) => {
    e.preventDefault();
    dispatch(openContextMenuAction(false));
  };

  

  return (
    <>
      <div
        className={s.overlay}
        onClick={() => dispatch(openContextMenuAction(false))}
        onContextMenu={(e) => onCloseHandle(e)}
      ></div>
      <ul
        className={`${s.rightClickMenu} ${isActive ? `${s.active}` : ""}`}
        style={positionMenu}
      >
        {contextMenuList.map((item, ind) => (
          <ContextMenuItem
            key={ind}
            text={item.title}
            id={ind}
            onCloseHandle={onCloseHandle}
            onChooseHandle={onChooseHandle}
          />
        ))}
      </ul>
      {<RenameChat isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default ContextMenu;
