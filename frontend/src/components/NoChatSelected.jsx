import { MessageSquareDashed } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";

export default function NoChatSelected() {
  const { authUser } = useAuthContext();

  return (
    <div className="no-chat-container">
      <div className="no-chat-card">
        <div className="no-chat-icon-wrapper">
          <MessageSquareDashed className="w-10 h-10 text-indigo-400" />
        </div>
        <h2>Welcome, {authUser?.fullName || "there"}!</h2>
        <p>Select a contact from the sidebar to start instant real-time messaging.</p>
        <div className="no-chat-hint">
          <span>⚡ Real-time messaging powered by Socket.IO</span>
        </div>
      </div>
    </div>
  );
}
