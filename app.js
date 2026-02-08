const express = require("express");
require("dotenv").config();

const app = express();
const port = 5000;
const authRoutes = require("./routes/auth");

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
