require("./models/User");
require("./models/Track");
require("dotenv").config();
const express = require("express"),
  app = express(),
  mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://admin:${process.env.MONGODB_CLUSTER_PWD}@cluster0-knwvu.mongodb.net/test?retryWrites=true&w=majority`,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
  err => (err ? console.error(err) : console.info("MongDB Connected."))
);
// mongoose.connection.on("connected", () =>
//   console.info("Connected to mongodb instances")
// );
// mongoose.connection.on("error", err =>
//   console.error("Error while connecting to MongoDB", err)
// );
app.use(express.json());

const requireAuth = require("./middlewares/requireAuth");
const Auth = require("./routes/auth");
const Track = require("./routes/track");

app.use("/auth", Auth);
app.use("/tracks", Track);

app.get("/", requireAuth, (req, res) => res.send("Welcome"));

app.listen(3000, () => console.log("Server is running on port number 3000"));
