import { MessageSquare, LogOut, User, Radio } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { authUser, logout, onlineUsers } = useAuthContext();

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo-icon">
          <MessageSquare className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h1 className="navbar-title">ChatPulse</h1>
          <span className="navbar-subtitle">Real-Time Communication</span>
        </div>
      </div>

      <div className="navbar-actions">
        <div className="online-badge">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>{onlineUsers.length} Online</span>
        </div>

        {authUser && (
          <div className="user-profile-menu">
            <div className="avatar-circle">
              {authUser.profilePic ? (
                <img src={authUser.profilePic} alt={authUser.fullName} />
              ) : (
                <User className="w-4 h-4" />
              )}
            </div>
            <div className="user-info-text">
              <span className="user-name">{authUser.fullName}</span>
              <span className="user-email">{authUser.email}</span>
            </div>
            <button onClick={logout} className="btn-logout" title="Log out">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
