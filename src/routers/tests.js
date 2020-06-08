const express = require("express");

const router = new express.Router();
const Test = require("../models/test");
const auth = require("../middleware/auth");

// Create test
router.post("/tests", auth, async (req, res) => {
  const test = new Test({ owner: req.user.id, ...req.body });
  try {
    await test.save();
    res.status(200).send(test);
  } catch (error) {
    res.status(500).send({ error: "Unable to create task" });
  }
});

// Read test
router.get("/tests/:id", auth, async (req, res) => {
  try {
    const test = await Test.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!test) {
      return res.status(400).send({ error: "No test found" });
    }
    res.status(200).send(test);
  } catch (error) {
    res.status(500).send({ error: "Error reading test" });
  }
});

// Get all tests for this particular user
router.get("/tests", auth, async (req, res) => {
  try {
    const tests = await Test.find({ owner: req.user._id });
    if (!tests) {
      return res.status(400).send({ error: "No tests found" });
    }

    res.status(200).send(tests);
  } catch (error) {
    res.status(500).send({ error: "Unable to fetch tests" });
  }
});

// Get all tests for particular tank

module.exports = router;
