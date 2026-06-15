# 🚀 Deployment Guide: Dokploy

This guide provides step-by-step instructions for deploying the **Chatter** application (Backend & Frontend) using Dokploy.

---

## 🏗️ 1. Backend Deployment

### Service Configuration
- **Type**: Docker / Service
- **Source**: GitHub Repository
- **Root Directory**: `/backend`
- **Port**: `5000` (Internal)

### 🔑 Environment Variables
Add these in the **Environment** tab of your Dokploy service:

| Key | Value | Note |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Enables static file serving & secure cookies |
| `PORT` | `5000` | Matches Docker EXPOSE port |
| `MONGO_URI` | `mongodb+srv://...` | Your MongoDB connection string |
| `JWT_SECRET` | `your_secret_string` | Used for session signing |
| `CORS_ORIGINS` | `https://your-frontend-domain.com` | Comma-separated list |
| `CLOUDINARY_CLOUD_NAME` | `...` | From Cloudinary Dashboard |
| `CLOUDINARY_API_KEY` | `...` | From Cloudinary Dashboard |
| `CLOUDINARY_API_SECRET` | `...` | From Cloudinary Dashboard |

---

## 🎨 2. Frontend Deployment

### Service Configuration
- **Type**: Docker / Service
- **Source**: GitHub Repository
- **Root Directory**: `/frontend`
- **Port**: `80` (Internal Nginx port)

### 🏗️ Build Arguments
**CRITICAL:** Vite bakes environment variables into the static build at compile time. You **must** add these as **Build Arguments** in Dokploy (not just standard environment variables).

| Key | Example Value |
| :--- | :--- |
| `VITE_API_URL` | `https://your-backend-api.com/api` |
| `VITE_SOCKET_URL` | `https://your-backend-api.com` |

---

## 🛠️ Troubleshooting

### 1. "404 Not Found" on Page Refresh (Frontend)
The provided `frontend/nginx.conf` handles this via `try_files $uri $uri/ /index.html;`. If you encounter 404s, ensure the `Dockerfile` is correctly copying the `nginx.conf` into `/etc/nginx/conf.d/default.conf`.

### 2. Socket.io Connection Issues
- Ensure `VITE_SOCKET_URL` does **not** include `/api`.
- Confirm `CORS_ORIGINS` in the Backend includes the exact Frontend URL (no trailing slash).
- If using HTTPS, ensure `secure: true` is set in cookies (handled automatically by `NODE_ENV=production` in `src/lib/utils.js`).

### 3. Image Uploads Failing
- Check the `2mb` limit in `backend/src/index.js` (`express.json({ limit: "2mb" })`). Increase if you plan to support larger images.
- Verify Cloudinary credentials in the Backend Environment Variables.

### 4. Database Connection
- If using MongoDB Atlas, ensure you have whitelisted the IP address of your Dokploy server.

---

## 🔄 Deployment Order
1. Deploy **Backend** first to get your API URL.
2. Deploy **Frontend** using the Backend URL as a build argument.
