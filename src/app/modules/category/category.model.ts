import { model, Schema } from "mongoose";
import { ICategory } from "./category.interface";

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  shortName: { type: String, unique: true },
  imagePath: { type: String },
  imageFileName: { type: String },
});

// export const Category = model("Category", categorySchema);
export default model<ICategory>("Category", categorySchema);
