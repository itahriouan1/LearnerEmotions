const express = require("express");
const app = express();

const cors = require("cors");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
// const dotenv = require('dotenv');
const path = require("path");

const errorMiddleware = require("./middlewares/errors");

// Setting up config file
if (process.env.NODE_ENV !== "PRODUCTION")
  require("dotenv").config({ path: "backend/config/config.env" });
// dotenv.config({ path: 'backend/config/config.env' })

// Enable CORS
app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// Import all routes
const auth = require("./routes/auth");
const group = require("./routes/group");
const sessioncour = require("./routes/sessioncour");
const expression = require("./routes/expression");
const naturesessioncoure = require("./routes/naturesessioncoure");

app.use("/api/v1", auth);
app.use("/api/v1", group);
app.use("/api/v1", sessioncour);
app.use("/api/v1", expression);
app.use("/api/v1", naturesessioncoure);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
