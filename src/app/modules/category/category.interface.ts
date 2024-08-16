import { Document } from "mongoose";

export interface ICategory extends Document{
    name:string;
    shortName:string;
    imagePath?:string;
    imageFileName?:string;
}