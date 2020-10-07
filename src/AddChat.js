import React, { useState } from "react";

const AddChat = ({ onBack, onAddChat }) => {
  const [chatName, setchatName] = useState("");

  const onChangeHadle = (event) => {
    const name = event.currentTarget.value;
    setchatName(name);
  };

  const onAddChathandle = (event) => {
    event.preventDefault();
    onAddChat(chatName);
  }
  return (
    <div>
      <button onClick={onBack}>{`<`}</button>
      <form onSubmit={onAddChathandle}>
        <input type="text" onChange={onChangeHadle} />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default AddChat;
