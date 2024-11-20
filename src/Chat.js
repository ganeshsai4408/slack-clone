import React, { useEffect, useState } from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { db } from "./firebase";
import { doc, onSnapshot, collection, query, orderBy } from "firebase/firestore";
import Message from "./Message";
import ChatInput from "./ChatInput";

function Chat() {
  const { roomId } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomMessages, setRoomMessages] = useState([]);

  useEffect(() => {
    if (roomId) {
      // Fetch room details
      const unsubscribeRoom = onSnapshot(doc(db, "rooms", roomId), (snapshot) => {
        setRoomDetails(snapshot.exists() ? snapshot.data() : null);
      });

      // Fetch messages in the room
      const messagesRef = collection(db, "rooms", roomId, "messages");
      const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));
      const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
        setRoomMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id, // Include ID for unique keys
            ...doc.data(),
          }))
        );
      });

      // Cleanup listeners on unmount or roomId change
      return () => {
        unsubscribeRoom();
        unsubscribeMessages();
      };
    }
  }, [roomId]);

  return (
    <div className="chat">
      {/* Header */}
      <div className="chat_header">
        <div className="chat_channelName">
          <h4>
            <strong>#{roomDetails?.name || "Loading..."}</strong>
          </h4>
          <StarBorderIcon />
        </div>
        <div className="chat_headerRight">
          <p>
            <InfoOutlinedIcon /> Details
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="chat_messages">
        {roomMessages.map(({ id, message, timestamp, user, userImage }) => (
          <Message
            key={id} // Add unique key for each message
            message={message}
            timestamp={timestamp}
            user={user}
            userImage={userImage || "https://via.placeholder.com/50"} // Use default image if missing
          />
        ))}
      </div>

     <div className="chatInput"> 

      <ChatInput channelName={roomDetails?.name} channelId={roomId} />
     </div>
    </div>
  );
}

export default Chat;
