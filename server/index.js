require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ----------------------------------------------------
// Health check (useful for testing proxy connection)
// ----------------------------------------------------
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// ----------------------------------------------------
// Buddy video API
// Returns a safe video URL based on workout selection
// ----------------------------------------------------
app.get("/api/buddy", (req, res) => {
  const workoutType = (req.query.workoutType || "legs").toLowerCase();
  const buddyType = (req.query.buddyType || "celebrity").toLowerCase();

  // Allowed workouts (prevents weird paths)
  const allowedWorkouts = ["abs", "legs", "cardio"];
  const safeWorkout = allowedWorkouts.includes(workoutType)
    ? workoutType
    : "legs";

  // For demo purposes, we ignore buddyType and return a local video.
  // Later, this is where RapidAPI logic would go.
  const buddyVideoUrl = `/buddy-videos/${safeWorkout}.mp4`;

  return res.json({
    workoutType: safeWorkout,
    buddyType,
    buddyVideoUrl,
  });
});

// ----------------------------------------------------
// Start server
// ----------------------------------------------------
const PORT = 5050;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
