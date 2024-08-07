import { Router } from "express";
import { authenticateToken } from "../../middlewares/auth";
import { createCategory, getCategories,getSingleCategory,deleteCategory, updateCategory } from "./category.controller";

const router = Router();

router.post('/category', createCategory)
router.get('/category', getCategories);
router.get('/category/:id', getSingleCategory)
router.delete('/category/:id', deleteCategory)
router.put('/category/:id', updateCategory)

export const categoryRouter = router;