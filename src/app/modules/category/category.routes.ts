import { Router } from "express";
import upload from "../../config/multer.config";
import { CategoryController } from "./category.controller";

const router = Router();

router.post('/category',upload.single('file'), CategoryController.createCategory)
router.get('/category', CategoryController.getCategories);
router.get('/category/:id', CategoryController.getSingleCategory)
router.delete('/category/:id', CategoryController.deleteCategory)
router.put('/category/:id',upload.single('file'), CategoryController.updateCategory)

export const categoryRouter = router;