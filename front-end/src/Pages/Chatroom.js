import React from "react";
// import io from "sockt.io-client";
import { io } from "socket.io-client";
const Chatroom = ({ match }) => {
  const chatroomId = match.params.id;

  const socket = io("http://localhost:8000", {
    query: {
      token: localStorage.getItem("CC_Token"),
    },
  });

  console.log(socket);
  console.log(chatroomId);
  return <div>Test chatroom</div>;
};

export default Chatroom;
