let mongoose = require("../database");
let uniqueValidator = require("mongoose-unique-validator");

let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true
  },
  password: {
    type: String,
    required: true
  }
});

let User = mongoose.model("User", UserSchema);
UserSchema.plugin(uniqueValidator);

module.exports = User;
