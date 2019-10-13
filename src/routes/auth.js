const router = require("express").Router();
module.exports = router;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user.id }, SECRET);
    res.send({ token });
  } catch (err) {
    if (err.name === "MongoError" && err.code === 11000) {
      res.send("Email already Exist");
    } else res.status(422).send(err.message);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: "Inavalid password or email" });
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, SECRET);
    res.send({ token });
  } catch (err) {
    res.status(422).send({ error: "Inavalid password or email" });
  }
});
