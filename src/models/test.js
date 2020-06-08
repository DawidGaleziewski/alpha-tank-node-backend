const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  tankID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Tank",
  },
  timestamp: {
    type: Date,
    default: new Date(),
  },

  dateOfTest: {
    type: Date,
    required: true,
  },
  ph: {
    type: Number,
  },
  nh4: {
    type: Number,
  },
  nh3: {
    type: Number,
  },
  no3: {
    type: Number,
  },
  tempCelc: {
    type: Number,
  },
});

const Test = new mongoose.model("Test", testSchema);
module.exports = Test;
