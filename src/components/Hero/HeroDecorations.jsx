import { motion } from "framer-motion";

function MandalaCorner({ className, delay = 0 }) {
  return (
    <motion.svg
      className={className}
      width="160"
      height="160"
      viewBox="0 0 160 160"
      fill="none"
      animate={{
        y: [0, -8, 0],
        rotate: [-1, 1, -1],
        scale: [1, 1.02, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {/* Paisley-inspired decorative corner */}
      <path
        d="M20 135C55 85 85 45 140 18"
        stroke="var(--accent-pink-2)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <ellipse cx="45" cy="108" rx="9" ry="19" fill="var(--accent-pink-2)" opacity="0.15" transform="rotate(-35 45 108)" />
      <ellipse cx="70" cy="82" rx="9" ry="19" fill="var(--accent-pink-2)" opacity="0.1" transform="rotate(-22 70 82)" />
      <ellipse cx="97" cy="54" rx="9" ry="19" fill="var(--accent-pink-2)" opacity="0.15" transform="rotate(-8 97 54)" />
      <ellipse cx="120" cy="30" rx="8" ry="17" fill="var(--accent-pink-2)" opacity="0.1" transform="rotate(10 120 30)" />
      {/* Small mandala circles */}
      <circle cx="40" cy="110" r="3" stroke="var(--accent-pink-2)" strokeWidth="0.5" fill="none" opacity="0.4" />
      <circle cx="95" cy="55" r="3" stroke="var(--accent-pink-2)" strokeWidth="0.5" fill="none" opacity="0.4" />
    </motion.svg>
  );
}

function GoldSparkle({ className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute ${className}`}
      animate={{
        opacity: [0.2, 0.8, 0.2],
        scale: [0.8, 1.2, 0.8],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 0 L7 5 L12 6 L7 7 L6 12 L5 7 L0 6 L5 5 Z" fill="var(--accent-pink-2)" opacity="0.6" />
      </svg>
    </motion.div>
  );
}

function HeroDecorations() {
  return (
    <>
      <MandalaCorner
        className="absolute left-0 top-0 hidden opacity-50 lg:block"
        delay={0}
      />
      <MandalaCorner
        className="absolute right-0 top-0 hidden rotate-90 opacity-50 lg:block"
        delay={1}
      />
      <MandalaCorner
        className="absolute bottom-0 left-0 hidden -rotate-90 opacity-50 lg:block"
        delay={2}
      />
      <MandalaCorner
        className="absolute bottom-0 right-0 hidden rotate-180 opacity-50 lg:block"
        delay={3}
      />

      <GoldSparkle className="left-[18%] top-[18%]" delay={0} />
      <GoldSparkle className="right-[20%] top-[25%]" delay={1} />
      <GoldSparkle className="left-[30%] bottom-[22%]" delay={2} />
      <GoldSparkle className="right-[28%] bottom-[18%]" delay={3} />

      <motion.div
        animate={{
          opacity: [0.05, 0.15, 0.05],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ backgroundColor: 'var(--accent-pink-2)', opacity: 0.06 }}
      />
    </>
  );
}

export default HeroDecorations;