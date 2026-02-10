const express = require("express");
require("dotenv").config();
const connectDB = require("./db/connect");

const app = express();
const port = 5000;
app.use(express.json());
const authRoutes = require("./routes/auth");
connectDB();
const expenseRoutes = require("./routes/expense");
app.use("/api/v1/expenses", expenseRoutes);

app.use("/api/v1/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
