import { motion } from 'motion/react';
import logo from '../assets/logo.png';

interface HeroSectionProps {
  onStartWorkout: () => void;
  onViewDemo: () => void;
}

export function HeroSection({ onStartWorkout, onViewDemo }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0118] via-[#1e0836] to-[#0a1a3a]"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src={logo} 
            alt="Gymify AR" 
            className="w-auto h-64 md:h-80 mx-auto mb-4 drop-shadow-[0_0_30px_rgba(168,85,247,0.6)]"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-cyan-200/90 mb-12 max-w-2xl mx-auto"
        >
          Train alongside a real workout buddy, anywhere with AR.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={onStartWorkout}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 glow-border-pink transform hover:scale-105 min-w-[200px]"
          >
            Start Workout
          </button>
          <button
            onClick={onViewDemo}
            className="px-8 py-4 rounded-full glassmorphism-strong border-2 border-blue-500/50 hover:border-blue-400 transition-all duration-300 glow-border-blue transform hover:scale-105 min-w-[200px]"
          >
            View Demo
          </button>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0118] to-transparent z-5"></div>
    </section>
  );
}