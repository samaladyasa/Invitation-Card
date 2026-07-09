import { motion } from "framer-motion";
import { useMemo } from "react";

export default function HeroBackground() {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 25 }, () => ({
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
      <div className="absolute inset-0" style={{ backgroundColor: 'var(--bg-deep)' }} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ backgroundColor: 'var(--bg-deep)' }}>
        <motion.img
          src="/images/venue/Alisha-Anirudh.png"
          alt="Alisha and Anirudh"
          initial={{ opacity: 0, scale: 1.02, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 h-full w-full object-cover object-center"
          style={{ filter: 'brightness(1.06) saturate(1.18)' }}
        />

        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 48% 18%, rgba(255,255,255,0.18), transparent 16%), radial-gradient(circle at 45% 32%, rgba(255,236,165,0.18), transparent 28%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, transparent 42%, var(--vignette-color) 100%)' }} />

        <motion.div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(120deg, transparent 18%, rgba(255,215,115,0.22) 48%, transparent 78%)', mixBlendMode: 'screen', opacity: 0.24 }}
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Central red/gold radial glow */}
      <motion.div
        animate={{ scale: [1, 1.06, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: `radial-gradient(circle at center, var(--glow-1), var(--bg-mid))`, opacity: 0.14 }}
      />

      {/* Floating glow - left vermillion */}
      <motion.div
        animate={{ x: [-20, 25, -20], y: [-15, 20, -15] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-32 top-16 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ backgroundColor: 'var(--glow-1)', opacity: 0.15 }}
      />

      {/* Floating glow - right gold */}
      <motion.div
        animate={{ x: [20, -25, 20], y: [20, -15, 20] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-32 bottom-10 h-[420px] w-[420px] rounded-full blur-3xl"
        style={{ backgroundColor: 'var(--glow-2)', opacity: 0.08 }}
      />

      {/* Gold sparkles */}
      {sparkles.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: s.size, height: s.size, left: `${s.left}%`, top: `${s.top}%` }}
          animate={{ y: [0, -35, 0], opacity: [0, 0.7, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
        />
      ))}

      {/* Shimmer sweep */}
      <motion.div
        className="absolute inset-0 opacity-[0.04]"
        style={{ background: 'linear-gradient(90deg, transparent 0%, var(--border-accent) 50%, transparent 100%)' }}
        animate={{ x: ["-120%", "120%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Vignette */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, transparent 40%, var(--vignette-color) 100%)' }} />
    </>
  );
}