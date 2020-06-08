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
    res.status(500).send({ error: "Server error" });
  }
});

// Read tank
router.get("/tanks/:id", auth, async (req, res) => {
  try {
    const tank = await Tank.findOne({
      owner: req.user._id,
      _id: req.params.id,
    });

    if (!tank) {
      return res.status(404).send();
    }

    res.status(200).send(tank);
  } catch (error) {
    res.status(500).send();
  }
});

// Read all tanks
router.get("/tanks", auth, async (req, res) => {
  try {
    const tanks = await Tank.find({ owner: req.user._id });
    // if (!tanks) {
    //   return res.status(204).send(tanks);
    // }

    res.status(200).send(tanks);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
