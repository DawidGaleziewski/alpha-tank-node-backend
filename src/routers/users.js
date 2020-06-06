const express = require("express");
const router = new express.Router();
const User = require("../models/user");

// Login user
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateToken();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

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

// Read user
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(400).send({ error: "Data not found" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update user
router.patch("/users/:id", async (req, res) => {
  const _id = req.params.id;
  const updateKeys = Object.keys(req.body);
  const allowedUpdates = ["email", "password", "name", "surname", "age"];
  const isUpdateValid = updateKeys.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isUpdateValid) {
    return res.status(400).send({ error: "Invalid update value" });
  }

  try {
    const user = await User.findOne({ _id });
    console.log(user);
    updateKeys.forEach((updateKay) => {
      user[updateKay] = req.body[updateKay];
    });
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete user
router.delete("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findByIdAndDelete({ _id });
    if (!user) {
      return res.status(400).send({ error: "Unable to find data" });
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
