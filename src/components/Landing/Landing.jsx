import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

import useScrollTrigger from "../../hooks/useScrollTrigger";
import InvitationReveal from "./InvitationReveal";

function Landing({ onComplete }) {
  const [phase, setPhase] = useState("idle");
  const lockedRef = useRef(false);

  useScrollTrigger(() => {
    if (lockedRef.current) return;
    lockedRef.current = true;
    setPhase("reveal");
  });

  function handleInvitationComplete() {
    confetti({
      particleCount: 220,
      spread: 100,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      onComplete?.();
    }, 1600);
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#FFF8F2]">
      <motion.img
        src="/images/alisha-anirudh.png"
        alt="Couple"
        className="absolute inset-0 w-full h-full object-contain"
        animate={{
          opacity: phase === "reveal" ? 0.15 : 1,
          scale: phase === "reveal" ? 1.05 : 1,
        }}
        transition={{ duration: 1.5 }}
      />
      <div className="absolute inset-0 bg-black/30" />
      {phase === "idle" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6">

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="uppercase tracking-[8px] text-white text-sm"
          >
            MARK THE DATE
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-white text-5xl md:text-6xl font-script"
          >
            A Celebration
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-3 uppercase tracking-[6px] text-white/90"
          >
            OF LOVE
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-8 h-px w-32 bg-white/70"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="mt-6 text-white/80 tracking-[6px]"
          >
            15 • 12 • 2026
          </motion.p>

          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-10 text-white/70 text-sm tracking-[5px]"
          >
            Scroll to Continue ↓
          </motion.p>
        </div>
      )}
      <AnimatePresence>
        {phase === "reveal" && (
          <InvitationReveal onComplete={handleInvitationComplete} />
        )}
      </AnimatePresence>

    </div>
  );
}

export default Landing;