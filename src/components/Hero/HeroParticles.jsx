import { motion } from "framer-motion";

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 97) % 100}%`,
  delay: i * 0.35,
  duration: 10 + (i % 6),
  size: 10 + (i % 3) * 4,
  symbol: i % 4 === 0 ? "🌸" : i % 4 === 1 ? "✨" : "•",
}));

function HeroParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute select-none"
          style={{
            left: particle.left,
            top: "-10%",
            fontSize: particle.size,
          }}
          animate={{
            y: ["0vh", "120vh"],
            x: [0, 20, -20, 15, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay,
          }}
        >
          {particle.symbol}
        </motion.div>
      ))}
    </div>
  );
}

export default HeroParticles;