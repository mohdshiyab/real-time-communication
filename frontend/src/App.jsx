import { Loader2 } from "lucide-react";
import { useAuthContext } from "./context/AuthContext";
import { useChatContext } from "./context/ChatContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ChatContainer from "./components/ChatContainer";
import NoChatSelected from "./components/NoChatSelected";
import AuthCard from "./components/AuthCard";

export default function App() {
  const { authUser, isCheckingAuth } = useAuthContext();
  const { selectedUser } = useChatContext();

  if (isCheckingAuth) {
    return (
      <div className="app-loading-screen">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-400" />
        <p>Connecting to ChatPulse...</p>
      </div>
    );
  }

  if (!authUser) {
    return <AuthCard />;
  }

  return (
    <div className="app-container">
      <Navbar />
      <main className="main-chat-layout">
        <Sidebar />
        {selectedUser ? <ChatContainer /> : <NoChatSelected />}
      </main>
    </div>
  );
}
