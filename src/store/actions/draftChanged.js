import { DRAFT_CHANGED } from "../constants";

const draftChanged = (text, currentChatId) => {
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
    const draftText = await putData(
      `http://localhost:3000/chats/${currentChatId}`,
      {
        type: DRAFT_CHANGED,
        text,
      }
    );

    // console.log('draftChange ');
    dispatch({
      type: DRAFT_CHANGED,
      draftText,
      currentChatId
    });
  };
};

export default draftChanged