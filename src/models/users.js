const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Sorry email is not valid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 8,
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

//jwt

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisismytoken");
  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

//password compare using bcrypt
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    //throw new Error("Unable to login");
    return "data not found";
  }
  const isMatched = await bcrypt.compare(password, user.password);
  console.log(isMatched);
  if (!isMatched) {
    //throw new Error("Unable to login");
    return "pass not Matched";
  }
  return user;
};

///Pssaword hashing before saving data
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  console.log("before save");
  next();
});
const User = mongoose.model("Users", userSchema);

module.exports = User;
