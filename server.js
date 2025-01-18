const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: './config/database.js' });
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");

const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");

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
app.use("/api/v1/subcategories", subCategoryRoute);

app.all("*", (req, res, next) => {
  // Create error and send it to error handling middleware
  // const err = new Error(`Can't find this route: ${req.originalUrl}`);
  // next(err.message);
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400)); // Creat Error (Message, statusCode )
});

// Golabal error handling middleware for express ==> handle error return from express
app.use(globalError);

// app.get("/", (req, res) => {
//   res.send("Welcome to the Ecommerce API V2");
// });

// Start Server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// process.on(eventName, callback);
// Events ==> list ==> callback(err)
// Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandleRejction Errors: ${err}`);
  server.close(() => {
    console.log(`Shutting down....`);
    process.exit(1);
  });
});
