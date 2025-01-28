# Chatter

## 🚀 Overview

A feature-rich chat application designed for seamless communication. It leverages modern web technologies to provide real-time messaging, media sharing, and a responsive user experience.

---

## ✨ Features

- **Authentication:** Secure user signup, login, and logout.
- **Real-time Chat:** Instant message updates with WebSocket.
- **Media Sharing:** Upload and share images using Cloudinary.
- **User Profiles:** Customizable user profiles.
- **Responsive Design:** Optimized for all devices.

---

## 🛠️ Technologies Used

- **Backend:** Node.js, Express.js, MongoDB (Mongoose), WebSocket (Socket.IO), Cloudinary.
- **Frontend:** React.js (with Vite), TailwindCSS, Zustand.

---

## 🔧 Setup and Installation

### Prerequisites

- Node.js and npm installed
- MongoDB instance
- Cloudinary account

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/vedant-io/Chatter.git
   cd Chatter
   ```

2. Install dependencies:

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. Configure environment variables:

   - Backend: Create a `.env` file in the `backend` folder with:

     ```env
     PORT=5000
     MONGO_URI=<your-mongodb-uri>
     CLOUDINARY_NAME=<your-cloudinary-name>
     CLOUDINARY_API_KEY=<your-cloudinary-api-key>
     CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
     JWT_SECRET=<your-jwt-secret>
     ```

   - Frontend: Update API base URL in `frontend/src/lib/axios.js`.

4. Run the application:

   ```bash
   # Backend
   cd backend
   npm start

   # Frontend
   cd ../frontend
   npm run dev
   ```

5. Open the application in your browser:

   ```
   http://localhost:5173
   ```

---

## 📂 API Overview

Key backend endpoints:

- **Authentication**

  - `POST /auth/login`: Login
  - `POST /auth/register`: Register

- **Messages**

  - `GET /messages`: Fetch messages
  - `POST /messages`: Send a message

- **Users**
  - `GET /users/:id`: User details

---
