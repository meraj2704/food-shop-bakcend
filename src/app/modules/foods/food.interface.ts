import { Document, Types } from "mongoose";

export interface IFoods extends Document{
    name:string;
    price:number;
    categoryId:Types.ObjectId;
    quantity:number;
    unit:string;
    description:string;
    imagePath?:string;
    imageFileName?:string;
}

export interface IFindFood {
    name?: string;
}