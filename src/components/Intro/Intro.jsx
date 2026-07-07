import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { initSound, playTick, stopSound } from "../../utils/sound";

const TEXT = "Welcome to something unforgettable";

export default function Intro({ onFinish }) {
  const [stage, setStage] = useState("envelope");
  const [display, setDisplay] = useState("");
  const indexRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const unlock = () => initSound();
    window.addEventListener("click", unlock, { once: true });

    return () => {
      window.removeEventListener("click", unlock);
      if (intervalRef.current) clearInterval(intervalRef.current);
      stopSound();
    };
  }, []);

  function startTyping() {
    setStage("typing");
    setDisplay("");
    indexRef.current = 0;

    stopSound();

    intervalRef.current = setInterval(() => {
      const i = indexRef.current;

      if (i < TEXT.length) {
        setDisplay(TEXT.slice(0, i + 1));

        if (TEXT[i] !== " ") playTick();

        indexRef.current++;
      } else {
        clearInterval(intervalRef.current);
        stopSound();

        setTimeout(() => {
          setStage("end");
          setTimeout(onFinish, 1200);
        }, 500);
      }
    }, 85);
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FFF8F2]">
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[300px] h-[300px] rounded-full bg-[#B76E79]/15 blur-3xl"
      />

      <AnimatePresence mode="wait">
        {stage === "envelope" && (
          <motion.div
            key="env"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.5 }}
            onClick={startTyping}
            className="
              cursor-pointer
              w-60
              h-60
              md:w-64
              md:h-64
              rounded-full
              bg-white
              shadow-[0_25px_60px_rgba(0,0,0,0.18)]
              flex
              flex-col
              items-center
              justify-center
              gap-5
            "
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-7xl"
            >
              ✉️
            </motion.div>

            <p className="text-[15px] font-medium text-gray-500">
              Tap to open invitation
            </p>
          </motion.div>
        )}
        {stage === "typing" && (
          <motion.div
            key="typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-md px-6 text-center"
          >
            <p className="text-2xl font-medium leading-relaxed text-[#4F4444]">
              {display}
              <span className="animate-pulse">|</span>
            </p>
          </motion.div>
        )}
        {stage === "end" && (
          <motion.div
            key="end"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-7xl"
            >
            </motion.div>

            <p className="mt-4 text-lg text-[#B76E79]">
              <i>The story begins...</i>
            </p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}