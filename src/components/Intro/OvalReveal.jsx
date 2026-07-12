import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Hand } from "lucide-react";
import weddingData from "../../data/weddingData";

export default function OvalReveal({ stage, onScratchComplete }) {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [isScratched, setIsScratched] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);
    const [showHint, setShowHint] = useState(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });

        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
        gradient.addColorStop(0, "#D9A897");
        gradient.addColorStop(0.5, "#E2C3B9");
        gradient.addColorStop(1, "#D9A897");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, rect.width, rect.height);

        for (let i = 0; i < 2000; i++) {
            ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)";
            ctx.fillRect(
                Math.random() * rect.width,
                Math.random() * rect.height,
                2, 2
            );
        }
    }, []);

    function handlePointerDown(e) {
        if (isScratched) return;
        setIsDrawing(true);
        setShowHint(false);
        scratch(e);
    }

    function handlePointerUp() {
        setIsDrawing(false);
        checkCompletion();
    }

    function handlePointerMove(e) {
        if (!isDrawing || isScratched) return;
        scratch(e);
    }

    function scratch(e) {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        const rect = canvas.getBoundingClientRect();

        
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);

        if (!clientX || !clientY) return;

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 35, 0, 2 * Math.PI); 
        ctx.fill();
    }

    function checkCompletion() {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        const rect = canvas.getBoundingClientRect();
        const w = canvas.width;
        const h = canvas.height;

        const imageData = ctx.getImageData(0, 0, w, h);
        const pixels = imageData.data;
        let transparentCount = 0;

      
        for (let i = 3; i < pixels.length; i += 16) {
            if (pixels[i] < 128) {
                transparentCount++;
            }
        }

        const totalPixels = pixels.length / 16;
        const percentage = (transparentCount / totalPixels) * 100;

        if (percentage > 40) { 
            completeReveal();
        }
    }

    function completeReveal() {
        setIsScratched(true);

        
        if (canvasRef.current) {
            canvasRef.current.style.transition = "opacity 0.8s ease-out";
            canvasRef.current.style.opacity = "0";
        }

        
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;

            confetti({
                particleCount: 150,
                spread: 80,
                origin: { x, y },
                colors: ["#B22234", "#FFD700", "#D4A529", "#8B1A2B"],
                disableForReducedMotion: true,
            });
        }

        onScratchComplete();
    }

    return (
        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full max-w-[500px] aspect-[3/4] max-h-[90vh] bg-[#FDF7F4] flex flex-col items-center p-6 sm:p-10 shadow-2xl overflow-hidden"
            style={{ borderRadius: "16px", border: "1px solid #E9D8B4" }}
        >
        
            <div className="absolute inset-4 border border-[#E9D8B4] pointer-events-none rounded-xl" />
            <div className="absolute inset-5 border border-[#E9D8B4] pointer-events-none rounded-xl opacity-50" />

           
            <div className="absolute top-0 left-0 w-24 h-24 bg-rose-200/20 blur-xl rounded-full" />
            <div className="absolute top-2 left-2 text-3xl opacity-80 pointer-events-none">🌸</div>
 
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-200/20 blur-xl rounded-full" />
            <div className="absolute top-2 right-2 text-3xl opacity-80 pointer-events-none">🌸</div>

           
            <div className="absolute bottom-2 left-2 text-3xl opacity-80 pointer-events-none">🌸</div>
            <div className="absolute bottom-2 right-2 text-3xl opacity-80 pointer-events-none">🌸</div>

           
            <div className="mt-8 flex flex-col items-center z-10">
                <span className="text-[#D4A529] font-bold text-[10.5px] sm:text-xs text-center px-4 max-w-[250px] leading-relaxed relative z-10" style={{ textShadow: "0 0 10px #FDF7F4", zIndex: 10 }}>{weddingData.invitation.mantra}</span>
                <span className="mt-5 text-[#8B1A2B] text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-center max-w-[200px] bg-opacity-50">
                    {weddingData.invitation.title || "We Invite You To"}
                </span>
            </div>

            
            <div
                ref={containerRef}
                className="relative mt-6 sm:mt-10 w-[240px] h-[160px] sm:w-[280px] sm:h-[180px] rounded-[50%] overflow-hidden border-[3px] border-[#D4A529] shadow-inner"
                style={{ background: "#F5EFE6" }}
            >
               
                <div className="absolute inset-0 bg-[#E8D4C8] flex items-center justify-center">
                    {}
                    <div className="w-full h-full object-cover bg-gradient-to-br from-rose-200 to-rose-300" />
                    <span className="absolute text-5xl opacity-40">💍</span>
                </div>

              
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full cursor-pointer touch-none"
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                    onPointerMove={handlePointerMove}
                    onPointerLeave={handlePointerUp}
                />

                
                {showHint && !isScratched && (
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: [20, -20, 20], opacity: [0, 1, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 2.5 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 text-[#811D30]"
                    >
                        <Hand size={32} />
                    </motion.div>
                )}
            </div>

           
            <div className="mt-8 sm:mt-10 flex flex-col items-center transition-opacity duration-1000 z-10" style={{ opacity: isScratched ? 1 : 0.8, textShadow: "0 0 15px #FDF7F4" }}>
                <h1 className="font-script text-4xl sm:text-5xl text-[#8B1A2B]" style={{ letterSpacing: "-0.02em" }}>
                    {weddingData.hero.bride} & {weddingData.hero.groom}
                </h1>
                <div className="mt-4 flex items-center gap-4 text-[#8B1A2B] text-sm sm:text-base tracking-[0.2em] font-semibold bg-white/30 px-3 py-1 rounded-full">
                    <span>{weddingData.invitation.date}</span>
                </div>
            </div>

            
            <div className="mt-auto mb-4 flex gap-6 sm:gap-10 text-[#D4A529]">
                <div className="flex flex-col items-center gap-1 opacity-70">
                    <span className="text-xl">📅</span>
                    <span className="text-[8px] uppercase tracking-wider text-[#8B1A2B]">Wedding</span>
                </div>
                <div className="flex flex-col items-center gap-1 opacity-70">
                    <span className="text-xl">🍾</span>
                    <span className="text-[8px] uppercase tracking-wider text-[#8B1A2B]">Reception</span>
                </div>
                <div className="flex flex-col items-center gap-1 opacity-70">
                    <span className="text-xl">📍</span>
                    <span className="text-[8px] uppercase tracking-wider text-[#8B1A2B]">Venue</span>
                </div>
                <div className="flex flex-col items-center gap-1 opacity-70">
                    <span className="text-xl">✉️</span>
                    <span className="text-[8px] uppercase tracking-wider text-[#8B1A2B]">RSVP</span>
                </div>
            </div>
        </motion.div>
    );
}
