// npm packages
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

require("./db/mongoose");

const app = express();
const router = new express.Router();

// constant values
const port = process.env.PORT || 3000;

// Routers
const userRouter = require("./routers/users");

// Register
app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
