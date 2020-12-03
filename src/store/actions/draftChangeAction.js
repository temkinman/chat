import { DRAFT_CHANGE } from "./../constants";

export const draftChangeAction = (text, currentChatId) => {
  async function putData(url = "", data = {}) {
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // return await response.json();
  }
  
  putData(
    `http://localhost:3000/chats/${currentChatId}`,
    {
      type: DRAFT_CHANGE,
      text,
    }
  );
  
  return {
    type: DRAFT_CHANGE,
    text,
    currentChatId,
  };
};
