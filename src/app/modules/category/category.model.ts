import { model, Schema } from "mongoose";
import { ICategory } from "./category.interface";

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  shortNote: { type: String, unique: false},
  imagePath: { type: String },
  imageFileName: { type: String },
});

// export const Category = model("Category", categorySchema);
const Category = model<ICategory>("Category", categorySchema);
export default Category;
