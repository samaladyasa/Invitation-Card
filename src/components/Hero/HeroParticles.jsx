import { motion } from "framer-motion";

const particles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 97) % 100}%`,
  delay: i * 0.35,
  duration: 10 + (i % 6),
  size: 6 + (i % 3) * 3,
  type: i % 4, // 0=marigold petal, 1=gold dot, 2=small diamond, 3=gold dot
}));

function MarigoldPetal({ size }) {
  return (
        <div
      style={{
        width: size,
        height: size * 1.3,
        borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
        background: `radial-gradient(circle at 40% 30%, var(--accent-pink), var(--accent-pink-2))`,
        opacity: 0.7,
      }}
    />
  );
}

function GoldDot({ size }) {
  return (
    <div
      style={{
        width: size * 0.5,
        height: size * 0.5,
        borderRadius: "50%",
        background: 'var(--accent-pink-2)',
        opacity: 0.5,
      }}
    />
  );
}

function SmallDiamond({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M6 0 L8 6 L6 12 L4 6 Z" fill="var(--accent-pink-2)" opacity="0.4" />
    </svg>
  );
}

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
          {particle.type === 0 && <MarigoldPetal size={particle.size} />}
          {particle.type === 1 && <GoldDot size={particle.size} />}
          {particle.type === 2 && <SmallDiamond size={particle.size} />}
          {particle.type === 3 && <GoldDot size={particle.size} />}
        </motion.div>
      ))}
    </div>
  );
}

export default HeroParticles;