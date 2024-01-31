const express = require("express");
const router = express.Router();

const User = require("../models/user.model");

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = router;
