import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import csvParser from 'csv-parser';

// Ensure the uploads directory exists
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
 fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
 destination: (req, file, cb) => {
   cb(null, uploadsDir);
 },
 filename: (req, file, cb) => {
   cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
 },
});

const upload = multer({ storage });

export default upload;