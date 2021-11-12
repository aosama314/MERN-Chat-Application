import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import makeToast from "../Toaster";

const DashboardPage = () => {
  const [chatrooms, setChatrooms] = React.useState([]);

  const getChatrooms = () => {
    axios
      .get("http://localhost:8000/chatroom", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("CC_Token")}`,
        },
      })
      .then((res) => {
        setChatrooms(res.data);
      })
      .catch((err) => {
        setTimeout(getChatrooms, 3000);
      });
  };

  React.useEffect(() => {
    getChatrooms();
  }, []);

  return (
    <div className="card">
      <div className="cardHeader">Login</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="chatroomName">Chatroom Name</label>
          <input
            type="text"
            id="chatroomName"
            name="chatroomName"
            placeholder="Chatroom Name"
          />
        </div>
        <button>Create Chatroom</button>
        <div className="chatrooms">
          {chatrooms.map((room) => (
            <div key={room._id} className="chatroom">
              <div>{room.name}</div>
              <Link to={"/chatroom/" + room._id}>
                <div className="join">Join</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
