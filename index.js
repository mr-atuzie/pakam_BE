const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const path = require("path");
const connectDB = require("./config/db");

const pakamRoutes = require("./routes/pakam");

const app = express();

connectDB();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://houx.netlify.app",
      "https://pakam.netlify.app",
    ],
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Routes
app.get("/", (req, res) => {
  res.send("pakam");
});

app.use("/api/v1/pakam", pakamRoutes);

//Error Middleware
app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Servering run on port:${PORT}`.cyan.underline.bold);
});
