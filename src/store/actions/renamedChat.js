import { RENAMED_CHAT } from "../constants";

const renamedChat = (title, chatId) => {
  return async (dispatch) => {
    async function patchData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    }
    const newTitleChat = await patchData(
      `http://localhost:3000/chats/${chatId}`,
      {
        type: RENAMED_CHAT,
        title,
      }
    );
    dispatch({
      type: RENAMED_CHAT,
      newTitleChat,
    });
  };
};

export default renamedChat;
