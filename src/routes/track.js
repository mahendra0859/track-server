const router = require("express").Router();
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");
const Track = mongoose.model("Track");
module.exports = router;

router.use(requireAuth);

router.get("/", async (req, res) => {
  try {
    const tracks = await Track.find({ userId: req.user.id });
    res.send(tracks);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, locations } = req.body;
    if (!name || !locations) {
      return res
        .status(422)
        .send({ error: "You must provide a name and locations" });
    }
    const track = new Track({ name, locations, userId: req.user.id });
    await track.save();
    res.send(track);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
