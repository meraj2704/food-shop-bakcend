import { NextFunction, Request, Response } from "express";
import Food from "./foods.models";
import { IFoods } from "./food.interface";
import Category from "../category/category.model";
import { findCategory, findFood } from "./food.utils";
import { FoodService } from "./food.service";
import { sendResponse } from "../../utils/response";
import { dataValidation } from "../../utils/dataValidation";

//  ---------------------------------------------
//  ------------------ Create Food --------------  done , remove redundancy
//  ---------------------------------------------
export const createFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("called");
  const { name, quantity, price, categoryId, unit, description } = req.body;
  try {
    const requiredFields = ["name", "price", "categoryId", "quantity", "unit"];
    const dataCheck = dataValidation(requiredFields, req.body);
    if (dataCheck) {
      return sendResponse(res, 400, {
        success: false,
        message: dataCheck,
      });
    }

    const existFoodName = await findFood(name);
    if (existFoodName) {
      return sendResponse(res, 400, {
        success: false,
        message: "Food already exists with this name",
      });
    }
    const existCategory = await findCategory(categoryId);
    if (!existCategory) {
      return sendResponse(res, 400, {
        success: false,
        message: "Category not found",
      });
    }

    const imagePath = req.file ? req.file.path : undefined;
    const imageFileName = req.file ? req.file.filename : undefined;
    const newFood = {
      name,
      quantity,
      price,
      categoryId,
      unit,
      description,
      imagePath,
      imageFileName,
    };
    const result = await FoodService.createFood(newFood);
    return sendResponse(res, 201, {
      success: true,
      message: "Food created successfully",
      data: result,
    });
  } catch (error) {
    console.log("error");
    console.log(error);
    next(error);
  }
};

//  ---------------------------------------------
//  ------------------ Get all Food -------------- done
//  ---------------------------------------------

export const getAllFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await FoodService.getFoods();
    return sendResponse(res, 200, {
      success: true,
      message: "Foods retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log("error");
    console.log(error);
    next(error);
  }
};

//  ---------------------------------------------
//  ------------------ Get Single Food -------------- done
//  ---------------------------------------------

export const getSingleFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const result = await FoodService.getFoods(id);
    if (!result) {
      return sendResponse(res, 404, {
        success: false,
        message: "Food not found",
      });
    }
    return sendResponse(res, 200, {
      success: true,
      message: "Foods retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//  ---------------------------------------------
//  ------------------ Delete Food --------------  ongoing
//  ---------------------------------------------

export const deleteFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    // const food = await Food.findByIdAndDelete(id);
    const result = await FoodService.deleteFood(id);
    if (!result) {
      return sendResponse(res, 404, {
        success: false,
        message: "Food not found",
      });
    }
    return sendResponse(res, 200, {
      success: true,
      message: "Foods deleted successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//  ---------------------------------------------
//  ------------------ Update Food --------------  pending
//  ---------------------------------------------

export const updateFood = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { name, price, categoryId, description } = req.body;
  try {
    if (!name && !price && !categoryId && !description) {
      return sendResponse(res, 400, {
        success: false,
        message: "At least one field is required",
      });
    }
    const imagePath = req.file ? req.file.path : undefined;
    const imageFileName = req.file ? req.file.filename : undefined;

    const updateData = {
      name,
      price,
      categoryId,
      description,
      imagePath,
      imageFileName,
    };

    const food = await Food.findByIdAndUpdate(id, updateData, { new: true });
    if (!food) {
      return sendResponse(res, 404, {
        success: false,
        message: "Food not found",
      });
    }
    return sendResponse(res, 200, {
      success: true,
      message: "Food updated successfully",
      data: food,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//  ---------------------------------------------
//  ------------------ GEt Food By Category --------------  pending
//  ---------------------------------------------

export const getFoodByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return sendResponse(res, 404, {
        success: false,
        message: "Category not found",
      });
    }
    const foods = await Food.find({ categoryId: id });
    if (!foods) {
    return sendResponse(res, 404, {
        success: false,
        message: "Foods not found",
      });
    }
    return sendResponse(res, 200, {
      success: true,
      message: "Foods retrieved successfully",
      data: foods,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const FoodController = {
  createFood,
  getAllFood,
  getSingleFood,
  deleteFood,
  updateFood,
  getFoodByCategory,
};
