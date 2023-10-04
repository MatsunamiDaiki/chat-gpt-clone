"use client";

import { useAppContext } from "@/context/AppContext";
import { Timestamp, addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { FaBeer, FaPaperPlane, FaTruckLoading } from "react-icons/fa";
import { db } from "../../../firebase";

type Message = {
  text: string;
  sender: string;
  createdAt: Timestamp;
};

const Chat = () => {
  const { selectedRoom, selectRoomName } = useAppContext();
  const [inputMessage, setInputMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selectedRoom) {
      const fetchMessages = async () => {
        const roomDocRef = doc(db, "rooms", selectedRoom);
        const messagesCollectionRef = collection(roomDocRef, "messages");

        const q = query(messagesCollectionRef, orderBy("createdAt"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const newMessages = snapshot.docs.map((doc) => doc.data() as Message);
          setMessages(newMessages);
        });

        return () => {
          unsubscribe();
        };
      };

      fetchMessages();
    }
  }, [selectedRoom]);


  const sendMessage = async () => {
    if(!inputMessage.trim()) return;

    const messageData = {
      text: inputMessage,
      sender: "user",
      createdAt: serverTimestamp(),
    };

    const roomDocRef = doc(db, "rooms", selectedRoom!);
    const messageCollectionRef = collection(roomDocRef, "message");
    await addDoc(messageCollectionRef, messageData);
  }

  return (
    <div className="bg-gray-500 h-full p-4 flex flex-col">
      <h1 className="text-2xl text-white font-semibold mb-4">
        タイトル
      </h1>

      <div className="flex-grow overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.sender === "user" ? "text-right" : "text-left"}
          >
            <div
              className={
                message.sender === "user"
                  ? "bg-blue-500 inline-block rounded px-4 py-2 mb-2"
                  : "bg-green-500 inline-block rounded px-4 py-2 mb-2"
              }
            >
              <p className="text-white">{message.text}</p>
            </div>
          </div>
        ))}
      </div>


      <div className="flex-shrink-0 relative">
        <input
          type="text"
          placeholder="Send a Message"
          className="border-2 rounded w-full pr-10 focus:outline-none p-2"
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          className="absolute inset-y-0 right-4 flex items-center"
          onClick={() => sendMessage()}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Chat;