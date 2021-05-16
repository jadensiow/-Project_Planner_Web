const { Schema, model } = require("mongoose");
var express = require("express");
var cors = require("cors");
const { Assignment } = require("@material-ui/icons");
var app = express();

app.use(cors());

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  boards: [
    {
      type: Schema.Types.ObjectId,
      ref: "boards",
    },
  ],
});

module.exports = User = model("user", UserSchema);
