import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import weddingData from "../../data/weddingData";

function RevealText({ text, className = "", delay = 0 }) {
  const words = text.split(" ");
  return (
    <motion.span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

function RevealName({ text, className = "", delay = 0 }) {
  const letters = text.split("");
  return (
    <motion.span className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + i * 0.03, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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

export default function HeroContent() {
  const { hero, invitation } = weddingData;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const duration = 5000;
    const animationEnd = Date.now() + duration;

    const root = getComputedStyle(document.documentElement);
    const confC1 = root.getPropertyValue('--accent-pink') || '#B22234';
    const confC2 = root.getPropertyValue('--bg-mid') || '#8B1A2B';
    const confC3 = root.getPropertyValue('--accent-pink-2') || '#D4A529';
    const confC4 = root.getPropertyValue('--accent-pink') || '#FFD700';

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      confetti({
        particleCount: 1,
        angle: 45 + Math.random() * 90,
        spread: 60,
        origin: { x: Math.random(), y: -0.1 },
        colors: [confC1.trim(), confC2.trim(), confC3.trim(), confC4.trim()],
        scalar: 0.8 + Math.random() * 0.4,
        ticks: 500,
        gravity: 0.2 + Math.random() * 0.1,
        drift: -0.3 + Math.random(),
        disableForReducedMotion: true,
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={ref} className="relative z-20 flex min-h-screen items-start justify-center px-5 pt-36 sm:pt-40 md:pt-48 lg:pt-56 lg:px-8">
      <motion.div style={{ y, opacity }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="relative z-20 w-full max-w-4xl text-center">
          <div className="mx-auto max-w-4xl text-center mt-[60px] sm:mt-8">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2 font-heading text-sm uppercase tracking-[0.08em] font-black sm:text-base lg:text-lg"
              style={{ color: '#000', lineHeight: 1.3, textShadow: '0 1px 0 #fff, 0 2px 0 #fff, 0 3px 0 #fff, 0 4px 0 #fff' }}
            >
              <RevealText text={invitation.mantra} delay={0.26} />
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 sm:mt-6 font-heading text-sm uppercase tracking-[0.12em] sm:text-base lg:text-lg"
              style={{ color: '#000', lineHeight: 1.45 }}
            >
              <RevealText text={invitation.message} delay={0.44} />
            </motion.p>
          </div>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.8, duration: 0.8 }} className="mx-auto mt-6">
          <OrnamentalLine />
        </motion.div>

        <h1 className="mt-6 font-script text-[clamp(3rem,12vw,8rem)] leading-none font-normal" style={{ color: '#000', fontWeight: 300, textShadow: '0 2px 8px rgba(0, 0, 0, 0.04)', letterSpacing: '-0.03em' }}>
          <RevealName text={hero.bride} delay={0.9} />
        </h1>

        <p className="mt-4 text-sm uppercase tracking-[0.14em] sm:text-base" style={{ color: '#000', lineHeight: 1.4 }}>{/* subtle label */}
          <RevealText text={invitation.brideRole} delay={1.05} />
        </p>
        <p className="mt-2 font-heading text-lg sm:text-2xl lg:text-3xl" style={{ color: '#000', letterSpacing: '0.01em', lineHeight: 1.35 }}>{/* parents */}
          <RevealText text={invitation.brideParents} delay={1.12} />
        </p>


        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.45, duration: 0.6 }} className="my-4 text-4xl sm:text-5xl lg:text-6xl font-script font-bold" style={{ color: '#000', textShadow: '0 3px 12px rgba(0, 0, 0, 0.06)' }}>&</motion.div>

        <h1 className="font-script text-[clamp(3rem,12vw,8rem)] leading-none font-normal" style={{ color: '#000', fontWeight: 300, textShadow: '0 2px 8px rgba(0, 0, 0, 0.04)', letterSpacing: '-0.03em' }}>
          <RevealName text={hero.groom} delay={1.6} />
        </h1>
        <p className="mt-4 text-sm uppercase tracking-[0.14em] sm:text-base" style={{ color: '#000', lineHeight: 1.4 }}>{/* subtle label */}
          <RevealText text={invitation.groomRole} delay={1.75} />
        </p>
        <p className="mt-2 font-heading text-lg sm:text-2xl lg:text-3xl" style={{ color: '#000', letterSpacing: '0.01em', lineHeight: 1.35 }}>{/* parents */}
          <RevealText text={invitation.groomParents} delay={1.82} />
        </p>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 2.3, duration: 0.8 }} className="mx-auto mt-10">
          <OrnamentalLine />
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.8 }} className="mt-8 text-lg font-heading sm:text-xl lg:text-2xl" style={{ color: '#000', marginTop: '-30px' }}>
          <RevealText text={invitation.date} delay={2.95} />
        </motion.p>

        <div className="mt-8">
          <p className="lowercase tracking-[0.45em] text-[10px] sm:text-xs" style={{ color: '#000' }}><RevealText text={'scroll to explore'} delay={3.2} /></p>
        </div>
      </motion.div>
    </div>
  );
}