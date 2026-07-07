import { motion } from "framer-motion";
import { useMemo } from "react";

export default function HeroBackground() {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 20 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 5,
        size: 2 + Math.random() * 3,
      })),
    []
  );

  return (
    <>
      <div className="absolute inset-0 bg-[#FAF7F2]" />
      <motion.img
        src="/images/alisha-anirudh.png"
        alt="Bride & Groom"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          object-center
          opacity-20
          select-none
          pointer-events-none
        "
        animate={{
          scale: [1.08, 1.14, 1.08],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
     <div className="absolute inset-0 bg-white/35 backdrop-blur-[1px]" />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.18, 0.3, 0.18],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[700px]
          w-[700px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-gradient-to-r
          from-[#F8D8DE]
          via-[#FFF5EF]
          to-[#F6E5D2]
          blur-3xl
        "
      />
      <motion.div
        animate={{
          x: [-20, 25, -20],
          y: [-15, 20, -15],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -left-32
          top-16
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#F8D8DE]
          opacity-30
          blur-3xl
        "
      />
      <motion.div
        animate={{
          x: [20, -25, 20],
          y: [20, -15, 20],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -right-32
          bottom-10
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#F6E3C8]
          opacity-30
          blur-3xl
        "
      />
      {sparkles.map((sparkle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-[#D2A96B]"
          style={{
            width: sparkle.size,
            height: sparkle.size,
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
          }}
          animate={{
            y: [0, -35, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      <motion.div
        className="
          absolute
          inset-0
          opacity-[0.08]
          bg-gradient-to-r
          from-transparent
          via-white
          to-transparent
        "
        animate={{
          x: ["-120%", "120%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_40%,rgba(250,247,242,0.92)_100%)]
        "
      />
    </>
  );
}