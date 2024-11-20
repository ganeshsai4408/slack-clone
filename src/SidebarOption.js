// SidebarOption.js
import React from "react";
import "./sidebarOption.css";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore"; // Firebase Firestore functions
import { db } from "./firebase"; // Firebase configuration file

function SidebarOption({ Icon, title, id, addChannelOption }) {
  const navigate = useNavigate();

  // Function to navigate to a specific channel
  const selectChannel = () => {
    if (id) {
      navigate(`/room/${id}`); // Navigate to the room with the given ID
    } else {
      navigate(`/${title}`); // Navigate to a route using the title
    }
  };

  // Function to add a new channel
  const addChannel = async () => {
    const channelName = prompt("Please enter the channel name"); // Prompt user for channel name

    if (channelName) {
      try {
        // Add the new channel to Firestore
        await addDoc(collection(db, "rooms"), {
          name: channelName,
        });
        console.log("Channel added successfully!");
      } catch (error) {
        console.error("Error adding channel: ", error); // Log any errors
      }
    }
  };

  return (
    <div
      className="sidebaroption"
      onClick={addChannelOption ? addChannel : selectChannel} // Handle click based on the prop
    >
      {/* If the Icon is provided, render it */}
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? (
        // If Icon is present, render the title with no hash
        <h3>{title}</h3>
      ) : (
        // Otherwise, render the title with a hash
        <h3 className="sidebarOption_channel">
          <span className="sidebarOption_hash">#</span> {title}
        </h3>
      )}
    </div>
  );
}

export default SidebarOption;
