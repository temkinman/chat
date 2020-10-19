import React, { useState } from "react";

const AddContact = ({ isOpen, onCancel, onAddContact }) => {
  const [chatName, setchatName] = useState("");

  const onChangeHadle = (event) => {
    const name = event.currentTarget.value;
    setchatName(name);
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
    </div>
  );
};

export default AddContact;
