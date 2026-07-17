import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Image } from "lucide-react";
import details from "../../data/details.json";

import galleryBgDesktop from "../../assets/gallerybd.png";
import galleryBgMobile from "../../assets/gallerybm.png";

const galleryImages = details.galleryImages || [
    { id: 1, src: 'https://plus.unsplash.com/premium_photo-1682092632793-c7d75b23718e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW5kaWFuJTIwd2VkZGluZyUyMHBob3RvZ3JhcGh5fGVufDB8fDB8fHww', alt: "Wedding moment 1" },
    { id: 2, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMbguuZ-GdzVb0PKQlU4hf_zSZFG0Vs7cT33eW-953Cg&s=10', alt: "Wedding moment 2" },
    { id: 3, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVU5aGwdXJL0X0vlZghuH9GhwT3tiflLpbu133bT_1GP5QQGtkDaD5s9Xs&s=10', alt: "Wedding moment 3" },
    { id: 4, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8nlo7LsKT73iN0JCEjX3tZV0GExtct4jMaZoJfbzkVOY8GmlmTFKyKX4&s=10', alt: "Wedding moment 4" },
    { id: 5, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlCkrbeQ4-YwvSf7lxDOnbZxzudDi3hN_BH5EmpLgvyKAL--Tuxf8YjZ8&s=10', alt: "Wedding moment 5" },
    { id: 6, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlyc7Q_dTUJ74gClxW0KCpxquyC170IInDgfFQcPI3BxeBHe6ErYNr7NE&s=10', alt: "Wedding moment 6" },
];

function GalleryCard({ image, paused }) {
    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className="group relative flex min-h-[300px] w-[240px] md:w-[320px] lg:w-[360px] shrink-0 flex-col overflow-hidden rounded-[1.75rem] p-3 md:p-4 text-left transition-all duration-300"
            style={{
                opacity: paused ? 0.9 : 1,
                border: '1px solid rgba(212,165,41,0.06)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.12)',
                background: 'radial-gradient(circle at top, rgba(212,165,41,0.05), transparent 60%)',
            }}
        >
            <div className="relative h-[220px] md:h-[260px] lg:h-[300px] overflow-hidden rounded-[1.25rem] border" style={{ borderColor: 'rgba(255,255,255,0.06)', backgroundColor: 'var(--bg-base)' }}>
                {image.src ? (
                    <img src={image.src} alt={image.alt} loading="eager" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ pointerEvents: 'none' }} />
                ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center" style={{ background: 'radial-gradient(circle at top, rgba(212,165,41,0.12), transparent 60%)' }}>
                        <Image size={34} className="" style={{ color: 'var(--accent-pink-2)', opacity: 0.3 }} />
                        <p className="mt-3 text-[10px] uppercase tracking-[0.35em]" style={{ color: 'var(--accent-pink-2)', opacity: 0.3 }}>Photo {image.id}</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default function Gallery() {
    const [paused, setPaused] = useState(false);
    const trackImages = [...galleryImages, ...galleryImages];

    return (
        <section id="gallery" className="relative px-5 py-20 md:px-8 overflow-hidden" style={{ backgroundColor: 'var(--bg-deep)' }}>

            {}
            <div className="absolute inset-0 pointer-events-none opacity-100">
                <img src={galleryBgMobile} alt="Gallery Background" loading="eager" className="w-full h-full object-cover block md:hidden"  />
                <img src={galleryBgDesktop} alt="Gallery Background" loading="eager" className="w-full h-full object-cover hidden md:block"  />
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative z-10 mb-12 text-center">
                <p className="text-xs uppercase tracking-[8px] font-bold text-black opacity-80">Captured Moments</p>
                <h2 className="mt-4 font-script text-5xl" style={{ color: 'var(--text-primary)' }}>Our Gallery</h2>
                <div className="mx-auto mt-4 h-px w-24" style={{ background: 'linear-gradient(to right, transparent, rgba(212,165,41,0.12), transparent)' }} />
            </motion.div>

            {}
            <div className="relative z-10">
                <div className="mx-auto max-w-[1600px] overflow-hidden" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onTouchStart={() => setPaused(true)} onTouchEnd={() => setPaused(false)}>
                    <div className="flex w-fit">
                        <motion.div className="flex gap-4 md:gap-8 px-2 md:px-4" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 35, ease: "linear", repeat: Infinity, repeatType: "loop" }} style={{ animationPlayState: paused ? 'paused' : 'running' }}>
                            {trackImages.map((img, i) => (
                                <GalleryCard key={`${img.id}-${i}`} image={img} paused={paused} />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
            {/* Click-to-zoom disabled: no modal rendered */}
        </section>
    );
}
