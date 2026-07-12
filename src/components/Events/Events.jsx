import { motion } from "framer-motion";
import eventsData from "./eventsData";
import eventsBgMobile from "../../assets/eventsbm.png";
import eventsBgDesktop from "../../assets/eventsbd.png";

function CurvedConnector({ fromLeft }) {
  const startX = fromLeft ? 96 : 504;
  const endX = fromLeft ? 504 : 96;
  const cpX1 = fromLeft ? 350 : 250;
  const cpX2 = fromLeft ? 250 : 350;

  return (
    <motion.svg viewBox="0 0 600 120" className="w-full h-20 md:h-24 hidden md:block" preserveAspectRatio="none" fill="none">
      <motion.path
        d={`M ${startX} 0 C ${cpX1} 30, ${cpX2} 90, ${endX} 120`}
        stroke="var(--accent-pink-2)"
        strokeWidth="1.5"
        strokeDasharray="10 8"
        strokeOpacity="0.35"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

export default function Events() {
  return (
    <section id="events" className="relative px-6 py-20 overflow-hidden" style={{ backgroundColor: 'var(--bg-deep)' }}>
      {/* Custom Background Images */}
      <div className="absolute inset-0 pointer-events-none">
        <img src={eventsBgMobile} alt="Events Background" className="w-full h-full object-cover block md:hidden" loading="lazy" />
        <img src={eventsBgDesktop} alt="Events Background" className="w-full h-full object-cover hidden md:block" loading="lazy" />
      </div>

      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative z-10 text-center mb-12">
        <p className="text-xs uppercase tracking-[6px] font-bold text-black opacity-80 decoration-black">Our Events</p>
        <h2 className="mt-3 font-script text-4xl md:text-5xl" style={{ color: 'var(--text-primary)' }}>Wedding Festivities</h2>
        <div className="mx-auto mt-4 h-px w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(212,165,41,0.12), transparent)' }} />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-3xl">
        {eventsData.map((event, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div key={index}>
              <motion.div
                initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex items-center gap-6 md:gap-10 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:flex-row`}
              >
                <div className="relative flex-shrink-0">
                  <div className="relative w-40 h-40 md:w-48 md:h-48">
                    <div className="absolute inset-0 overflow-hidden blob-shape" style={{ background: `linear-gradient(135deg, var(--accent-pink-2) 0%, rgba(255,255,255,0) 60%)` }}>
                      {event.image ? (
                        <img src={event.image} alt={event.title} loading="lazy" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center border border-white/30 bg-white/10 text-[10px] uppercase tracking-[3px] text-white/50">
                          Add Photo
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }} className={`flex-1 ${isLeft ? "md:text-left" : "md:text-right"} text-center`}>
                  <h3 className="font-heading text-xl md:text-2xl" style={{ color: 'var(--text-primary)' }}>{event.title}</h3>
                  <div className={`mt-2 flex items-center gap-2 ${isLeft ? "md:justify-start" : "md:justify-end"} justify-center`}>
                    <p className="text-sm tracking-[2px] uppercase font-bold text-black opacity-80">{event.date}</p>
                  </div>
                  <div className={`mt-1 flex items-center gap-2 ${isLeft ? "md:justify-start" : "md:justify-end"} justify-center`}>
                    <p className="text-xs tracking-wider font-bold text-black opacity-80">{event.time}</p>
                  </div>
                </motion.div>
              </motion.div>

              {index < eventsData.length - 1 && <CurvedConnector fromLeft={isLeft} index={index} />}
            </div>
          );
        })}
      </div>
    </section>
  );
}