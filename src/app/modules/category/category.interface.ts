import { Document } from "mongoose";

export interface ICategory extends Document{
    name:string;
    shortNote:string;
    imagePath?:string;
    imageFileName?:string;
}