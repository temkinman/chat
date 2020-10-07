import React from "react";

const Chat = ({
  currentChat,
  onDraftChange,
  onSendMessage,
  onBack,
  getTime,
}) => {
  const onSendMessagehandle = (event) => {
    event.preventDefault();
    onSendMessage();
  };

  const onChangeHadle = (event) => {
    const text = event.currentTarget.value;
    onDraftChange(text);
  };

  return (
    <div>
      <button onClick={onBack}>{`<`}</button>
      <h2>{currentChat.title}</h2>
      <ul>
        {currentChat.messages.map((message) => {
          return (
            <li key={message.messageId}>
              {message.text}
              <span>{getTime(message.time)}</span>
            </li>
          );
        })}
      </ul>

      <form onSubmit={onSendMessagehandle}>
        <input type="text" onChange={onChangeHadle} value={currentChat.draft} />
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default Chat;
