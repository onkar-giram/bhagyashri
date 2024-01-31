const express = require("express");
const router = express.Router();

const { signup, signin } = require("../controller/auth.controller");

router.post("/signup", signup);
router.post("/signin", signin);

// router.get("/signup", (req, res) => {
//   console.log(req.body);
// });

module.exports = router;
