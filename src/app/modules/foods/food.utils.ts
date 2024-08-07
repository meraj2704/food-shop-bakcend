import mongoose from "mongoose";
import Category from "../category/category.model";
import { IFindFood } from "./food.interface";
import Food from "./foods.models";

export const findFood = async (name: IFindFood) => {
  const food = await Food.findOne({ name });
  console.log(name, food);
  return food;
};

export const findCategory = async (categoryId:any) => {
  try {
    console.log(categoryId);
    const category = await Category.findById({_id:categoryId}) // Ensure to call exec() to return a promise
    return category;
  } catch (error) {
    console.error('Error finding category:', error);
    throw new Error('Internal server error');
  }
};
