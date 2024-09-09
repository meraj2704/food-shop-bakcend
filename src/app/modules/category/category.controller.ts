import { NextFunction, Request, Response } from "express";
import { ICategory } from "./category.interface";
import { sendResponse } from "../../utils/response";
import { findCategory } from "../../utils/findFunctions";
import Category from "./category.model";

// -----------------------------------------------
// ---------- create category controller --------- done
// -----------------------------------------------
const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, shortNote } = req.body;
  try {
    const imagePath = req.file ? req.file.path : undefined;
    const imageFileName = req.file ? req.file.filename : undefined;
    const category: ICategory = new Category({
      name,
      shortNote,
      imagePath,
      imageFileName,
    });
    await category.save();
    return sendResponse(res, 200, {
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// -----------------------------------------------
// ------------ get category controller ---------- done
// -----------------------------------------------

const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find();
    return sendResponse(res, 200, {
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// -----------------------------------------------
// ------- get single category controller -------- done
// -----------------------------------------------

export const getSingleCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const category = await findCategory(id);
    if (!category) {
      return sendResponse(res, 404, {
        success: false,
        message: "Category not found",
        data: category,
      });
    }
    return sendResponse(res, 200, {
      success: true,
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// -----------------------------------------------
// ---------- delete category controller --------- done
// -----------------------------------------------

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    await Category.findByIdAndDelete(id);
    return sendResponse(res, 200, {
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// -----------------------------------------------
// ---------- update category controller --------- done
// -----------------------------------------------

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { name: name },
      { new: true }
    );
    return sendResponse(res, 200, {
      success: true,
      message: "Category updated successfully",
      data: category,
    });
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
};
