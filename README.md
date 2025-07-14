# 📘 BlogIt Frontend

**BlogIt** is a full-featured blogging platform frontend built with React, Material UI, and modern best practices. It enables users to create, edit, view, and manage blogs in a beautiful, responsive interface.

---

## 🚀 Features

- ✍️ **Create, Edit, and Delete Blogs**
- 🖼️ Upload featured images to **Cloudinary**
- 🔐 User Authentication (JWT-based)
- 🔍 Blog previews with Markdown support
- 📋 Profile view with sharable link
- ⚙️ Protected routes and session validation
- 💡 Optimistic UI with React Query
- 🧪 Form validation and error handling
- 📱 Fully responsive layout with MUI Grid system

---

## 🛠️ Tech Stack

| Tool / Library         | Purpose                          |
|------------------------|----------------------------------|
| React 19               | UI framework                     |
| Material UI (MUI)      | UI components & styling          |
| React Router v6        | Client-side routing              |
| TanStack Query         | Data fetching & caching          |
| Axios                  | HTTP requests                    |
| Cloudinary             | Image upload and hosting         |
| JWT                    | Token-based authentication       |
| Markdown Preview       | Blog content formatting          |

---

## 🔧 Setup Instructions

1. **Install dependencies**

```bash
npm install
```
2. **Environment Variables**

Create a .env file in the root:

```env
  VITE_API_URL=http://localhost:3000/api
  VITE_CLOUDINARY_URL=https://api.cloudinary.com/v1_1/your-cloud-name/image/upload
  VITE_UPLOAD_PRESET=your-upload-preset
```
Start the app

```bash
npm run dev
```
The app will be available at http://localhost:5173