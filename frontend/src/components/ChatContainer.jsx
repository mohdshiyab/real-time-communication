import { useEffect, useRef } from "react";
import { ArrowLeft, User } from "lucide-react";
import { useChatContext } from "../context/ChatContext";
import { useAuthContext } from "../context/AuthContext";
import MessageInput from "./MessageInput";

export default function ChatContainer() {
  const { messages, selectedUser, setSelectedUser, isMessagesLoading } = useChatContext();
  const { authUser, onlineUsers } = useAuthContext();
  const messagesEndRef = useRef(null);

  const isSelectedOnline = onlineUsers.includes(selectedUser?._id);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="chat-container">
      {/* Chat Header */}
      <div className="chat-header">
        <button
          onClick={() => setSelectedUser(null)}
          className="btn-back-mobile"
          title="Back to contacts"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="chat-header-user">
          <div className="chat-header-avatar">
            {selectedUser.profilePic ? (
              <img src={selectedUser.profilePic} alt={selectedUser.fullName} />
            ) : (
              <div className="user-avatar-fallback">
                {selectedUser.fullName.charAt(0).toUpperCase()}
              </div>
            )}
            <span className={`status-indicator ${isSelectedOnline ? "online" : "offline"}`} />
          </div>

          <div className="chat-header-details">
            <h3 className="chat-header-name">{selectedUser.fullName}</h3>
            <span className="chat-header-status">
              {isSelectedOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="chat-messages">
        {isMessagesLoading ? (
          <div className="messages-loading">Loading chat history...</div>
        ) : messages.length === 0 ? (
          <div className="messages-empty">
            <p>No messages yet. Say hello to {selectedUser.fullName}! 👋</p>
          </div>
        ) : (
          messages.map((message) => {
            const isMe = message.senderId === authUser?._id;

            return (
              <div
                key={message._id || Math.random()}
                className={`message-row ${isMe ? "outgoing" : "incoming"}`}
              >
                <div className="message-bubble">
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="message-attachment"
                      onClick={() => window.open(message.image, "_blank")}
                    />
                  )}
                  {message.text && <p className="message-text">{message.text}</p>}
                  <span className="message-time">{formatTime(message.createdAt)}</span>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput />
    </div>
  );
}
