import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    question:{
      type:String,
      required : true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
