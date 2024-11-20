import React, { useState } from 'react';
import './chatuinput.css';
import { db } from "./firebase";
import { useStateValue } from './StateProvider';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function ChatInput({ channelName, channelId }) {
  const [input, setInput] = useState('');
  const [{ user }] = useStateValue();  

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!channelId) return;

    try {
      await addDoc(collection(db, "rooms", channelId, "messages"), {
        message: input,
        timestamp: serverTimestamp(),
        user: user?.displayName,
        userImage: user?.photoURL,
      });

      setInput(''); // Clear the input field after sending
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div className="chatinput">
      <form>
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName?.toLowerCase() || 'channel'}`} 
        />
        <button type="submit" onClick={sendMessage}>
          SEND
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
