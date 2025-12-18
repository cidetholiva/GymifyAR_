import { motion } from 'motion/react';
import { Users, Home, Star } from 'lucide-react';
import { useState } from 'react';

const buddyTypes = [
  {
    id: 'friends',
    name: 'Friends',
    icon: Users,
    description: 'Work out with your crew',
    avatars: [
      { initial: 'JD', color: 'bg-purple-600' },
      { initial: 'SM', color: 'bg-blue-600' },
      { initial: 'AK', color: 'bg-pink-600' },
    ],
  },
  {
    id: 'family',
    name: 'Family',
    icon: Home,
    description: 'Stay fit together',
    avatars: [
      { initial: 'MK', color: 'bg-cyan-600' },
      { initial: 'DP', color: 'bg-purple-600' },
      { initial: 'LM', color: 'bg-blue-600' },
    ],
  },
  {
    id: 'celebrity',
    name: 'Celebrity',
    icon: Star,
    description: 'Train with the pros',
    avatars: [
      { initial: 'TS', color: 'bg-gradient-to-br from-yellow-400 to-orange-500' },
      { initial: 'CB', color: 'bg-gradient-to-br from-purple-400 to-pink-500' },
      { initial: 'RJ', color: 'bg-gradient-to-br from-blue-400 to-cyan-500' },
    ],
    isDefault: true,
  },
];

export function ARBuddySelection() {
  const [selectedBuddy, setSelectedBuddy] = useState<string>('celebrity');

  return (
    <section className="py-20 px-6 relative">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-4">
            Choose Your AR Workout Buddy
          </h2>
          <p className="text-cyan-200/80 max-w-2xl mx-auto">
            Select who you want to see in your AR overlay during workouts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {buddyTypes.map((buddy, index) => {
            const Icon = buddy.icon;
            const isSelected = selectedBuddy === buddy.id;

            return (
              <motion.button
                key={buddy.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedBuddy(buddy.id)}
                className={`relative group p-8 rounded-3xl glassmorphism-strong transition-all duration-300 ${
                  isSelected ? 'ring-2 ring-cyan-400/50 glow-border' : 'hover:glow-border-blue'
                }`}
              >
                {/* Default Badge */}
                {buddy.isDefault && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-xs">
                    Default
                  </div>
                )}

                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl glassmorphism">
                    <Icon className="w-8 h-8 text-cyan-400" strokeWidth={2} />
                  </div>
                </div>

                {/* Buddy Type Name */}
                <h3 className="mb-2">{buddy.name}</h3>
                <p className="text-sm text-cyan-200/70 mb-6">{buddy.description}</p>

                {/* Avatars */}
                <div className="flex justify-center items-center gap-2 mb-4">
                  {buddy.avatars.map((avatar, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.15 + idx * 0.1 }}
                      className={`w-12 h-12 rounded-full ${avatar.color} flex items-center justify-center shadow-lg border-2 border-white/20`}
                      style={{ zIndex: 10 - idx }}
                    >
                      <span className="text-xs">{avatar.initial}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Selected Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center justify-center gap-2 text-sm text-cyan-400"
                  >
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span>Active</span>
                  </motion.div>
                )}

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 blur-xl rounded-3xl"></div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
