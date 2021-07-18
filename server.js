const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.get("/hello", (req, res) => {
  res.json("welcome to our website :3");
});

app.listen(3000);
