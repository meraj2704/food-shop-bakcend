import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { sendResponse } from "../../utils/response";
const foodSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  price: yup.number().required("price is required"),
  categoryId: yup.string().required("categoryId is required"),
  quantity: yup.number().required("quantity is required"),
  unit: yup.string().required("unit is required"),
  description: yup.string(),
  imagePath: yup.string(),
  imageFileName: yup.string(),
});

const foodCreateValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("validation on : ", req.body);
    await foodSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error: any) {
    const errorMessages = error.inner.map(
      (err: yup.ValidationError) => err.message
    );
    return sendResponse(res, 400, {
      success: false,
      message: errorMessages,
    });
  }
};


export const FoodMiddleware = {
  foodCreateValidation,
};
