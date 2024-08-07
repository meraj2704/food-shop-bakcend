import multer, { StorageEngine } from 'multer';
import { Request } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const uploadDir = join(__dirname, 'uploads');

// Ensure the uploads directory exists
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir);
}

// Set up storage for uploaded files
const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, uploadDir);
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

export default upload;
