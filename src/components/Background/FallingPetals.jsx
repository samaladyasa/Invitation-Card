import { useMemo } from "react";
import { motion } from "framer-motion";

export default function Petals() {
  const petals = useMemo(() => {
    return Array.from({ length: 25 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 6 + Math.random() * 6,
      size: 10 + Math.random() * 14,
      rotate: Math.random() * 360,
      type: Math.random() > 0.5 ? "marigold" : "gold",
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {petals.map((p, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: "-10%",
          }}
          animate={{
            y: ["0vh", "120vh"],
            rotate: [p.rotate, p.rotate + 360],
            x: [0, Math.random() * 40 - 20],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            style={{
              width: p.size,
              height: p.size * 1.4,
              borderRadius: "60% 40% 60% 40%",
              background: p.type === "marigold" ? `radial-gradient(circle at 30% 30%, var(--accent-pink), var(--accent-pink-2))` : `radial-gradient(circle at 30% 30%, var(--accent-pink-2), rgba(212,165,41,0.6))`,
              filter: "blur(0.3px)",
              opacity: 0.6,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}