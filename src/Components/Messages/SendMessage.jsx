import React from "react";

const SendMessage = () => {
  return (
    <form action="" class="send-message">
      <input
        class="send-text"
        type="text"
        placeholder="Enter your message here"
      />
      <button class="send-btn" type="submit">
        send
      </button>
    </form>
  );
};

export default SendMessage;
