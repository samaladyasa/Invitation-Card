import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import cdBgDesktop from "../../assets/cdbd.png";
import cdBgMobile from "../../assets/cdbm.png";

function ScrollRevealText({ children, className = "" }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>
  );
}

export default function Countdown() {
  const targetDate = new Date("2026-12-15T00:00:00").getTime();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      setTimeLeft({
        days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
        minutes: Math.max(0, Math.floor((difference / (1000 * 60)) % 60)),
        seconds: Math.max(0, Math.floor((difference / 1000) % 60)),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const Time = ({ value, label }) => (
    <div className="text-center">
      <motion.p key={value} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-3xl sm:text-4xl md:text-5xl" style={{ color: 'var(--text-primary)' }}>{String(value).padStart(2, "0")}</motion.p>
      <p className="mt-2 text-[10px] sm:text-xs uppercase tracking-[4px]" style={{ color: 'var(--accent-pink-2)', opacity: 0.7 }}>{label}</p>
    </div>
  );

  return (
    <section id="countdown" ref={sectionRef} className="relative overflow-hidden py-20 px-5" style={{ backgroundColor: 'var(--bg-deep)' }}>

      {/* Custom Background Images */}
      <div className="absolute inset-0 pointer-events-none opacity-100">
        <img src={cdBgMobile} alt="Countdown Background" className="w-full h-full object-cover block md:hidden" loading="lazy" />
        <img src={cdBgDesktop} alt="Countdown Background" className="w-full h-full object-cover hidden md:block" loading="lazy" />
      </div>

      <motion.div style={{ scale, opacity, background: 'var(--bg-card)', borderRadius: '35px', border: '1px solid var(--border-accent)' }} className="relative z-10 mx-auto max-w-4xl backdrop-blur-md shadow-2xl px-6 py-12 sm:px-12">
        <ScrollRevealText className="text-center"><p className="uppercase tracking-[7px] text-xs" style={{ color: 'var(--accent-pink-2)', opacity: 0.7 }}>Counting Down To Forever</p></ScrollRevealText>
        <ScrollRevealText className="text-center"><h2 className="mt-4 font-script text-4xl sm:text-5xl" style={{ color: 'var(--text-primary)' }}>Our Wedding Day</h2></ScrollRevealText>
        <div className="mx-auto mt-6 h-[1px] w-16" style={{ background: 'linear-gradient(to right, transparent, var(--accent-pink-2), transparent)' }} />
        <div className="mt-8 flex justify-center items-center gap-5 sm:gap-10">
          <Time value={timeLeft.days} label="Days" /><span className="text-xl" style={{ color: 'var(--accent-pink-2)' }}>:</span>
          <Time value={timeLeft.hours} label="Hours" /><span className="text-xl" style={{ color: 'var(--accent-pink-2)' }}>:</span>
          <Time value={timeLeft.minutes} label="Min" /><span className="text-xl" style={{ color: 'var(--accent-pink-2)' }}>:</span>
          <Time value={timeLeft.seconds} label="Sec" />
        </div>
      </motion.div>
    </section>
  );
}