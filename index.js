const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/database");

app.use(cors());
// const corsOptions = {
//   origin: "http://localhost:3000",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
// };
// app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://example.com");
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });
// app.options("*", cors());
app.use(express.json());

app.post("/api/test", (req, res) => {
  console.log("success");
  res.send("SUCCESS");
});

const authRoute = require("./routes/auth.route");
app.use("/api/auth", authRoute);

const homeRoute = require("./routes/home.route");
app.use("/api/home", homeRoute);

connectDB();
app.listen(PORT, () => {
  console.log(`Server started at port : ${PORT}`);
});
