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

const PORT = process.env.PORT || 4000;
// Routes

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index,html"));
  });
}

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
//api/review
app.use("/api/review", require("./routes/review"));
//api/brands
app.use("/api/brands", require("./routes/brands"));

//Listen
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
