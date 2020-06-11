const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  secrets: { jwtSecret },
} = require("../config/secureKeys");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedData = jwt.verify(token, jwtSecret);
    const user = await User.findOne({
      _id: decodedData._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error("Unable to authenticate");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(404).send({ error: "please authenticate" });
  }
};

module.exports = auth;
