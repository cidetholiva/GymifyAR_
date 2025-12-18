import { motion } from 'motion/react';

export function Footer() {
  const links = [
    { name: 'About', href: '#about' },
    { name: 'Privacy', href: '#privacy' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative py-12 px-6 mt-20 border-t border-purple-500/20">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 to-transparent pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          {/* Brand */}
          <div className="text-center md:text-left">
            <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
              Gymify AR
            </h4>
            <p className="text-sm text-cyan-200/60">
              Work out together, anywhere.
            </p>
          </div>

          {/* Links */}
          <nav className="flex gap-8">
            {links.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-cyan-200/70 hover:text-cyan-200 transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
          </nav>

          {/* Copyright */}
          <div className="text-sm text-cyan-200/50 text-center md:text-right">
            © 2025 Gymify AR —Cideth Oliva
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
