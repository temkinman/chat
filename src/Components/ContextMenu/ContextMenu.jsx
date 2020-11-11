import React from "react";
import ContextMenuItem from "./ContextMenuItem";
import s from "./ContextMenu.module.css";
import { useDispatch } from "react-redux";
import { openContextMenuAction } from "../../store/actions/chatAction";

const ContextMenu = ({
  listItems,
  action,
  actionTypes,
  isActive,
  positionMenu,
}) => {
  const dispatch = useDispatch();

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
        {listItems.map((item, ind) => (
          <ContextMenuItem
            key={ind}
            text={item}
            onCloseHandle={onCloseHandle}
          />
        ))}
      </ul>
    </>
  );
};

export default ContextMenu;
