import { Types } from "mongoose";
import { IFindFood } from "../modules/foods/food.interface";
import foodsModels from "../modules/foods/foods.models";
import categoryModel from "../modules/category/category.model";

export const findFood = async (name: IFindFood) => {
    const food = await foodsModels.findOne({ name });
    console.log(name, food);
    return food;
  };
  
  export const findCategory = async (categoryId:any) => {
      console.log("category Id ", categoryId);
  
      if (!Types.ObjectId.isValid(categoryId)) {
        console.error("Invalid categoryId: ", categoryId);
        return null; 
    }
      const category = await categoryModel.findById(categoryId)
      console.log("category ", category);
      return category;
  };