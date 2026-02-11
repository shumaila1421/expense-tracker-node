const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./db/connect");

const app = express();
const port = 5000;

app.use(express.json());

app.use(cors({ origin: "http://localhost:3000" }));

connectDB();

const authRoutes = require("./routes/auth");
const expenseRoutes = require("./routes/expense");

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/expenses", expenseRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
