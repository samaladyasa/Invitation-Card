import eventsData from "./eventsData";
import eventsBgMobile from "../../assets/eventsbm.png";
import eventsBgDesktop from "../../assets/eventsbd.png";

function CurvedConnector({ fromLeft }) {
  const startX = fromLeft ? 140 : 460;
  const startY = 40;
  const endX = fromLeft ? 500 : 100;
  const endY = 106;
  const cpX1 = fromLeft ? 260 : 340;
  const cpX2 = fromLeft ? 360 : 240;
  const wavePath = `M ${startX} ${startY} C ${cpX1} ${startY}, ${cpX2} ${endY}, ${endX} ${endY}`;

  return (
    <svg viewBox="0 0 600 140" className="w-full h-24 md:h-28" preserveAspectRatio="none" fill="none">
      <path
        d={wavePath}
        stroke="var(--accent-pink)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={0.95}
      />
    </svg>
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

      <div className="relative z-10 text-center mb-12">
        <p className="text-xs uppercase tracking-[6px] font-bold text-black opacity-80 decoration-black">Our Events</p>
        <h2 className="mt-3 font-script text-4xl md:text-5xl" style={{ color: 'var(--text-primary)' }}>Wedding Festivities</h2>
        <div className="mx-auto mt-4 h-px w-20" style={{ background: 'linear-gradient(to right, transparent, rgba(212,165,41,0.12), transparent)' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        {eventsData.map((event, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div key={index}>
              <div className={`relative flex items-center gap-6 md:gap-10 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:flex-row`}>
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

                <div className={`flex-1 ${isLeft ? "md:text-left" : "md:text-right"} text-center`}>
                  <h3 className="font-heading text-xl md:text-2xl" style={{ color: 'var(--text-primary)' }}>{event.title}</h3>
                  <div className={`mt-2 flex items-center gap-2 ${isLeft ? "md:justify-start" : "md:justify-end"} justify-center`}>
                    <p className="text-sm tracking-[2px] uppercase font-bold text-black opacity-80">{event.date}</p>
                  </div>
                  <div className={`mt-1 flex items-center gap-2 ${isLeft ? "md:justify-start" : "md:justify-end"} justify-center`}>
                    <p className="text-xs tracking-wider font-bold text-black opacity-80">{event.time}</p>
                  </div>
                </div>
              </div>

              {index < eventsData.length - 1 && <CurvedConnector fromLeft={isLeft} index={index} />}
            </div>
          );
        })}
      </div>
    </section>
  );
}
