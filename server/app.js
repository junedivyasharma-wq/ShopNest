import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.router.js";
import productRouter from "./routes/product.router.js";
import orderRouter from "./routes/order.router.js";
import paymentRouter from "./routes/payment.router.js";

import analyticsRouter from "./routes/analytics.router.js";

const app=express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/products",productRouter);
app.use("/api/v1/payment",paymentRouter);
app.use("/api/v1/orders",orderRouter);
app.use('/api/v1/analytics',analyticsRouter);



export {app};

