import React from "react";
import avatarMan from "../../images/faces/man-default-avatar.png";

const UserMessage = ({ message, getTime }) => {
  return (
    <div>
      <div className="owner">
        <img className="contacts-avatar" src={avatarMan} alt="" />
        <p className="text-owner">
          {message.text}{" "}
          <span className="time-message-owner">{getTime(message.time)}</span>
        </p>
      </div>
      {/* <span className="time-message-owner">{getTime(message.time)}</span> */}
    </div>
  );
};

export default UserMessage;
