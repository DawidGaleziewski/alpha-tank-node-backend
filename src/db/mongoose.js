const mongoose = require("mongoose");
const secureKeys = require("../config/secureKeys");
const { username, password, dbName } = secureKeys;

// const localURL = "mongodb://127.0.0.1:27017/alpha-tank";

const atlasinDBurl = `mongodb+srv://${username}:${password}@kamui-cgukf.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(atlasinDBurl, {
  useNewUrlParser: true,
  useCreateIndex: true,
});
