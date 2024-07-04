import { Document, Types } from "mongoose";

export interface IOrder extends Document{
    user:Types.ObjectId;
    items:{
        food:Types.ObjectId;
        quantity:number;
    }[];
    totalAmount:number;
    status:"Pending" | "Completed" | "Cancelled";
    createdAt:Date;
    updatedAt:Date;
}