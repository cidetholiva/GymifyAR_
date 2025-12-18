import { HeroSection } from "./components/HeroSection";
import { ARWorkoutArea } from "./components/ARWorkoutArea";
import { WorkoutSelection } from "./components/WorkoutSelection";
import { ARBuddySelection } from "./components/ARBuddySelection";
import { SocialAccountability } from "./components/SocialAccountability";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

export default function App() {
  const handleStartWorkout = () => {
    const workoutArea = document.getElementById("workout");
    workoutArea?.scrollIntoView({ behavior: "smooth" });
  };

  const handleViewDemo = () => {
    const demoArea = document.getElementById("demo");
    demoArea?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0a0118] text-white overflow-x-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-20 pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="relative z-10">
        {/* TEMP: Camera permission test button (should ALWAYS be clickable) */}
        <div className="relative z-50 flex justify-center mt-6 pointer-events-auto">
          <button
            onClick={async () => {
              try {
                const stream = await navigator.mediaDevices.getUserMedia({
                  video: true,
                  audio: false,
                });
                alert("Camera works! ✅");
                stream.getTracks().forEach((t) => t.stop());
              } catch (err) {
                console.error(err);
                alert(
                  "Camera failed. Check Chrome lock icon → Site settings → Camera: Allow, and Mac System Settings → Privacy & Security → Camera."
                );
              }
            }}
            className="glassmorphism px-6 py-3 rounded-full hover:opacity-90 pointer-events-auto"
          >
           
          </button>
        </div>

        <div id="home">
          <HeroSection onStartWorkout={handleStartWorkout} onViewDemo={handleViewDemo} />
        </div>

        <div id="workout">
          <WorkoutSelection />
        </div>

        <ARBuddySelection />

        <div id="demo">
          <ARWorkoutArea />
        </div>

        <div id="stats">
          <SocialAccountability />
        </div>

        <Footer />
      </div>

      {/* Ambient Light Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
