import { Document } from "mongoose";

export interface User {
    email:string;
    password:string;
    userRole:UserRole;
    name:String;
    phone:String;
    address:String;
}

export type UserRole = 'user' | 'admin' | 'superAdmin';

export interface UserDocument extends User, Document {}