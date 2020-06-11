const express = require("express");
const router = new express.Router();
const User = require("../models/user");

const auth = require("../middleware/auth");

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

// Logout user
router.post("/users/logout", auth, async (req, res) => {
  try {
    const filteredTokens = req.user.tokens.filter((oldToken) => {
      return oldToken.token !== req.token;
    });
    req.user.tokens = filteredTokens;
    await req.user.save();

    res.status(200).send(req.user);
  } catch (error) {}
});

// logout all user sessions
router.post("/users/logout/all", auth, async (req, res) => {
  req.user.tokens = [];

  try {
    await req.user.save();
    res.status(200).send("User logged out from all sessions");
  } catch (error) {
    res.status(500).send({ error: "unable to log out user" });
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
router.get("/users/me", auth, async (req, res) => {
  res.status(200).send(req.user);
});

// Update user
router.patch("/users/me", auth, async (req, res) => {
  // const _id = req.params.id;
  const updateKeys = Object.keys(req.body);
  const allowedUpdates = ["email", "password", "name", "surname", "age"];
  const isUpdateValid = updateKeys.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isUpdateValid) {
    return res.status(400).send({ error: "Invalid update value" });
  }

  try {
    const user = await User.findOne({ _id: req.user._id });
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
router.delete("/users/me", auth, async (req, res) => {
  // const _id = req.params.id;

  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(400).send({ error: "Unable to find data" });
    }

    await user.remove();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
