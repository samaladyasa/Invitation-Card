import { motion } from "framer-motion";
import weddingData from "../../data/weddingData";

function Leaf({ className, delay = 0 }) {
  return (
    <motion.svg
      className={className}
      width="160"
      height="160"
      viewBox="0 0 160 160"
      fill="none"
      animate={{
        y: [0, -10, 0],
        rotate: [-2, 2, -2],
        scale: [1, 1.03, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <path
        d="M20 135C55 85 85 45 140 18"
        stroke="#D5B07B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <ellipse
        cx="45"
        cy="108"
        rx="9"
        ry="19"
        fill="#D8B26E"
        transform="rotate(-35 45 108)"
      />

      <ellipse
        cx="70"
        cy="82"
        rx="9"
        ry="19"
        fill="#E7C896"
        transform="rotate(-22 70 82)"
      />

      <ellipse
        cx="97"
        cy="54"
        rx="9"
        ry="19"
        fill="#D8B26E"
        transform="rotate(-8 97 54)"
      />

      <ellipse
        cx="120"
        cy="30"
        rx="8"
        ry="17"
        fill="#EFD7AE"
        transform="rotate(10 120 30)"
      />
    </motion.svg>
  );
}

function Sparkle({ className, delay = 0 }) {
  return (
    <motion.div
      className={`absolute text-[#D8B26E] ${className}`}
      animate={{
        opacity: [0.2, 1, 0.2],
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
      ✦
    </motion.div>
  );
}

function HeroDecorations() {
  return (
    <>
      <Leaf
        className="absolute left-0 top-0 hidden opacity-70 lg:block"
        delay={0}
      />

      <Leaf
        className="absolute right-0 top-0 hidden rotate-90 opacity-70 lg:block"
        delay={1}
      />

      <Leaf
        className="absolute bottom-0 left-0 hidden -rotate-90 opacity-70 lg:block"
        delay={2}
      />

      <Leaf
        className="absolute bottom-0 right-0 hidden rotate-180 opacity-70 lg:block"
        delay={3}
      />
      <Sparkle className="left-[18%] top-[18%] text-xl" delay={0} />
      <Sparkle className="right-[20%] top-[25%] text-lg" delay={1} />
      <Sparkle className="left-[30%] bottom-[22%] text-lg" delay={2} />
      <Sparkle className="right-[28%] bottom-[18%] text-xl" delay={3} />
      <motion.div
        animate={{
          opacity: [0.08, 0.2, 0.08],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D8B26E]/10 blur-3xl"
      />
    </>
  );
}

export default HeroDecorations;