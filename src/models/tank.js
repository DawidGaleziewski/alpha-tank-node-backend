const mongoose = require("mongoose");
const Test = require("../models/test");

const tankSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },

  timestamp: {
    type: Date,
    default: new Date(),
  },

  tankSetupDate: {
    type: Date,
  },

  sizeX: {
    type: Number,
  },

  sizeY: {
    type: Number,
  },

  sizeZ: {
    type: Number,
  },
  residents: [
    {
      name: {
        type: String,
      },
      species: {
        type: String,
      },
      description: {
        type: String,
      },
      dateOfAddition: {
        type: Date,
      },
      dateOfRemoval: {
        type: Date,
      },
    },
  ],
  plants: [
    {
      name: {
        type: String,
      },
      species: {
        type: String,
      },
      description: {
        type: String,
      },
      dateOfAddition: {
        type: Date,
      },
      dateOfRemoval: {
        type: Date,
      },
    },
  ],
  substrate: [
    {
      name: {
        type: String,
      },
      description: {
        type: String,
      },
      dateOfAddition: {
        type: Date,
      },
      dateOfRemoval: {
        type: Date,
      },
    },
  ],
  aquariumType: {
    type: String,
  },
});

tankSchema.virtual("tests", {
  ref: "Tank",
  localField: "_id",
  foreignField: "tankID",
});

tankSchema.pre("remove", async function (next) {
  const tank = this;
  await Test.deleteMany({ owner: tank.owner, tankID: tank._id });
  next();
});

const Tank = new mongoose.model("Tank", tankSchema);
module.exports = Tank;
