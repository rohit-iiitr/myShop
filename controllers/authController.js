import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import productModels from "../models/productModels.js";
import JWT from "jsonwebtoken";

//User Register
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, question } = req.body;

    if (!name) {
      return res.send({ message: "Name is required" });
    }

    if (!email) {
      return res.send({ message: "Email is required" });
    }

    if (!password) {
      return res.send({ message: "Password is required" });
    }

    if (!phone) {
      return res.send({ message: "Phone number is required" });
    }

    if (!address) {
      return res.send({ message: "Address is required" });
    }

    if (!question) {
      return res.send({ message: "Question is required" });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      res.status(200).send({
        success: true,
        message: "User already exist! Please login",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new userModel({
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
      address: address,
      question: question,
    }).save();

    res.status(201).send({
      success: true,
      message: "Register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register",
      error,
    });
  }
};

//User Login

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(201).send({
        success: false,
        message: "Invalid password",
      });
    }

    const token = JWT.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });

    return res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error found in login",
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, question, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!question) {
      res
        .status(400)
        .send({ message: "Your favourite sport name is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, question });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Geting Orders",
      error,
    });
  }
};
//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    console.log("status : ",status)
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};