# 🔍 Visual Product Matcher

An end-to-end AI-powered application that lets users upload an image or provide an image URL to find the top 10 most visually similar products from a curated catalog.

Built with **React.js**, **Express**, **MongoDB Atlas**, **TailwindCSS**, **Cloudinary**, **Jina AI**, and **Google GenAI**.

---

## ✨ Features

- 📤 **Upload or paste an image URL** to perform AI-powered image similarity search
- 🤖 Uses state-of-the-art **Jina AI model** for image embeddings
- ☁️ Product images stored and served via **Cloudinary CDN**
- 📝 Product descriptions automatically generated using **Google Gemini GenAI**
- 🎯 Visual similarity search returns **top 10 related products** with similarity scores
- 🏗️ Built with a modern **modular full-stack architecture**

---

## 📺 Demo

[![Demo Video](https://img.youtube.com/vi/your-demo-id/maxresdefault.jpg)](https://www.youtube.com/watch?v=your-demo-id)

---

## 🗂️ Project Structure

```
Visual-Product-Matcher/
├── backend/
│   │── config/
│   │── models/
│   │── services/
│   │── routes/
│   │── middleware/
│   │── utils/
│   │── scripts/
│   │── app.js
│   │── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
└── README.md
```

---

## ⚡ Quickstart

### 1. Clone Repository

```bash
git clone https://github.com/theritikyadav11/Visual-Product-Matcher.git
cd Visual-Product-Matcher
```

### 2. Environment Setup

Create a `.env` file in the `backend/` directory:

```env
MONGODB_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
JINA_API_KEY=your_jina_api_key
GOOGLE_GENAI_API_KEY=your_google_genai_key
PORT=5000
```

### 3. Install Dependencies

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd ../frontend
npm install
```

---

## 🏗️ Building the Database

1. Place your images in `backend/images` subfolders named for their category (e.g., `fruits`, `cars`, `electronics`)

2. Run the integrated AI product seeding script:

```bash
cd backend
node scripts/seedImagesWithAI.js
```

This script will:

- ✅ Upload your images to Cloudinary
- ✅ Generate AI descriptions via Google GenAI
- ✅ Compute embeddings with Jina AI
- ✅ Insert product documents into MongoDB

---

## 🚀 Running the App

### 1. Start the Backend

```bash
cd backend
node server.js
```

Backend will run on `http://localhost:5000`

### 2. Start the Frontend

```bash
cd frontend
npm run dev
```

Frontend will open on `http://localhost:5173`

---

## 🧪 API Endpoints

| Endpoint            | Method | Description                                |
| ------------------- | ------ | ------------------------------------------ |
| `/api/health`       | GET    | Health check                               |
| `/api/products`     | GET    | List all products                          |
| `/api/search/image` | POST   | Search by uploading image (form-data)      |
| `/api/search/url`   | POST   | Search by image URL (JSON: `{ imageUrl }`) |

---

## 🖼️ Core Components

### Frontend

- **UploadBox** - Select and preview images before searching
- **UrlBox** - Paste image URLs for instant search
- **ResultGrid** - Display top 10 similar products with similarity scores
- **ProductCard** - Individual product card with image, title, category, and description

### Backend

- **Cloudinary Service** - Image upload and CDN management
- **Jina AI Service** - Generate image embeddings for similarity search
- **Google GenAI Service** - Auto-generate product descriptions
- **MongoDB** - Store products with embeddings and metadata

---

## 🛠️ Tech Stack

### Frontend

- **React.js** - UI framework
- **TailwindCSS** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons

### Backend

- **Express.js** - Web framework
- **MongoDB Atlas** - Database
- **Mongoose** - ODM
- **Cloudinary** - Image storage and CDN
- **Jina AI** - Image embeddings (jina-embeddings-v4)

---

---

## 🙋 FAQ / Troubleshooting

### 404 on API calls

- Ensure backend is running on port 5000
- Check that Vite proxy is configured correctly in `vite.config.js`

### Cloudinary/Jina API errors

- Verify your API keys are correct
- Check your plan limits and quotas

### MongoDB errors

- Ensure MongoDB Atlas cluster is running
- Verify the connection URI is valid
- Check network access settings in MongoDB Atlas

### Image upload fails

- Check file size limits (default: 15MB)
- Verify Cloudinary credentials
- Ensure proper MIME types are accepted

---

## 📄 License

MIT License. Feel free to use, modify, and share!

---

## 🌟 Show Your Support

If you found this project helpful, please give it a ⭐️!

---

## 📬 Contact

For questions or feedback, reach out at: [arvindkumar11.work@gmail.com]

GitHub: [theritikyadav11](https://github.com/theritikyadav11)
