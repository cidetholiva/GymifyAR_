import { motion } from 'motion/react';
import { Activity, Zap, Heart } from 'lucide-react';
import { useState } from 'react';

const workouts = [
  {
    id: 'abs',
    name: 'Abs',
    icon: Activity,
    gradient: 'from-purple-600 to-purple-800',
    glow: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]',
  },
  {
    id: 'legs',
    name: 'Legs',
    icon: Zap,
    gradient: 'from-blue-600 to-blue-800',
    glow: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]',
  },
  {
    id: 'cardio',
    name: 'Cardio',
    icon: Heart,
    gradient: 'from-pink-600 to-pink-800',
    glow: 'hover:shadow-[0_0_40px_rgba(236,72,153,0.6)]',
  },
];

export function WorkoutSelection() {
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            Choose Your Workout
          </h2>
          <p className="text-cyan-200/80 max-w-2xl mx-auto">
            Select a workout type and let's get moving
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {workouts.map((workout, index) => {
            const Icon = workout.icon;
            const isSelected = selectedWorkout === workout.id;

            return (
              <motion.button
                key={workout.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedWorkout(workout.id)}
                className={`relative group p-8 rounded-3xl glassmorphism-strong transition-all duration-300 ${
                  workout.glow
                } ${
                  isSelected ? 'ring-2 ring-white/50' : ''
                }`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${workout.gradient} opacity-20 rounded-3xl transition-opacity group-hover:opacity-30`}></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* Icon Container */}
                  <div className={`mb-6 p-6 rounded-2xl bg-gradient-to-br ${workout.gradient} shadow-lg`}>
                    <Icon className="w-12 h-12" strokeWidth={2} />
                  </div>

                  {/* Workout Name */}
                  <h3 className="mb-2">{workout.name}</h3>
                  
                  {/* Description */}
                  <p className="text-sm text-cyan-200/70 mb-4">
                    {workout.id === 'abs' && 'Core strength and definition'}
                    {workout.id === 'legs' && 'Power and endurance'}
                    {workout.id === 'cardio' && 'Heart health and stamina'}
                  </p>

                  {/* Status Indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Selected</span>
                    </motion.div>
                  )}
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className={`absolute inset-0 bg-gradient-to-br ${workout.gradient} blur-2xl opacity-30`}></div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
