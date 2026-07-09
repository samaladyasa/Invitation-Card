import { motion } from "framer-motion";

function AmbientGlow() {
  return (
    <>
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.12, 0.25, 0.12],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute left-1/2 top-[15%]
          h-[650px] w-[650px]
          -translate-x-1/2
          rounded-full
          blur-[120px]
        "
        style={{ backgroundColor: 'var(--glow-1)' }}
      />

      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.08, 0.18, 0.08],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute bottom-0 right-0
          h-[450px] w-[450px]
          rounded-full
          blur-[100px]
        "
        style={{ backgroundColor: 'var(--glow-2)' }}
      />
    </>
  );
}

export default AmbientGlow;