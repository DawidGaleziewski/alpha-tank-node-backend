const express = require("express");
const router = new express.Router();
const User = require("../models/user");

// Create user
router.post("/users", async (req, res) => {
  const user = await new User(req.body);

  try {
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/users/:id", async (req, res) => {
  console.log(req);
});
module.exports = router;
