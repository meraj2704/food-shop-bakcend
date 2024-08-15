import mongoose, { Types } from "mongoose";
import Category from "../category/category.model";
import { IFindFood } from "./food.interface";
import Food from "./foods.models";

export const findFood = async (name: IFindFood) => {
  const food = await Food.findOne({ name });
  console.log(name, food);
  return food;
};

export const findCategory = async (categoryId:any) => {
    console.log("category Id ", categoryId);

    if (!Types.ObjectId.isValid(categoryId)) {
      console.error("Invalid categoryId: ", categoryId);
      return null; 
  }
    const category = await Category.findById(categoryId)
    console.log("category ", category);
    return category;
};
