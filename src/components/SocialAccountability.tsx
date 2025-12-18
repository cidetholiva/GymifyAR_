import { motion } from 'motion/react';
import { Trophy, Users, Target } from 'lucide-react';

const stats = [
  {
    id: 'workouts',
    icon: Trophy,
    label: 'Workouts Completed',
    value: 47,
    max: 60,
    gradient: 'from-purple-600 to-purple-800',
    color: 'purple',
  },
  {
    id: 'friends',
    icon: Users,
    label: 'Friends Shared With',
    value: 12,
    max: 20,
    gradient: 'from-blue-600 to-blue-800',
    color: 'blue',
  },
  {
    id: 'challenges',
    icon: Target,
    label: 'Friendly Challenges',
    value: 8,
    max: 10,
    gradient: 'from-pink-600 to-pink-800',
    color: 'pink',
  },
];

export function SocialAccountability() {
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
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 mb-4">
            Your Fitness Journey
          </h2>
          <p className="text-cyan-200/80 max-w-2xl mx-auto">
            Track your progress and stay motivated with friends
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const percentage = (stat.value / stat.max) * 100;

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="glassmorphism-strong rounded-3xl p-8 hover:glow-border transition-all duration-300">
                  {/* Icon */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>
                      <Icon className="w-8 h-8" strokeWidth={2} />
                    </div>
                    <div className="text-right">
                      <div className="text-3xl mb-1">{stat.value}</div>
                      <div className="text-xs text-cyan-200/60">of {stat.max}</div>
                    </div>
                  </div>

                  {/* Label */}
                  <h4 className="mb-4">{stat.label}</h4>

                  {/* Progress Bar */}
                  <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
                      className={`absolute top-0 left-0 h-full bg-gradient-to-r ${stat.gradient} rounded-full`}
                    ></motion.div>
                    
                    {/* Glowing Effect on Progress Bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
                      className={`absolute top-0 left-0 h-full bg-gradient-to-r ${stat.gradient} rounded-full blur-sm opacity-50`}
                    ></motion.div>
                  </div>

                  {/* Percentage Label */}
                  <div className="mt-3 text-right text-sm text-cyan-200/70">
                    {Math.round(percentage)}% Complete
                  </div>
                </div>

                {/* Floating Particles on Hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br ${stat.gradient} blur-2xl opacity-20`}></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Motivation Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-block glassmorphism px-8 py-4 rounded-full">
            <p className="text-cyan-200/90">
              <span className="text-pink-400">Keep it up!</span> You're doing amazing 🎉
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
