import { NextFunction, Request, Response } from "express";
import { ICategory } from "./category.interface";
import Category from "./category.model";
import { dataValidation } from "../../utils/dataValidation";
import { sendResponse } from "../../utils/response";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name,shortName } = req.body;
  try {
    const requireFields = ["name"];
    const dataCheck = dataValidation(requireFields, req.body);
    if (dataCheck) {
      return sendResponse
      (res, 400, {
        success: false,
        message: dataCheck,
      });
    }
    const exitsCategory = await Category.findOne({ name });
    if (exitsCategory) {
      return sendResponse
      (res, 400, {
        success: false,
        message: "Category already exists",
      });
    }

    const imagePath = req.file ? req.file.path : undefined;
    const imageFileName = req.file? req.file.filename : undefined;
    console.log("image file :", imageFileName)
    const category: ICategory = new Category({ name,shortName,imagePath,imageFileName });
    await category.save();
    res
      .status(201)
      .json({ message: "Category created successfully", category: category });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getSingleCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(id, {name:name}, {new:true});
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res
      .status(200)
      .json({ message: "Category updated successfully", category: category });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const CategoryController = {
  createCategory,
  getCategories,
  getSingleCategory,
  deleteCategory,
  updateCategory,
}
