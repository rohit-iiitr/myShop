import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Avoid OverwriteModelError in dev
export default mongoose.models.Category || mongoose.model("Category", categorySchema);
