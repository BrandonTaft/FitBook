import React, { useState } from 'react';
import "../App.css";
import useChat from "./useChat";
import { MdOutlineSend } from "react-icons/md";
import Avatar from 'react-avatar';

const ChatRoom = (props) => {
  const { roomId } = props.match.params; // Gets roomId from URL
  const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = useState(""); // Message to be sent

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="chat-container">
      <h1 className="room-name">Room: {roomId}</h1>
      <div className="messages-container">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
              }`}
            >
              {message.pic === "invalid"
              ?
              <Avatar name={message.name} round={true} size={150} />
              :
              <Avatar src={message.pic} className="rounded" />
              }
              {message.name}
              {message.body}
            </div>
          ))}
      </div>
      <div className="chat-input">
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      
        <MdOutlineSend onClick={handleSendMessage} className="highlight send-chat"/>
        </div>
    </div>
  );
};

export default ChatRoom;