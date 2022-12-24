import { useState } from 'react';
import { Link } from "react-router-dom";
import "../App.css";

const Chat = () => {
  const [roomName, setRoomName] = useState("");

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  return (
    <div className="chat-container">
      <input
        type="text"
        placeholder="Room"
        value={roomName}
        onChange={handleRoomNameChange}
        className="text-input-field"
        required={true}
      />
      <Link to={`/chatroom/${roomName}`} id="enter-room-btn" className="enter-room-btn ">
        Join room
      </Link>
    </div>
  );
};

export default Chat;