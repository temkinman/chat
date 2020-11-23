import { OPEN_CONFIRM_MODAL } from "../constants";

export const openConfirmAction = (isOpen) => {
  return {
    type: OPEN_CONFIRM_MODAL,
    confirmModal: isOpen,
  };
};
