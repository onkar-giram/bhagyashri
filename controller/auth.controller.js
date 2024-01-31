const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password, role, dateofbirth } = req.body;

    const existingUserByEmail = await User.findOne({ email: email });

    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: "user already exists1",
      });
    }

    const existingUserByUsername = await User.findOne({ username: username });

    if (existingUserByUsername) {
      return res.status(400).json({
        success: false,
        message: "user already exists2",
      });
    }

    //secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      res.status(500).json({
        success: false,
        message: `Error while hashing password: ${err}`,
      });
    }

    //create entry for user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      dateOfBirth: dateofbirth,
    });

    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Error while signing up: ${err}`,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details carefully",
      });
    }

    //check for user
    let user = await User.findOne({ username: username });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Registered",
      });
    }

    const payload = {
      email: user.email,
      username: user.username,
      id: user._id,
      role: user.role,
    };

    //verify user
    if (await bcrypt.compare(password, user.password)) {
      //password match
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      // user = user.toObject();
      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        status: true,
        token,
        user,
        message: "User logged in successfully",
      });
    } else {
      //password not matched
      return res.status(403).json({
        success: false,
        message: "Password incorrect",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Error while loggin up: ${err}`,
    });
  }
};
