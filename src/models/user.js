const moongose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Tank = require("../models/tank");
const Test = require("../models/test");

const userSchema = new moongose.Schema({
  email: {
    type: String,
    required: true,
    lowersace: true,
    unique: true,
  },

  password: {
    required: true,
    type: String,
  },
  name: {
    type: String,
  },
  surname: {
    type: String,
  },
  age: {
    type: Number,
  },
  date: {
    type: Date,
    default: new Date(),
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.virtual("tanks", {
  ref: "Tank",
  localField: "_id",
  foreignField: "owner",
});

userSchema.virtual("tests", {
  ref: "Test",
  localField: "_id",
  foreignField: "owner",
});

// Plugins
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to authenticate");
  }

  const isMath = await bcrypt.compare(password, user.password);
  if (!isMath) {
    throw new Error("Unable to authenticate");
  }

  return user;
};

userSchema.methods.generateToken = async function () {
  const user = this;
  const secret = "you_are_breathtaking";

  const token = jwt.sign({ _id: user._id.toString() }, secret);

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.pre("remove", async function (next) {
  const user = this;
  await Tank.deleteMany({ owner: user._id });
  await Test.deleteMany({ owner: user._id });
  next();
});

const User = moongose.model("User", userSchema);

module.exports = User;
