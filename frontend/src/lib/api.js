const SERVER_ORIGIN = import.meta.env.VITE_API_URL || "http://localhost:5001";
const BASE_URL = `${SERVER_ORIGIN.replace(/\/+$/, "")}/api`;

export async function apiFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
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
