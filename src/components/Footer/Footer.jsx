import { motion, useScroll, useTransform } from "framer-motion";
import { Heart } from "lucide-react";
import { useRef } from "react";
import GoldDivider from "../Dividers/GoldDivider";

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
    <footer ref={ref} className="py-24 px-6" style={{ backgroundColor: 'var(--bg-deep)' }}>
      <motion.div initial={{ opacity: 1, y: 0 }} style={{ y, opacity }} className="mx-auto max-w-2xl text-center">
        <GoldDivider className="mb-10" />
        <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-lg italic" style={{ color: 'var(--text-primary)' }}>With all our love,</motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-5 font-script text-6xl leading-none" style={{ color: 'var(--text-primary)' }}>Alisha & Anirudh</motion.h2>
        <p className="mx-auto mt-6 max-w-md leading-7" style={{ color: 'var(--text-primary)' }}>
          <RevealWords text="Thank you for celebrating with us. Your love, blessings and presence are the greatest gifts we could ask for." delay={0.3} />
        </p>
        <GoldDivider className="mt-12" />
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-12 flex flex-col items-center">
          <p className="uppercase tracking-[6px] text-xs" style={{ color: 'var(--accent-pink-2)', opacity: 0.6 }}>End of Invitation</p>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="mt-4" style={{ color: 'var(--accent-pink)'}}><Heart size={24} fill="var(--accent-pink)" /></motion.div>
        </motion.div>
      </motion.div>
    </footer>
  );
}