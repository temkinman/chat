import { SEND_MESSAGE, SENT_MESSAGE } from "../constants";

const sentMessage = (currentChatId) => {
  return async (dispatch) => {
    async function putData(url = "", data = {}) {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    }
    const newMessage = await putData(
      `http://localhost:3000/chats/${currentChatId}`,
      {
        type: SEND_MESSAGE,
      }
    );

    dispatch({ type: SENT_MESSAGE, newMessage, currentChatId});
  };
};

export default sentMessage;
