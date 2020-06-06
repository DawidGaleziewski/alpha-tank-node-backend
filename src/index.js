const express = require("express");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const app = express();
const router = new express.Router();

const port = process.env.PORT || 3000;

// Register
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
