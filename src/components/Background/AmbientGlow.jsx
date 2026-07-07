import { motion } from "framer-motion";

function AmbientGlow() {
  return (
    <>
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-[15%]
          h-[650px]
          w-[650px]
          -translate-x-1/2
          rounded-full
          bg-[#F8DDE2]
          blur-[120px]
        "
      />

      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-0
          right-0
          h-[450px]
          w-[450px]
          rounded-full
          bg-[#FFE8C8]
          blur-[100px]
        "
      />
    </>
  );
}

export default AmbientGlow;