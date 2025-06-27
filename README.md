# 🏠 YatraBnB (MERN Stack)
A MERN stack short-term rental platform enables users to list and book stays with real-time map integration.

**Frontend:** HTML5, CSS3, JavaScript, EJS (Embedded JavaScript Templates)  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (with Mongoose)  
**Other:** MapLibre GL JS, Cloudinary, Render, etc.

---
```bash
PROJECT-1/
│
├── controllers/         # Logic for handling requests and responses
├── init/                # Initialization code (e.g., DB connections or server setup)
├── models/              # Mongoose models/schemas for MongoDB
├── node_modules/        # Project dependencies (auto-generated)
├── public/              # Static files (CSS, JS, images, etc.)
├── routes/              # Route definitions (Express routers)
├── uploads/             # Uploaded files (if using local uploads)
├── utils/               # Utility functions (e.g., helpers, validators)
├── views/               # EJS or other templating views for rendering HTML
│
├── .env                 # Environment variables (should be kept secret)
├── .gitignore           # Files and folders to ignore in Git
├── app.js               # Entry point of the application (Express app)
├── cloudConfig.js       # Cloudinary or similar cloud service configuration
├── middleware.js        # Custom Express middleware (auth, error handling, etc.)
├── package.json         # Project metadata and dependencies
├── package-lock.json    # Exact versions of dependencies (auto-generated)
├── README.md            # Project overview and setup guide
└── schema.js            # (Optional) Additional schema definitions (if not inside models/)

```

## 🌐 Hosted Website
https://yatrabnb.onrender.com


🌟 Features
🔐 User Authentication (Login/Logout)

🏠 Create & Manage Property Listings

📸 Image Uploads via Cloudinary

🗺️ Interactive Map with MapLibre GL JS

📱 Responsive Design using Bootstrap

📂 Modular & Clean File Structure


---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/YatraBnB.git
```
### 2. Install Dependencies
```bash
cd YatraBnB
npm install
```
### 3. Create .env File 
```bash
MONGO_URI=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
MAP_TOKEN=
```
### 4. Run the app
```bash
npm run dev
```


