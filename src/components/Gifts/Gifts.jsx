import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import ScrollReveal from "../ScrollReveal";

export default function Gifts() {
  const canvasRef = useRef(null);
  const cardRef = useRef(null);
  const drawing = useRef(false);
  const revealed = useRef(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const c = canvasRef.current;
    const card = cardRef.current;
    const ctx = c.getContext("2d");

    const { width, height } = card.getBoundingClientRect();
    c.width = width;
    c.height = height;

    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, "#fff7c2");
    g.addColorStop(0.3, "#f6d365");
    g.addColorStop(0.65, "#d4af37");
    g.addColorStop(1, "#ffe9a3");

    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 80; i++) {
      ctx.fillStyle = "rgba(255,255,255,.12)";
      ctx.fillRect(
        Math.random() * width,
        Math.random() * height,
        Math.random() * 60 + 20,
        1
      );
    }
  }, []);

  const point = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    const p = e.touches ? e.touches[0] : e;
    return { x: p.clientX - r.left, y: p.clientY - r.top };
  };

  const scratch = (e) => {
    if (!drawing.current || revealed.current) return;

    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    const { x, y } = point(e);

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 42, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";

    const img = ctx.getImageData(0, 0, c.width, c.height).data;
    let clear = 0;

    for (let i = 3; i < img.length; i += 4)
      if (img[i] < 20) clear++;

    if ((clear / (img.length / 4)) * 100 > 30) {
      revealed.current = true;
      setShow(true);

      c.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 500, fill: "forwards" }
      );

      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#000000"],
      });

      confetti({
        particleCount: 40,
        spread: 100,
        scalar: 0.7,
        startVelocity: 25,
        origin: { y: 0.6 },
        colors: ["#d4af37", "#f6d365", "#ffe9a3"],
      });
    }
  };

  return (
    <ScrollReveal>
      <section className="bg-[#FFF8F2] py-20 px-5">
        <div className="max-w-md mx-auto text-center">

          <span className="inline-block rounded-full bg-[#B76E79] px-7 py-2 text-xs uppercase tracking-[4px] text-white shadow">
            Gifts
          </span>

          <h2 className="mt-5 font-serif text-3xl text-[#5E4C4C]">
            A Little Surprise
          </h2>

          <p className="mt-3 text-[#7A6C6C]">
            Scratch the golden card below.
          </p>

          <div
            ref={cardRef}
            className="relative mt-8 h-56 rounded-3xl bg-white shadow-xl overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
                            <div
                className={`transition-all duration-500 ${
                  show ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              >
                <p className="text-xs uppercase tracking-[4px] text-[#B76E79]">
                  Thank You
                </p>

                <h3 className="mt-3 font-serif text-3xl text-[#5E4C4C] leading-snug">
                  Your presence
                  <br />
                  is the greatest gift.
                </h3>

                <p className="mt-4 text-sm text-[#7A6C6C]">
                  We can't wait to celebrate with you.
                </p>
              </div>
            </div>

            <canvas
              ref={canvasRef}
              className="absolute inset-0 cursor-pointer touch-none"
              onMouseDown={(e) => {
                drawing.current = true;
                scratch(e);
              }}
              onMouseMove={scratch}
              onMouseUp={() => (drawing.current = false)}
              onMouseLeave={() => (drawing.current = false)}
              onTouchStart={(e) => {
                drawing.current = true;
                scratch(e);
              }}
              onTouchMove={scratch}
              onTouchEnd={() => (drawing.current = false)}
            />
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}