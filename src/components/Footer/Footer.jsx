import { motion, useScroll, useTransform } from "framer-motion";

import { useRef } from "react";
import GoldDivider from "../Dividers/GoldDivider";

import footerBgDesktop from "../../assets/footerbd.png";
import footerBgMobile from "../../assets/footerbm.png";

function RevealWords({ text, className = "", delay = 0 }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <motion.span key={i} initial={{ opacity: 0, y: 15, filter: "blur(4px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ delay: delay + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="inline-block mr-[0.25em]">{word}</motion.span>
      ))}
    </span>
  );
}

export default function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <footer ref={ref} className="relative py-24 px-6 overflow-hidden" style={{ backgroundColor: 'var(--bg-deep)' }}>
      {}
      <div className="absolute inset-0 pointer-events-none opacity-100">
        <img src={footerBgMobile} alt="Footer Background" loading="eager" className="w-full h-full object-cover block md:hidden"  />
        <img src={footerBgDesktop} alt="Footer Background" loading="eager" className="w-full h-full object-cover hidden md:block"  />
      </div>

      <motion.div initial={{ opacity: 1, y: 0 }} style={{ y, opacity }} className="relative z-10 mx-auto max-w-2xl text-center">
        <GoldDivider className="mb-10" />
        <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg italic" style={{ color: 'var(--text-primary)' }}>With all our love,</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-5 font-script text-6xl leading-none" style={{ color: 'var(--text-primary)' }}>Alisha & Anirudh</motion.h2>
        <p className="mx-auto mt-6 max-w-md leading-7" style={{ color: 'var(--text-primary)' }}>
          <RevealWords text="Thank you for celebrating with us. Your love, blessings and presence are the greatest gifts we could ask for." delay={0.3} />
        </p>
        <nav className="mt-8">
          <ul className="flex flex-wrap justify-center gap-4 text-sm">
            <li><a href="#hero" className="uppercase tracking-widest text-xs font-bold opacity-90 hover:underline">Home</a></li>
            <li><a href="#countdown" className="uppercase tracking-widest text-xs font-bold opacity-90 hover:underline">Countdown</a></li>
            <li><a href="#gifts" className="uppercase tracking-widest text-xs font-bold opacity-90 hover:underline">Gifts</a></li>
            <li><a href="#events" className="uppercase tracking-widest text-xs font-bold opacity-90 hover:underline">Events</a></li>
            <li><a href="#gallery" className="uppercase tracking-widest text-xs font-bold opacity-90 hover:underline">Gallery</a></li>
            <li><a href="#venue" className="uppercase tracking-widest text-xs font-bold opacity-90 hover:underline">Venue</a></li>
          </ul>
        </nav>
        <GoldDivider className="mt-12" />

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="absolute left-0 right-0 bottom-4 z-20 flex justify-center">
          <p className="text-[10px] sm:text-xs font-bold text-black uppercase tracking-widest opacity-80">
            Crafted by{' '}<a href="http://tekkzy.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-black hover:opacity-100 transition-opacity">Tekkzy</a>
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
