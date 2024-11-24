const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });

const PORT = process.env.PORT;
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");

// Connect witch db
dbConnection();

// express app
const app = express();

// Middleware
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use("/api/v1/categories", categoryRoute);

app.all("*", (req, res, next) => {
  // Create error and send it to error handling middleware
  // const err = new Error(`Cant find this route: ${req.originalUrl}`);
  // next(err.message);
  next(new ApiError("message", statusCode));
});

// Golabal error handling middleware
app.use((err, req, res, next) => {
  res.status(400).json({ err });
});

app.get("/", (req, res) => {
  res.send("Welcome to the Ecommerce API V2");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
