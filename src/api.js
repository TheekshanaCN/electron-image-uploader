const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const multer = require('multer');
const cors = require('cors');
const os = require('os');

const app = express();
const UPLOADS_DIR = path.join(os.homedir(), 'electron-uploads'); //change Folder Name As U need

// Ensure uploads directory exists
fs.ensureDirSync(UPLOADS_DIR);

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(`[Multer] Saving to: ${UPLOADS_DIR}`);
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}${ext}`;
    console.log(`[Multer] New filename: ${name}`);
    cb(null, name);
  },
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed!'), false);
    }
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  
  res.json({ 
    success: true, 
    filename: req.file.filename,
    path: path.resolve(req.file.path)
  });
});

app.get('/api/images/:filename', (req, res) => {
  const filePath = path.join(UPLOADS_DIR, req.params.filename);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'Image not found' });
  }
});

module.exports = app;