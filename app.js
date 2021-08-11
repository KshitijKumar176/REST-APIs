require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());

const subscribersRouter = require("./routes/subscribers")
app.use("/subscribers", subscribersRouter)

const aliensRouter = require("./routes/aliens")
app.use("/aliens", aliensRouter)

app.listen(3000, () => {
  console.log("Server started at 3000");
});
