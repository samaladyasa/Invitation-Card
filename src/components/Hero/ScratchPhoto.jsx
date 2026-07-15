import { useLayoutEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

export default function ScratchPhoto({ onScratchComplete }) {
    const canvasRef = useRef(null);
    const confettiCanvasRef = useRef(null);
    const [isScratched, setIsScratched] = useState(false);
    const [isDrawing, setIsDrawing] = useState(false);


    useLayoutEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const preventTouchScrollOnCanvas = (e) => {
            if (e.cancelable) {
                e.preventDefault();
            }
        };

        canvas.addEventListener('touchstart', preventTouchScrollOnCanvas, { passive: false, capture: true });
        canvas.addEventListener('touchmove', preventTouchScrollOnCanvas, { passive: false, capture: true });
        canvas.addEventListener('touchend', preventTouchScrollOnCanvas, { passive: false, capture: true });
        canvas.addEventListener('touchcancel', preventTouchScrollOnCanvas, { passive: false, capture: true });

        const ctx = canvas.getContext("2d", { willReadFrequently: true });

        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        canvas.style.touchAction = 'none';

        // Do not disable page scroll on mount — only lock when the user starts scratching.

        const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
        gradient.addColorStop(0, "#D9A897");
        gradient.addColorStop(0.25, "#F7D8D0");
        gradient.addColorStop(0.5, "#C89585");
        gradient.addColorStop(0.75, "#F7D8D0");
        gradient.addColorStop(1, "#D9A897");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, rect.width, rect.height);

        for (let i = 0; i < 4000; i++) {
            ctx.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.25)" : "rgba(100,50,0,0.15)";
            ctx.fillRect(
                Math.random() * rect.width,
                Math.random() * rect.height,
                2, 2
            );
        }

        return () => {
            canvas.removeEventListener('touchstart', preventTouchScrollOnCanvas);
            canvas.removeEventListener('touchmove', preventTouchScrollOnCanvas);
            canvas.removeEventListener('touchend', preventTouchScrollOnCanvas);
            canvas.removeEventListener('touchcancel', preventTouchScrollOnCanvas);
        };
    }, []);

    let pointerLocked = false;

    function handlePointerDown(e) {
        if (isScratched) return;
        pointerLocked = true;
        setIsDrawing(true);
        e.currentTarget?.setPointerCapture?.(e.pointerId);
        scratch(e);
    }

    function handlePointerUp(e) {
        setIsDrawing(false);
        pointerLocked = false;
        checkCompletion();
        e.currentTarget?.releasePointerCapture?.(e.pointerId);
    }

    function handlePointerMove(e) {
        if (!isDrawing || isScratched) return;
        scratch(e);
    }

    function handlePointerCancel() {
        setIsDrawing(false);
        pointerLocked = false;
        checkCompletion();
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
        ctx.arc(x, y, 65, 0, 2 * Math.PI);
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

        if (percentage > 22) {
            completeReveal();
        }
    }

    function completeReveal() {
        setIsScratched(true);
        onScratchComplete?.();

        if (canvasRef.current) {
            canvasRef.current.style.transition = "opacity 0.8s ease-out";
            canvasRef.current.style.opacity = "0";
            canvasRef.current.style.pointerEvents = "none";
        }

        if (confettiCanvasRef.current) {
            const myConfetti = confetti.create(confettiCanvasRef.current, {
                useWorker: true
            });

            myConfetti({
                particleCount: 200,
                angle: 90,
                spread: 120,
                origin: { x: 0.5, y: 1.1 },
                startVelocity: 20,
                gravity: 0.04,
                drift: 0,
                colors: ["#FFFFFF"],
                shapes: ["circle"],
                disableForReducedMotion: true,
                scalar: 0.5,
                ticks: 2000
            });

            setTimeout(() => {
                onScratchComplete?.();
            }, 500);
        }
    }

    return (
        <div
            className="relative mx-auto mt-8 mb-6 w-[240px] h-[160px] sm:w-[280px] sm:h-[180px] rounded-[50%] overflow-hidden shadow-inner border-[3px] border-[#C89585]"
            style={{ background: "#F5EFE6", zIndex: 30 }}
        >
            { }
            <div className="absolute inset-0 bg-[#E8D4C8] flex items-center justify-center">
                { }
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUsRcvC6C0sDaliuJghwTyPSVs7tEJbUZhzw6fstL_fY6Q_lMhzKlPP7oa&s=10"
                    alt="Couple"
                    loading="eager"
                    className="w-full h-full object-cover"
                />
            </div>

            { }
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full cursor-pointer touch-none z-10"
                style={{ touchAction: 'none' }}
                onPointerDown={(e) => {
                    handlePointerDown(e);
                }}
                onPointerUp={(e) => {
                    handlePointerUp(e);
                }}
                onPointerMove={(e) => {
                    handlePointerMove(e);
                }}
                onPointerLeave={(e) => {
                    handlePointerCancel();
                }}
                // touch events are handled by native listeners added in useLayoutEffect
                onTouchStart={(e) => {
                    handlePointerDown(e);
                }}
                onTouchMove={(e) => {
                    handlePointerMove(e);
                }}
                onTouchEnd={(e) => {
                    handlePointerUp(e);
                }}
                onTouchCancel={(e) => {
                    handlePointerCancel();
                }}
            />

            <canvas
                ref={confettiCanvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
            />
        </div>
    );
}
