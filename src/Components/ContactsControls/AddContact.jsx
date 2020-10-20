import React, { useState } from "react";

const AddContact = ({ isOpen, onCancel, onAddContact }) => {
  const [chatName, setСhatName] = useState("");

  const onChangeHadle = (event) => {
    const name = event.currentTarget.value;
    setСhatName(name);
  };

  const onAddChathandle = (event) => {
    event.preventDefault();
    onAddContact(chatName);
  }
  return (
    <div>
      {/* <button onClick={onBack}>{`<`}</button> */}
      <form onSubmit={onAddChathandle}>
        <input type="text" onChange={onChangeHadle} />
        <button type="submit">add</button>
      </form>
      <h1>add contact</h1>
    </div>
  );
};

export default AddContact;
