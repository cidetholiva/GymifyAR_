require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/buddy", (req, res) => {
  const workoutType = (req.query.workoutType || "legs").toLowerCase();
  const buddyType = (req.query.buddyType || "celebrity").toLowerCase();

  const allowed = ["abs", "legs", "cardio"];
  const safeWorkout = allowed.includes(workoutType) ? workoutType : "legs";

  res.json({
    workoutType: safeWorkout,
    buddyType,
    buddyImageUrl: `/buddy-gifs/${safeWorkout}.gif`,
    buddyAudioUrl: `/buddy-audio/${safeWorkout}.mp3`,
    durationMs: 12000 // IMPORTANT: how long the workout lasts
  });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
