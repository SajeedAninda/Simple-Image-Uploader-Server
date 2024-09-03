const express = require('express');
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Ensure 'uploads' directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const port = 5000;

app.get('/', (req, res) => {
  res.send('Image Uploading Server is Running');
});

// Endpoint to handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    res.json({ imageQuestionId: req.file.filename });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
