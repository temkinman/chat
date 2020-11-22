import { OPEN_MODAL_RENAME_CHAT } from "../constants";

export const openRenameChatAction = (isOpen) => {
  return {
    type: OPEN_MODAL_RENAME_CHAT,
    renameChatModal: isOpen,
  };
};
