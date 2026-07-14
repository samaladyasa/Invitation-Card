import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import weddingData from "../../data/weddingData";
import ScratchPhoto from "./ScratchPhoto";

function RevealText({ text, className = "", delay = 0, start = false }) {
  const words = text.split(" ");
  return (
    <motion.span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: start ? 1 : 0, y: start ? 0 : 20 }}
          transition={{ delay: start ? delay + i * 0.15 : 0, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

function RevealName({ text, className = "", delay = 0, start = false }) {
  const letters = text.split("");
  return (
    <motion.span className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: start ? 1 : 0, x: start ? 0 : -24 }}
          transition={{ delay: start ? delay + i * 0.06 : 0, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
}

function OrnamentalLine() {
  return (
    <div className="flex items-center justify-center gap-4" style={{ color: 'var(--accent-pink-2)' }}>
      <span className="h-px w-12 sm:w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(212,165,41,0.12), transparent)' }} />
      <span className="h-1 w-1 rounded-full" style={{ backgroundColor: 'var(--accent-pink-2)', opacity: 0.8 }} />
      <span className="h-px w-12 sm:w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(212,165,41,0.12), transparent)' }} />
    </div>
  );
}

function CircularDate({ dateStr, delay, start }) {
  const clean = String(dateStr || "").replace(/[{}]/g, "").trim();
  const cleanUpper = clean.toUpperCase();
  const pathIdRef = useRef(`dateCurve-${Math.random().toString(36).slice(2, 9)}`);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: start ? 1 : 0, scale: start ? 1 : 0.5 }}
      transition={{ delay: start ? delay : 0, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mt-4 w-[150px] h-[150px] sm:w-[170px] sm:h-[170px] relative flex items-center justify-center p-2 rounded-full border border-[rgba(0,0,0,0.06)]"
      style={{ backgroundColor: 'rgba(255,255,255,0.4)', boxShadow: '0 8px 32px rgba(0,0,0,0.04)' }}
    >
      <div className="absolute w-[80%] h-[80%] rounded-full border border-[#d4a529] opacity-30" />
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
      >
        <path id={pathIdRef.current} d="M 50, 50 m -33, 0 a 33,33 0 1,1 66,0 a 33,33 0 1,1 -66,0" fill="transparent" />
        <text className="font-bold tracking-widest" textAnchor="middle" style={{ fontSize: '13px', fontFamily: '"Cormorant Garamond", serif', fill: '#000' }}>
          <textPath href={`#${pathIdRef.current}`} startOffset="50%">
            {cleanUpper}
          </textPath>
        </text>
      </motion.svg>
      <div className="absolute w-2 h-2 rounded-full bg-[#d4a529] opacity-80" />
    </motion.div>
  );
}

export default function HeroContent({ scratched, onScratched }) {
  const { hero, invitation } = weddingData;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {

  }, [scratched]);

  return (
    <div ref={ref} className="relative z-20 flex min-h-screen items-start justify-center px-4 pt-[20vh] sm:pt-[22vh] pb-[10vh] overflow-hidden lg:px-8">
      <motion.div style={{ y, opacity }} initial={{ opacity: 1 }} className="relative z-20 w-full max-w-4xl text-center flex flex-col items-center">
        <div className="mx-auto max-w-4xl text-center mt-4">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: scratched ? 1 : 0, y: scratched ? 0 : 15 }}
            transition={{ delay: scratched ? 1.5 : 0, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-xs uppercase tracking-[0.1em] font-bold sm:text-sm lg:text-base text-[#2b1f20]"
          >
            <RevealText text={invitation.mantra} delay={1.6} start={scratched} />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: scratched ? 1 : 0, y: scratched ? 0 : 15 }}
            transition={{ delay: scratched ? 2.5 : 0, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 font-heading text-[10px] uppercase tracking-[0.15em] sm:text-xs text-[#2b1f20]"
          >
            <RevealText text={invitation.message} delay={2.6} start={scratched} />
          </motion.p>
        </div>

        { }
        <ScratchPhoto onScratchComplete={onScratched} />

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: scratched ? 1 : 0 }} transition={{ delay: scratched ? 3.5 : 0, duration: 1.2 }} className="mx-auto mt-2">
          <OrnamentalLine />
        </motion.div>

        <h1 className="mt-2 font-script text-[clamp(2.5rem,10vw,6rem)] leading-none text-[#1a1415]">
          <RevealName text={hero.bride} delay={3.8} start={scratched} />
        </h1>

        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] font-medium text-[#2b1f20]">
          <RevealText text={invitation.brideRole} delay={4.2} start={scratched} />
        </p>
        <p className="mt-0.5 text-sm sm:text-lg font-bold tracking-wide text-black" style={{ fontFamily: '"Playfair Display", serif' }}>
          <RevealText text={invitation.brideParents} delay={4.5} start={scratched} />
        </p>

        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: scratched ? 1 : 0, opacity: scratched ? 1 : 0 }} transition={{ delay: scratched ? 5.0 : 0, duration: 1.2 }} className="my-1.5 text-2xl sm:text-4xl font-script font-bold text-[#1a1415]">&</motion.div>

        <h1 className="font-script text-[clamp(2.5rem,10vw,6rem)] leading-none text-[#1a1415]">
          <RevealName text={hero.groom} delay={5.5} start={scratched} />
        </h1>

        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] font-medium text-[#2b1f20]">
          <RevealText text={invitation.groomRole} delay={6.0} start={scratched} />
        </p>
        <p className="mt-0.5 text-sm sm:text-lg font-bold tracking-wide text-black" style={{ fontFamily: '"Playfair Display", serif' }}>
          <RevealText text={invitation.groomParents} delay={6.3} start={scratched} />
        </p>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: scratched ? 1 : 0 }} transition={{ delay: scratched ? 7.0 : 0, duration: 1.2 }} className="mx-auto mt-1 mb-2 border-t border-[#d4a529] w-12 opacity-60"></motion.div>

        <CircularDate dateStr={invitation.date} delay={7.5} start={scratched} />

      </motion.div>
    </div>
  );
}
