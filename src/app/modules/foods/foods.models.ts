import { model, Schema, Types } from "mongoose";
import { IFoods } from "./food.interface";

const foodSchema = new Schema<IFoods>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  categoryId: { type: Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true},
  unit:{type:String, required: true},
  description: { type: String },
  imagePath:{type:String},
  imageFileName:{type:String},
});

// export const Food = model('Food',foodSchema)
const Foods =  model<IFoods>("Foods", foodSchema);
export default Foods;