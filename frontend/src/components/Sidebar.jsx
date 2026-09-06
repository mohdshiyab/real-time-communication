import { useEffect, useState } from "react";
import { Users, Search, Circle } from "lucide-react";
import { useChatContext } from "../context/ChatContext";
import { useAuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const { users, getUsers, selectedUser, setSelectedUser, isUsersLoading } = useChatContext();
  const { onlineUsers } = useAuthContext();
  const [search, setSearch] = useState("");
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const isOnline = onlineUsers.includes(user._id);

    if (showOnlineOnly) {
      return matchesSearch && isOnline;
    }
    return matchesSearch;
  });

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-title">
          <Users className="w-5 h-5 text-indigo-400" />
          <span>Contacts</span>
          <span className="sidebar-count">({users.length})</span>
        </div>

        <div className="search-box">
          <Search className="search-icon w-4 h-4" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <label className="online-filter-toggle">
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
          />
          <span>Show online only</span>
        </label>
      </div>

      <div className="sidebar-user-list">
        {isUsersLoading ? (
          <div className="sidebar-loading">Loading contacts...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="sidebar-empty">
            {showOnlineOnly ? "No users currently online" : "No contacts found"}
          </div>
        ) : (
          filteredUsers.map((user) => {
            const isOnline = onlineUsers.includes(user._id);
            const isSelected = selectedUser?._id === user._id;

            return (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`user-item ${isSelected ? "active" : ""}`}
              >
                <div className="user-avatar-wrapper">
                  {user.profilePic ? (
                    <img src={user.profilePic} alt={user.fullName} className="user-avatar-img" />
                  ) : (
                    <div className="user-avatar-fallback">
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className={`status-indicator ${isOnline ? "online" : "offline"}`} />
                </div>

                <div className="user-item-info">
                  <div className="user-item-name">{user.fullName}</div>
                  <div className="user-item-status">
                    {isOnline ? "Online" : "Offline"}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
}
