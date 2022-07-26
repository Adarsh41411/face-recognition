const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();
// connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
  () => console.log("connected to db")
);

app.use(express.json());
app.use(cors());
app.use("/api",require("./routes"));


app.listen(5000, () => console.log("server up and runing on port 5000!"));
