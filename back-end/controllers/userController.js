const mongoose = require("mongoose");
const User = mongoose.model("User");
const sha256 = require("js-sha256");
const jwt = require("jwt-then");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password: sha256(password + process.env.SALT),
  });

  if (!user) throw "Email and Password did not match!";
  
  const token = await jwt.sign({ id: user.id }, process.env.SECRET);

  res.json({
    message: "User logged successfully!",
    token,
  });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({
    email,
  });

  if (userExists) throw "User with same email already exists";

  const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;
  if (!emailRegex.test(email)) throw "Email is not supported from your domain!";
  if (password.length < 6) throw "Password should be more than 6 characters";

  const user = new User({
    name,
    email,
    password: sha256(password + process.env.SALT),
  });

  await user.save();

  res.json({
    message: `User [${name}] register successfully`,
  });
};
