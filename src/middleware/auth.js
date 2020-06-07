const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  const secret = "you_are_breathtaking";

  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedData = jwt.verify(token, secret);
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
