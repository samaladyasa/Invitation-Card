import { motion } from "framer-motion";
import eventsData from "./eventsData";
import eventsBgMobile from "../../assets/eventsbm.png";
import eventsBgDesktop from "../../assets/eventsbd.png";

function CurvedConnector({ fromLeft }) {
  const startX = fromLeft ? 92 : 508;
  const endX = fromLeft ? 508 : 92;
  const cpX1 = fromLeft ? 352 : 248;
  const cpX2 = fromLeft ? 248 : 352;
  const chainGradient = "goldChainGradient";
  const linkGradient = "goldLinkGradient";
  const shineGradient = "goldShineGradient";

  const getPoint = (t) => {
    const p0 = { x: startX, y: 18 };
    const p1 = { x: cpX1, y: 38 };
    const p2 = { x: cpX2, y: 100 };
    const p3 = { x: endX, y: 122 };
    const u = 1 - t;
    return {
      x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
      y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
    };
  };

  const safePoint = (point) => ({
    x: typeof point?.x === "number" && Number.isFinite(point.x) ? point.x : startX,
    y: typeof point?.y === "number" && Number.isFinite(point.y) ? point.y : 18,
  });

  const beadCount = 10;
  const linkPoints = Array.from({ length: beadCount }, (_, index) => {
    const start = 0.08;
    const end = 0.92;
    const step = beadCount > 1 ? (end - start) / (beadCount - 1) : 0;
    return start + step * index;
  })
    .map(getPoint)
    .map(safePoint);
  const safeLinkPoints = linkPoints.map(safePoint);
  const leadPoints = fromLeft ? safeLinkPoints : [...safeLinkPoints].reverse();
  const defaultPoint = safePoint({ x: startX, y: 18 });

  return (
    <motion.svg viewBox="0 0 600 140" className="w-full h-24 md:h-28" preserveAspectRatio="none" fill="none">
      <defs>
        <linearGradient id={chainGradient} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,205,230,1)" />
          <stop offset="30%" stopColor="rgba(255,150,200,1)" />
          <stop offset="60%" stopColor="rgba(219,85,150,1)" />
          <stop offset="100%" stopColor="rgba(255,230,245,1)" />
        </linearGradient>
        <linearGradient id={linkGradient} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,240,248,1)" />
          <stop offset="50%" stopColor="rgb(12, 10, 11)" />
          <stop offset="100%" stopColor="rgba(199,86,135,1)" />
        </linearGradient>
        <linearGradient id={shineGradient} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="35%" stopColor="rgba(255,230,245,0.9)" />
          <stop offset="65%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <linearGradient id="shimmerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,90,90,0)" />
          <stop offset="50%" stopColor="rgba(255,70,70,0.95)" />
          <stop offset="100%" stopColor="rgba(255,90,90,0)" />
        </linearGradient>
        <radialGradient id="goldBead" cx="30%" cy="30%" r="60%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="30%" stopColor="rgba(255,220,130,0.85)" />
          <stop offset="70%" stopColor="rgba(212,165,41,0.9)" />
          <stop offset="100%" stopColor="rgba(168,123,23,1)" />
        </radialGradient>
        <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="10" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.path
        d={`M ${startX} 18 C ${cpX1} 38, ${cpX2} 100, ${endX} 122`}
        stroke="url(#chainGradient)"
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.18}
        filter="url(#glow)"
      />

      <motion.path
        d={`M ${startX} 18 C ${cpX1} 38, ${cpX2} 100, ${endX} 122`}
        stroke="url(#chainGradient)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="6 8"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: fromLeft ? 80 : -80 }}
        transition={{ duration: 3.6, ease: [0.22, 1, 0.36, 1], repeat: Infinity, repeatType: "loop" }}
      />

      <motion.path
        d={`M ${startX} 18 C ${cpX1} 38, ${cpX2} 100, ${endX} 122`}
        stroke="url(#shimmerGradient)"
        strokeWidth="10"
        strokeLinecap="round"
        opacity={1}
        strokeDasharray="240"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -480 }}
        transition={{ duration: 3.8, ease: [0.22, 1, 0.36, 1], repeat: Infinity }}
      />

      <motion.path
        d={`M ${startX} 18 C ${cpX1} 38, ${cpX2} 100, ${endX} 122`}
        stroke="url(#shineGradient)"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.95"
        strokeDasharray="2 10"
        initial={{ strokeDashoffset: 4 }}
        animate={{ strokeDashoffset: -4 }}
        transition={{ duration: 3.6, ease: [0.22, 1, 0.36, 1], repeat: Infinity, repeatType: "loop" }}
      />

      <g>
        <circle cx={startX} cy={18} r="12" fill="url(#linkGradient)" />
        <circle cx={startX} cy={18} r="5" fill="rgba(255,255,255,0.95)" />
      </g>
      <g>
        <circle cx={endX} cy={122} r="12" fill="url(#linkGradient)" />
        <circle cx={endX} cy={122} r="5" fill="rgba(255,255,255,0.95)" />
      </g>

      {linkPoints.map((point, idx) => {
        const safePointCoords = safePoint(point);
        return (
          <g key={idx}>
            <circle cx={safePointCoords.x} cy={safePointCoords.y} r="7" fill="url(#goldBead)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
            <circle cx={safePointCoords.x} cy={safePointCoords.y} r="2.6" fill="rgba(255,255,255,0.95)" />
          </g>
        );
      })}

      {(() => {
        const leadStart = leadPoints[0] ?? defaultPoint;
        const leadXs = leadPoints.map((point) => typeof point?.x === "number" && Number.isFinite(point.x) ? point.x : leadStart.x);
        const leadYs = leadPoints.map((point) => typeof point?.y === "number" && Number.isFinite(point.y) ? point.y : leadStart.y);
        const leadXOffsets = leadXs.map((x) => x - leadStart.x);
        const leadYOffsets = leadYs.map((y) => y - leadStart.y);
        return (
          <>
            <motion.circle
              cx={leadStart.x}
              cy={leadStart.y}
              r="16"
              fill="url(#linkGradient)"
              stroke="rgba(255,255,255,0.95)"
              strokeWidth="2"
              initial={{ opacity: 0.9, scale: 1, x: 0, y: 0 }}
              animate={{
                x: leadXOffsets,
                y: leadYOffsets,
                scale: [1, 1.06, 1],
                opacity: [0.95, 1, 0.95],
              }}
              transition={{ type: "keyframes", times: [0, 0.5, 1], duration: 3.2, ease: [0.22, 1, 0.36, 1], repeat: Infinity, repeatType: "mirror" }}
            />
            <motion.circle
              cx={leadStart.x}
              cy={leadStart.y}
              r="6"
              fill="rgba(255,255,255,0.95)"
              initial={{ opacity: 0.8, scale: 0.85, x: 0, y: 0 }}
              animate={{
                x: leadXOffsets,
                y: leadYOffsets,
                scale: [0.9, 1.08, 0.9],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ type: "keyframes", times: [0, 0.5, 1], duration: 3.2, ease: [0.22, 1, 0.36, 1], repeat: Infinity, repeatType: "mirror" }}
            />
          </>
        );
      })()}
    </motion.svg>
  );
}

export default function Events() {
  return (
    <section id="events" className="relative px-6 py-20 overflow-hidden" style={{ backgroundColor: 'var(--bg-deep)' }}>
      {}
      <div className="absolute inset-0 pointer-events-none">
        <img src={eventsBgMobile} alt="Events Background" loading="eager" className="w-full h-full object-cover block md:hidden"  />
        <img src={eventsBgDesktop} alt="Events Background" loading="eager" className="w-full h-full object-cover hidden md:block"  />
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
                        <img src={event.image} alt={event.title} loading="eager" className="h-full w-full object-cover" />
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
