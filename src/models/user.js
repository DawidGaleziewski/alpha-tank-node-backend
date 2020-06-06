const moongose = require("mongoose");

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

const User = moongose.model("User", userSchema);

module.exports = User;
