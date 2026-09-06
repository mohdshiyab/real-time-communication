# ChatPulse - Real-Time Communication Platform

ChatPulse is a full-stack real-time communication platform built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO.

## Features

- ⚡ **Instant Real-Time Messaging**: Bi-directional communication powered by Socket.IO.
- 🟢 **Live Online Presence**: Instant tracking and display of connected/online users.
- 💬 **1-on-1 Direct Messaging**: Private conversations with chat history persisted in MongoDB.
- 🖼️ **Image & Media Attachments**: Share images with instant preview and base64/Cloudinary upload support.
- 🔒 **Secure Authentication**: JWT-based authentication using HTTP-only cookies and bcryptjs password hashing.
- 🎨 **Modern Dark UI**: Clean, responsive design with Lucide icons, customizable scrollbars, and fluid animations.

---

## Architecture

```
real-time-communication-project/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Auth & Message controllers
│   │   ├── models/           # Mongoose schemas (User, Message)
│   │   ├── routes/           # Express API route definitions
│   │   ├── middleware/       # JWT protectRoute middleware
│   │   ├── lib/              # Socket.IO, MongoDB, and Cloudinary setup
│   │   └── index.js          # Express + Socket.IO server entrypoint
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/       # Navbar, Sidebar, ChatContainer, MessageInput, AuthCard
│   │   ├── context/          # AuthContext (Socket.IO client) & ChatContext
│   │   ├── lib/              # API fetch helper
│   │   ├── App.jsx           # Root layout & view controller
│   │   └── main.jsx
│   ├── vercel.json           # Single-page app routing for Vercel
│   ├── package.json
│   └── .env.example
└── README.md
```

---

## Getting Started Locally

### Prerequisites
- Node.js (v18+)
- MongoDB running locally (`mongodb://127.0.0.1:27017`) or a MongoDB Atlas URI

### 1. Clone & Configure Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5001
MONGODB_URI=mongodb://127.0.0.1:27017/chat_app
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Start the backend:
```bash
npm run dev
# Server running on http://localhost:5001
```

### 2. Configure & Start Frontend

```bash
cd ../frontend
npm install
npm run dev
# Frontend running on http://localhost:5173
```

---

## Deployment Guide

### Frontend on Vercel
1. Push the repository to GitHub.
2. In Vercel, click **Add New Project** and select this repository.
3. Set **Root Directory** to `frontend`.
4. Add the Environment Variable:
   - `VITE_API_URL`: URL of your deployed backend (e.g. `https://your-backend.onrender.com`).
5. Click **Deploy**.

### Backend on Render / Railway
1. Create a new **Web Service** pointing to the `backend` folder.
2. Set Build Command to `npm install` and Start Command to `node src/index.js`.
3. Add Environment Variables:
   - `PORT`: `5001`
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random secret
   - `NODE_ENV`: `production`
   - `CLIENT_URL`: Your Vercel frontend URL (e.g. `https://chatpulse.vercel.app`)
