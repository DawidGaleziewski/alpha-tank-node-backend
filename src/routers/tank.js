const express = require("express");

const router = new express.Router();
const Tank = require("../models/tank");
const auth = require("../middleware/auth");

// Create new tank
router.post("/tanks", auth, async (req, res) => {
  console.log(req.body);
  try {
    const tank = new Tank({ ...req.body, owner: req.user._id });
    // console.log({ ...req.body, owner: req.user._id });
    console.log(tank);
    await tank.save();
    res.status(200).send(tank);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
