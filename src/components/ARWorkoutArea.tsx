import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Video, Sparkles, Play, Square } from "lucide-react";

type Status = "idle" | "starting" | "running" | "error";

export function ARWorkoutArea() {
  const webcamRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [buddyGifUrl, setBuddyGifUrl] = useState<string>("");

  // Change these later based on the user's selections (legs/abs/cardio)
  const workoutType = "legs";
  const buddyType = "celebrity";

  // Optional: if you notice sound is a tiny bit early/late, tweak this.
  // Example: 120 means "start audio 120ms after GIF begins"
  const syncOffsetMs = 0;
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "";


  const stopSession = () => {
    // Stop webcam
    if (webcamRef.current) {
      webcamRef.current.pause();
      webcamRef.current.srcObject = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    // Stop audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setBuddyGifUrl("");
    setStatus("idle");
  };

  const startSession = async () => {
    try {
      setStatus("starting");
      setErrorMsg("");

      // 1) Ask for webcam permission
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      streamRef.current = stream;

      if (!webcamRef.current) return;
      webcamRef.current.srcObject = stream;

      // Wait for metadata so video actually renders
      await new Promise<void>((resolve) => {
        const v = webcamRef.current!;
        if (v.readyState >= 1) return resolve();
        v.onloadedmetadata = () => resolve();
      });

      await webcamRef.current.play();

      // 2) Get buddy GIF URL from backend
      // backend should return: { buddyImageUrl: "/buddy-gifs/legs.gif" }
      const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
      const res = await fetch(
         `${API_BASE}/api/buddy?workoutType=${workoutType}&buddyType=${buddyType}`
        );

      if (!res.ok) throw new Error("Buddy API failed");
      const data = await res.json();

      const gifBaseUrl = data.buddyImageUrl || `/buddy-gifs/${workoutType}.gif`;

      // 3) Decide audio URL (separate track)
      // Put file in: public/audio/legs.mp3
      const audioUrl = `/audio/${workoutType}.mp3`;

      // 4) Reset audio and preload
      const a = audioRef.current;
      if (a) {
        a.pause();
        a.currentTime = 0;
        a.src = audioUrl;
        a.preload = "auto";

        // Make browser load it as much as possible *before* starting
        // (so the play starts immediately)
        a.load();

        // Wait until it has enough data to play without lag
        await new Promise<void>((resolve) => {
          const onReady = () => resolve();
          if (a.readyState >= 3) return resolve(); // HAVE_FUTURE_DATA
          a.addEventListener("canplaythrough", onReady, { once: true });
          a.addEventListener("canplay", onReady, { once: true });
        });
      }

      // 5) Force GIF restart (avoid cache resuming mid-animation)
      setBuddyGifUrl("");
      await new Promise((r) => setTimeout(r, 30));
      const gifUrl = `${gifBaseUrl}?t=${Date.now()}`;
      setBuddyGifUrl(gifUrl);

      // 6) Start audio right after GIF is "started"
      if (a) {
        if (syncOffsetMs > 0) {
          setTimeout(() => {
            a.play().catch(console.error);
          }, syncOffsetMs);
        } else {
          await a.play();
        }
      }

      setStatus("running");
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMsg(
        err?.message ||
          "Camera/audio failed. Check Chrome permissions + Mac Camera privacy settings."
      );
      stopSession();
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* hidden audio player */}
        <audio ref={audioRef} preload="auto" />

        <motion.div
          initial={{ opacity: 1, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-4">
            AR Workout Experience
          </h2>
          <p className="text-cyan-200/80 max-w-2xl mx-auto">
            Live Webcam + Gym Buddy Overlay + Audio
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative aspect-video rounded-3xl glassmorphism-strong glow-border overflow-hidden"
        >
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-purple-500 rounded-tl-3xl" />
          <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-blue-500 rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-cyan-500 rounded-bl-3xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-pink-500 rounded-br-3xl" />

          {/* Webcam */}
          <video
            ref={webcamRef}
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Buddy GIF overlay */}
          {status === "running" && buddyGifUrl && (
            <img
              src={buddyGifUrl}
              alt="AR Buddy"
              className="absolute pointer-events-none select-none"
              style={{
                height: "92%",
                width: "auto",
                right: "2%",
                bottom: "0%",
                transform: "translateY(2%)",
                objectFit: "contain",
              }}
            />
          )}

          {/* Placeholder UI */}
          {status !== "running" && (
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-12">
              <div className="relative mb-6">
                <Video
                  className="w-24 h-24 text-purple-400 animate-pulse"
                  strokeWidth={1.5}
                />
                <Sparkles
                  className="w-12 h-12 text-pink-400 absolute -top-2 -right-2 animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
              </div>

              <h3 className="text-2xl md:text-3xl mb-3 text-center">
                AR Camera / Workout Area
              </h3>

              <p className="text-cyan-200/70 text-center max-w-md">
                Click below to enable camera and start the workout buddy!
              </p>

              <div className="mt-6 flex flex-col items-center gap-3">
                <button
                  onClick={startSession}
                  disabled={status === "starting"}
                  className="glassmorphism px-6 py-3 rounded-full flex items-center gap-2 hover:opacity-90 pointer-events-auto"
                >
                  <Play className="w-4 h-4" />
                  {status === "starting" ? "Starting..." : "Enable Camera + Start AR"}
                </button>

                {status === "error" && (
                  <p className="text-sm text-pink-200/90 text-center max-w-md">
                    {errorMsg}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Stop button */}
          {status === "running" && (
            <div className="absolute z-20 bottom-4 left-1/2 -translate-x-1/2">
              <button
                onClick={stopSession}
                className="glassmorphism px-6 py-3 rounded-full flex items-center gap-2 hover:opacity-90 pointer-events-auto"
              >
                <Square className="w-4 h-4" />
                Stop AR
              </button>
            </div>
          )}

          {/* Grid Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
              {Array.from({ length: 96 }).map((_, i) => (
                <div key={i} className="border border-cyan-400/30" />
              ))}
            </div>
          </div>

          {/* Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/5 via-transparent to-blue-600/5 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
