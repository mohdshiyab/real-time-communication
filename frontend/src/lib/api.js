const SERVER_ORIGIN = import.meta.env.VITE_API_URL || "http://localhost:5001";
const BASE_URL = `${SERVER_ORIGIN.replace(/\/+$/, "")}/api`;

export async function apiFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const token = localStorage.getItem("chat_token");
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    headers,
    credentials: "include", // Essential for httpOnly cookies
    ...options,
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || data.error || "Something went wrong");
    }
    return data;
  } catch (error) {
    throw error;
  }
}
