import { ADDED_NEW_CHAT } from "../constants";

const addedNewChat = (titleChat) => {
  return async (dispatch) => {
    async function postData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    }
    const newChat = await postData("http://localhost:3000/chats", {
      type: "ADD_CHAT",
      title: titleChat,
    });
    dispatch({
      type: ADDED_NEW_CHAT,
      newChat,
    });
  };
};

export default addedNewChat;
