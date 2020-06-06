const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/alpha-tank", {
  useNewUrlParser: true,
  useCreateIndex: true,
});
