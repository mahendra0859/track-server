const mongoose = require("mongoose");
const PointSchema = mongoose.Schema({
  timestamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number
  }
});
const TrackSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  name: { type: String, default: "" },
  locations: [PointSchema]
});

mongoose.model("Track", TrackSchema);
