import { Router } from "express";
import { FoodController } from "./food.controller";
import upload from "../../config/multer.config";
import { FoodMiddleware } from "./food.middleware";

const router = Router();

router.post("/food",FoodMiddleware.foodCreateValidation, upload.single("file"), FoodController.createFood);
router.get("/food", FoodController.getAllFood);
router.get("/food/:id", FoodController.getSingleFood);
router.get("/food/category/:id", FoodController.getFoodByCategory);
router.delete("/food/:id", FoodController.deleteFood);
router.put("/food/:id", upload.single("images"), FoodController.updateFood);

export const foodRouter = router;
