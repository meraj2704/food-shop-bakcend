import { NextFunction, Request, Response } from "express"
import  Food  from './foods.models';
import { IFoods } from "./food.interface";
import  Category  from '../category/category.model';

export const createFood = async (req:Request, res:Response, next:NextFunction) => {
    console.log("called")
    const {name, quantity,price,categoryId,unit,description} = req.body;
    try{
        if(!name) {
            return res.status(400).json({message: "Name is required"})
        }
        
        if(!price) {
            return res.status(400).json({message: "Price is required"})
        }
        if(!categoryId) {
            return res.status(400).json({message: "Category id is required"})
        }

        const existFoodName = await Food.findOne({name});
        if(existFoodName){
            return res.status(400).json({message: "Food already exist with this name"})
        }

        const existCategory = await Category.findById({_id: categoryId})
        if(!existCategory){
            return res.status(404).json({message: "Category not found"})
        }

        const newFood:IFoods = new Food({name,quantity,price,categoryId,unit,description});
        await newFood.save();
        res.status(201).json({message: "Food created successfully", food: newFood}) 
    }
    catch(error){
        console.log("error")
        console.log(error)
        next(error)
    }
}


export const getAllFood = async( req:Request, res:Response, next:NextFunction) => {
    try{
        const foods = await Food.find();
        res.status(200).json(foods)
    }
    catch(error){
        console.log("error")
        console.log(error)
        next(error)
    }
}

export const getSingleFood = async(req:Request, res:Response, next:NextFunction) => {
    const {id} = req.params;
    try{
        const food = await Food.findById(id);
        if(!food){
            return res.status(404).json({message: "Food not found"})
        }
        res.status(200).json(food)
    }
    catch(error){
        console.log(error)
        next(error)
    }
}


export const deleteFood = async(req:Request, res:Response, next:NextFunction) =>{
    const {id} = req.params;
    try{
        const food = await Food.findByIdAndDelete(id);
        if(!food){
            return res.status(404).json({message: "Food not found"})
        }
        res.status(200).json({message: "Food deleted successfully"})
    }
    catch(error){
        console.log(error)
        next(error)
    }
}

export const updateFood = async(req:Request, res:Response, next:NextFunction) => {
    const {id} = req.params;
    const {name,  price, categoryId, description} = req.body;
    try{
        if(!name &&!price &&!categoryId &&!description){
            return res.status(400).json({message: "At least one field is required"})
        }
        const food = await Food.findByIdAndUpdate(id, {name,price,categoryId,description}, {new:true})
        if(!food){
            return res.status(404).json({message: "Food not found"})
        }
        res.status(200).json({message: "Food updated successfully", food: food})
    }catch(error){
        console.log(error)
        next(error)
    }
}

export const getFoodByCategory = async(req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    try{
        const category = await Category.findById(id);
        if(!category){
            return res.status(404).json({message: "Category not found"})
        }
        const foods = await Food.find({categoryId:id});
        if(!foods){
            return res.status(404).json({message: "Foods not found"})
        }
        res.status(200).json(foods)
    }catch(error){
        console.log(error)
        next(error)
    }
}