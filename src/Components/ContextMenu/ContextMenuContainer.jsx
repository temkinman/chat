import React, { useState } from "react";
import ContextMenu from "./ContextMenu";
import RenameChat from "../RenameChat/RenameChat";
import { useDispatch, useSelector } from "react-redux";
import { openContextMenuAction } from "../../store/actions/chatAction";
import { openRenameChatAction } from "../../store/actions/openRenameChatAction";

const ContextMenuContainer = ({ contextMenuList, positionMenu }) => {
  const isOpen = useSelector((state) => state.renameChatModal);
  const dispatch = useDispatch();
  // const [isOpenModal, setIsOpenModal] = useState(false)
  const list = [
    { title: "rename chat", action: () => openRenameChatAction(true) },
    { title: "delete chat", action: () => console.log("deleting chat ...") },
    {
      title: "clear history",
      action: () => console.log("clearing history ..."),
    },
  ];
  //["rename chat", "delete chat", "clear history"]

  const onClose = () => {
    console.log("onClosing....");
  };

  /*
  const onCloseHandle = (e) => {
    e.preventDefault();
    dispatch(openContextMenuAction(false));
  };*/

  return (
    <>
      <ContextMenu
        contextMenuList={contextMenuList}
        // onChooseHandle={onChooseHandle}
      />
      {/* <RenameChat isOpen={isOpen} onClose={onClose} /> */}
    </>
  );
};

export default ContextMenuContainer;
