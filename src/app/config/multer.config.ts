import multer, { StorageEngine } from 'multer';
import { Request } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

// Define upload directory
const uploadDir = join(__dirname, 'uploads');

// Ensure the uploads directory exists
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir, { recursive: true }); // Added recursive option
}

// Set up storage for uploaded files
const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, uploadDir);
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const fileExtension = file.originalname.split('.').pop(); // Extract file extension
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9); // Unique file name
    cb(null, `${uniqueName}.${fileExtension}`);
  }
});

// Create the multer instance
const upload = multer({ storage });

export default upload;
