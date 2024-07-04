import { Document, Types } from "mongoose";

export interface IFoods extends Document{
    name:string;
    price:number;
    categoryId:Types.ObjectId;
    description:string;
}