import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import "../App.css";
import useChat from "./useChat";
import { MdOutlineSend } from "react-icons/md";
import Avatar from 'react-avatar';

const ChatRoom = (props) => {
  const { roomId } = props.match.params; // Gets roomId from URL
  const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = useState(""); // Message to be sent
  const [savedChat, setSavedChat] = useState();
  const [oldChats, setOldChats] = useState([]); 
  const token = Cookies.get('token');
  useEffect(() => {
    getSavedChats()
  }, [])

  const getSavedChats = () => {
    fetch(`/api/getchats/${roomId}`,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => response.json())
      .then(chats => {
        setOldChats(chats)
      })
  }

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
    setSavedChat({
      roomId: roomId,
      body: event.target.value,
      pic: Cookies.get('profile_pic'),
      name: Cookies.get('name'),
    })
  };

  const handleSendMessage = () => {
    postChat()
    sendMessage(newMessage);
    setNewMessage("");
  };

  const postChat = () => {
    fetch('/api/savechat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(savedChat)

    }).then(response => response.json())
      .then(result => {
        if (result.success) {
        //  console.log(result)
        }
      })
     
  }

  const deleteChats = () => {
    fetch(`/api/delete-chats/${roomId}`, {
      method: 'DELETE'
    }).then(response => response.json())
      .then(result => {
       console.log(result)
      })
  }

  return (
    <div className="chat-container">
      <h1 className="room-name">Room: {roomId}</h1>
      <div className="messages-container">
          {oldChats.map((oldChat, i) => (
            <div key={i} className={"message-item received-message"}>
              {oldChat.pic === "invalid"
              ?
              <Avatar name={oldChat.name} round={true} size={150} />
              :
              <Avatar src={oldChat.pic} className="rounded" />
              }
              {oldChat.name}
              {oldChat.body}
            </div>
          ))}
      </div>
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
      <button onClick={deleteChats}>DELETE</button>
        <MdOutlineSend onClick={handleSendMessage} className="highlight send-chat"/>
        </div>
    </div>
  );
};

export default ChatRoom;