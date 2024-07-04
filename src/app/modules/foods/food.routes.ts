import { Router } from "express";
import { createFood, deleteFood, getAllFood, getFoodByCategory, getSingleFood, updateFood } from "./food.controller";

const router = Router();

router.post('/food', createFood);
router.get('/food', getAllFood);
router.get('/food/:id', getSingleFood);
router.get('/food/category/:id', getFoodByCategory)
router.delete('/food/:id', deleteFood);
router.put('/food/:id', updateFood);

export const foodRouter = router;