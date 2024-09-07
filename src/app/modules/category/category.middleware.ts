import { NextFunction, Request, Response } from "express";
import { dataValidation } from "../../utils/dataValidation";
import { sendResponse } from "../../utils/response";
import * as yup from "yup";
import { findCategoryByName, findCategory } from "../../utils/findFunctions";
const categorySchema = yup.object().shape({
  name: yup.string().required("name is required"),
  imagePath: yup.string(),
  imageFileName: yup.string(),
});
// -----------------------------------------------
// -------- validation for create category ------- done
// -----------------------------------------------

const createCategoryValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  try {
    await categorySchema.validate(req.body, { abortEarly: false });
    const exitsCategory = await findCategoryByName(name);
    if (exitsCategory) {
      return sendResponse(res, 400, {
        success: false,
        message: "Category already exists",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// -----------------------------------------------
// -------- validation for update category ------- done
// -----------------------------------------------

const updateCategoryValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const requireFields = ["name"];
    const dataCheck = dataValidation(requireFields, req.body);
    if (dataCheck) {
      return sendResponse(res, 400, {
        success: false,
        message: dataCheck,
      });
    }
    const exitsCategory = await findCategory(id);
    if (!exitsCategory) {
      return sendResponse(res, 404, {
        success: false,
        message: "Category not found",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const CategoryMiddleware = {
  createCategoryValidation,
  updateCategoryValidation,
};
