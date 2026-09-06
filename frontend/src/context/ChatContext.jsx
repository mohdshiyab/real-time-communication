import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import { useAuthContext } from "./AuthContext";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);

  const { socket, authUser } = useAuthContext();

  const getUsers = async () => {
    setIsUsersLoading(true);
    try {
      const data = await apiFetch("/messages/users");
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsUsersLoading(false);
    }
  };

  const getMessages = async (userId) => {
    setIsMessagesLoading(true);
    try {
      const data = await apiFetch(`/messages/${userId}`);
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsMessagesLoading(false);
    }
  };

  const sendMessage = async (messageData) => {
    if (!selectedUser) return;
    try {
      const res = await apiFetch(`/messages/send/${selectedUser._id}`, {
        method: "POST",
        body: JSON.stringify(messageData),
      });
      setMessages((prev) => [...prev, res]);
      return res;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  };

  // Subscribe to real-time incoming messages via Socket.IO
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      // If the incoming message is from or to the currently opened conversation
      if (
        selectedUser &&
        (newMessage.senderId === selectedUser._id || newMessage.receiverId === selectedUser._id)
      ) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedUser]);

  // Load messages whenever selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    } else {
      setMessages([]);
    }
  }, [selectedUser]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        users,
        selectedUser,
        isUsersLoading,
        isMessagesLoading,
        getUsers,
        getMessages,
        sendMessage,
        setSelectedUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  return useContext(ChatContext);
};
