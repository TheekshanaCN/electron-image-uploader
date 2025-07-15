# Electron + Express Image Uploader

🚀 A complete desktop application for uploading and managing images  
📌 Built with Electron (frontend) + Express.js (backend)  
🔒 Secure file handling with Multer and CORS

---

## ✨ Features
✔️ Image Upload - Drag & drop or file selection  
✔️ Live Preview - See images before uploading  
✔️ Gallery View - Display all uploaded images  
✔️ Cross-Platform - Works on Windows, macOS, and Linux  
✔️ Auto-Save - Files stored in `~/electron-uploads`  

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/TheekshanaCN/electron-image-uploader.git
cd electron-image-uploader
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the App
```bash
npm start
```
_For development, use `npm run dev` with nodemon for live reloading_

### 4. Build for Production
```bash
npm run build
```
_Generates executables for Windows, macOS, and Linux_

---

## 📂 Project Structure

```
electron-express-uploader/
├── src/
│   ├── main.js           # Electron main process
│   ├── api.js            # Express backend
│   ├── preload.js        # Secure IPC bridge
│   └── renderer/
│       ├── index.html    # Frontend UI
│       └── renderer.js   # Frontend logic
├── package.json
└── README.md
```

---

## 🔧 Configuration

### Change Upload Directory
Modify `UPLOADS_DIR` in `api.js`:

```js
const UPLOADS_DIR = path.join(os.homedir(), 'your-custom-folder');
```

### Allowed File Types
Edit the `fileFilter` in `api.js` to restrict file types:

```js
fileFilter: (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) cb(null, true);
  else cb(new Error('Only images (JPEG, PNG, GIF) allowed!'), false);
}
```

---

## 💡 How It Works

### Frontend (Electron)
- Uses HTML/CSS/JS for UI  
- Communicates with Express via IPC  
- Displays previews and gallery  

### Backend (Express)
- Handles file uploads with Multer  
- Serves images via API (`/api/upload`, `/api/images/:filename`)  
- Stores files in `~/electron-uploads`  

### Security
- CORS enabled for safe API requests  
- File validation (only images allowed)  
- Context Isolation (Electron security best practice)  

---

## 📦 Packaging for Distribution

Build platform-specific executables:

```bash
npm run build:win   # Windows (NSIS)
npm run build:mac   # macOS (DMG)
npm run build:linux # Linux (AppImage)
```

(Requires `electron-builder` – already included in package.json)

---

## 🛠 Troubleshooting

❌ **"API not ready" error**  
> Ensure Express starts before the Electron window (check main.js)  

❌ **Upload fails silently**  
> Check DevTools (`Ctrl+Shift+I`) for errors  
> Verify `UPLOADS_DIR` exists and is writable  

❌ **Build errors**  
> Make sure `icon.ico` exists in `src/assets/`  

---

## 📜 License
MIT © TheekshanaCN

---

Happy Coding! 🎨🚀  

---

## 🖼 Preview

![Preview](https://imgur.com/qvpZLAv)