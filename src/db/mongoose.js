const mongoose = require("mongoose");

// const localURL = "mongodb://127.0.0.1:27017/alpha-tank";
const dbName = "alpha-tank-testing-db";
const username = "admin";
const password = "6H7vmMaCXEcDRZoC";
const atlasinDBurl = `mongodb+srv://${username}:${password}@kamui-cgukf.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(atlasinDBurl, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
