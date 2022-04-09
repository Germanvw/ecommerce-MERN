import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { dbConnection } from "./db";

dotenv.config();

// Init
const app = express();

// DB
dbConnection();

// Settings - CORS y JSON
app.use(cors());
app.use(express.json());

// Routes

//api/auth
app.use("/api/auth", require("./routes/auth"));
//api/products
app.use("/api/products", require("./routes/products"));
//api/categories
app.use("/api/categories", require("./routes/categories"));
// api/users
app.use("/api/users", require("./routes/users"));
//api/orders
app.use("/api/orders", require("./routes/orders"));
//api/rating
app.use("/api/rating", require("./routes/rating"));
//api/brands
app.use("/api/brands", require("./routes/brands"));

//Listen
app.listen(process.env.PORT, () =>
  console.log(`Running on port ${process.env.PORT}`)
);
