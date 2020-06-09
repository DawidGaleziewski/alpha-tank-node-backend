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

// Read all tests for this particular user
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

// Updaste a test
router.patch("/tests/:id", auth, async (req, res) => {
  const allowedUpdates = ["dateOfTest", "ph", "nh4", "nh3", "no3", "tempCelc"];
  const updatesKeys = Object.keys(req.body);
  const isUpdateValid = updatesKeys.every((updateKey) => {
    return allowedUpdates.includes(updateKey);
  });

  if (!isUpdateValid) {
    return res
      .status(400)
      .send({ error: "Unable to update test - data not allowed" });
  }
  try {
    const test = await Test.findOne({
      owner: req.user._id,
      _id: req.params.id,
    });
    if (!test) {
      return res.status(400).send({ error: "test not found" });
    }

    updatesKeys.forEach((updateKey) => {
      test[updateKey] = req.body[updateKey];
    });

    await test.save();
    res.status(200).send(test);
  } catch (error) {}
});

// Delete a test
router.delete("/tests/:id", auth, async (req, res) => {
  try {
    const test = await Test.findOne({
      owner: req.user._id,
      _id: req.params.id,
    });
    if (!test) {
      return res.status(400).send({ error: "no such test found" });
    }

    await test.remove();
    res.status(200).send(test);
  } catch (error) {
    res.status(500).send({ error: "something went wrong deleting the task" });
  }
});

module.exports = router;
