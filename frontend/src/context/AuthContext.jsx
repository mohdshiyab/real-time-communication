import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { apiFetch } from "../lib/api";

const AuthContext = createContext();

const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setIsCheckingAuth(true);
    try {
      const data = await apiFetch("/auth/check");
      setAuthUser(data);
    } catch (error) {
      setAuthUser(null);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const signup = async (formData) => {
    setIsSigningUp(true);
    try {
      const data = await apiFetch("/auth/signup", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      setAuthUser(data);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsSigningUp(false);
    }
  };

  const login = async (formData) => {
    setIsLoggingIn(true);
    try {
      const data = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      setAuthUser(data);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
      setAuthUser(null);
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Socket connection manager
  useEffect(() => {
    if (authUser) {
      const newSocket = io(SOCKET_URL, {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        isCheckingAuth,
        isSigningUp,
        isLoggingIn,
        onlineUsers,
        socket,
        signup,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
