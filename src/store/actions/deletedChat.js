import { DELETED_CHAT } from "../constants";

const deletedChat = (chatId) => {
  return async (dispatch) => {
    async function deleteData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    }
    const deletedChatId = await deleteData(
      `http://localhost:3000/chats/${chatId}`
    );
    dispatch({ type: DELETED_CHAT, deletedChatId, chatId: null });
  };
};

export default deletedChat;
