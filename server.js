import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoutes from "./routes/authRoute.js";
import cors from 'cors';
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import Stripe from "stripe";


// const express = require("express");
dotenv.config();
connectDB();
// morgan.config();
const app = express();
app.use(cors(
  { origin: "https://my-shop-five-eta.vercel.app" }
));
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
// app.use("/api/v1/order", orderRoutes);

// const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT;
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
