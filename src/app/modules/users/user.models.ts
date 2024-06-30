import { model, Schema } from "mongoose";
import { UserDocument } from './user.interface';

const UserSchema = new Schema<UserDocument>({
    email: {type:String, required:true, unique:true},
    password : {type:String, required:true},
    name : {type:String, required:true},
    phone : {type:String, required:true},
    address : {type:String},
    userRole: {type:String, required:true, enum:['user','admin','superAdmin'], default:'user'}
})

export default model<UserDocument>('User', UserSchema)