# ChatPulse - Real-Time Communication Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-blue?style=for-the-badge&logo=vercel)](https://frontend-three-rust-94.vercel.app)
[![Backend Status](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)](https://chatpulse-backend.onrender.com)
[![MongoDB Atlas](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/cloud/atlas)
[![Socket.IO](https://img.shields.io/badge/RealTime-Socket.IO-010101?style=for-the-badge&logo=socket.io)](https://socket.io)

ChatPulse is a full-stack real-time communication platform built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO. It supports instant bi-directional messaging, live user presence, image attachments, and dual authentication.

---

## 🔗 Live Demo & Deployments

- **Live Application (Frontend)**: [https://frontend-three-rust-94.vercel.app](https://frontend-three-rust-94.vercel.app)
- **Live Backend Server (API & WebSockets)**: [https://chatpulse-backend.onrender.com](https://chatpulse-backend.onrender.com)
- **Database**: Hosted on MongoDB Atlas Cloud Cluster

### Quick Test Accounts
Open two browser windows (or an Incognito window) at [https://frontend-three-rust-94.vercel.app](https://frontend-three-rust-94.vercel.app):
- **User 1**: Click **"Fill Alice"** (`alice@example.com` / `password123`) and Sign In.
- **User 2**: Click **"Fill Bob"** (`bob@example.com` / `password123`) and Sign In.
- Both users will immediately show up as **Online** with green status badges and can send real-time text and image messages back and forth!

---

## Features

- ⚡ **Instant Real-Time Messaging**: Real-time bi-directional message streaming powered by Socket.IO over WSS.
- 🟢 **Live Online Presence**: Automatically tracks and broadcasts active user connections across tabs and devices.
- 💬 **1-on-1 Direct Chat**: Private conversations with chat history stored and retrieved from MongoDB Atlas.
- 🖼️ **Image & Media Attachments**: Send image attachments with instant preview and base64/Cloudinary upload support.
- 🔒 **Dual Authentication**: Seamless cross-domain authentication using HTTP-only cookies (`sameSite: none`, `secure: true`) combined with fallback `Authorization: Bearer <token>` headers stored in `localStorage` for cross-site and incognito compatibility.
- 🎨 **Responsive Dark UI**: Modern dark theme built with responsive layout, custom scrollbars, message bubbles, and Lucide icons.

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
│   │   ├── lib/              # API fetch helper with Bearer token injection
│   │   ├── App.jsx           # Root layout & view controller
│   │   └── main.jsx
│   ├── vercel.json           # Single-page app routing for Vercel
│   ├── package.json
│   └── .env.example
├── package.json              # Root package.json for Render builds
└── README.md
```

---

## Getting Started Locally

### Prerequisites
- Node.js (v18+)
- MongoDB running locally (`mongodb://127.0.0.1:27017`) or a MongoDB Atlas connection string

### 1. Clone & Configure Backend

```bash
git clone https://github.com/mohdshiyab/real-time-communication.git
cd real-time-communication/backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
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

## Production Deployment Guide

### Frontend on Vercel
1. In Vercel, import the GitHub repository **`mohdshiyab/real-time-communication`**.
2. Set **Root Directory** to `frontend`.
3. Add the Environment Variable:
   - `VITE_API_URL`: `https://chatpulse-backend.onrender.com`
4. Deploy!

### Backend on Render
1. Create a new **Web Service** pointing to the repository.
2. Build Command: `npm install`
3. Start Command: `node src/index.js` (or `npm start`)
4. Add Environment Variables:
   - `PORT`: `5001`
   - `MONGODB_URI`: Your MongoDB Atlas URI
   - `JWT_SECRET`: Your secure secret
   - `NODE_ENV`: `production`
   - `CLIENT_URL`: `https://frontend-three-rust-94.vercel.app`

---

## Tech Stack

- **Frontend**: React 19, Vite, Socket.IO Client, Lucide React, Modern CSS
- **Backend**: Node.js, Express, Socket.IO, Mongoose, JWT, bcryptjs, cookie-parser, cors
- **Database**: MongoDB Atlas
- **Hosting**: Vercel (Frontend), Render (Backend)
