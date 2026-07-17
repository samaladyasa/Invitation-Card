import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, ExternalLink, Sparkles } from "lucide-react";
import { useRef } from "react";
import details from "../../data/details.json";

import venueBgDesktop from "../../assets/venuebd.png";
import venueBgMobile from "../../assets/venuebm.png";

function ScrollRevealText({ children, className = "", delay = 0 }) {
  return (<motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>);
}

export default function Venue() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <section ref={ref} id="venue" className="relative py-20 px-5 md:px-8 overflow-hidden" style={{ backgroundColor: 'var(--bg-deep)' }}>
      { }
      <div className="absolute inset-0 pointer-events-none opacity-100">
        <img src={venueBgMobile} alt="Venue Background" loading="eager" className="w-full h-full object-cover block md:hidden" />
        <img src={venueBgDesktop} alt="Venue Background" loading="eager" className="w-full h-full object-cover hidden md:block" />
      </div>

      <motion.div style={{ scale, opacity, y }} className="relative z-10 mx-auto max-w-4xl">
        <div className="flex justify-center pt-8">
          <div className="relative w-full max-w-xl rounded-2xl p-4 transition-all duration-500 hover:-translate-y-2" style={{ background: 'var(--bg-card)', border: '1px solid rgba(212,165,41,0.2)', boxShadow: '0 25px 60px rgba(0,0,0,0.1)' }}>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30">
              <span className="inline-block rounded-full px-8 py-3 text-xs uppercase tracking-[5px] shadow-lg" style={{ border: '1px solid rgba(0,0,0,0.06)', background: 'var(--bg-card)', color: 'var(--text-secondary)', boxShadow: '0 6px 14px rgba(0,0,0,0.1)' }}>Venue</span>
            </div>
            <img src="/images/venue/venue.jpg" alt={details.venue} loading="eager" className="h-[320px] w-full rounded-xl object-cover md:h-[430px]" />
            <div className="pt-6 px-2">
              <ScrollRevealText><h2 className="font-heading text-3xl md:text-4xl" style={{ color: 'var(--text-primary)' }}>{details.venue}</h2></ScrollRevealText>
              <ScrollRevealText delay={0.1}><p className="mt-3 flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}><MapPin size={18} style={{ color: 'var(--accent-pink-2)' }} />{details.venueLocation}</p></ScrollRevealText>
              <div className="my-6"><span className="block h-px w-full" style={{ backgroundColor: 'rgba(212,165,41,0.3)' }} /></div>
              <ScrollRevealText delay={0.2}><p className="leading-7" style={{ color: 'var(--text-secondary)' }}>{details.venueAddress}</p></ScrollRevealText>
              <ScrollRevealText delay={0.3}>
                <a href={details.venueMapLink} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300" style={{ border: '1px solid rgba(212,165,41,0.12)', color: 'var(--accent-pink-2)', background: 'transparent' }}>
                  View on Google Maps <ExternalLink size={14} />
                </a>
              </ScrollRevealText>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
