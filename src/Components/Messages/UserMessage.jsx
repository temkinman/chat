import React from "react";
import avatarMan from '../../images/faces/man-default-avatar.png'
import avatarWomen from '../../images/faces/male-default-avatar.png'

const UserMessage = () => {
  return (
    <div>
      <div class="owner">
        <img
          class="contacts-avatar"
          src={avatarMan}
          alt=""
        />
        <p class="text-owner">Hello, how are you?</p>
      </div>
      <span class="time-message-owner">15:00</span>
    </div>
  );
};

export default UserMessage;
