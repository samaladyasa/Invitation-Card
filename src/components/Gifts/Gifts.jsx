import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import ScrollReveal from "../ScrollReveal";
import { Gift } from "lucide-react";

export default function Gifts() {
  const canvasRef = useRef(null);
  const cardRef = useRef(null);
  const themeColors = useRef({});
  const drawing = useRef(false);
  const revealed = useRef(false);
  const lastPoint = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const c = canvasRef.current;
    const card = cardRef.current;
    const ctx = c.getContext("2d");
    const { width, height } = card.getBoundingClientRect();
    c.width = width;
    c.height = height;

    const root = getComputedStyle(document.documentElement);
    const c1 = root.getPropertyValue("--accent-pink-2") || "#B22234";
    const c2 = root.getPropertyValue("--accent-pink") || "#DC3545";
    const c3 = root.getPropertyValue("--accent-pink-2") || "#D4A529";
    const c4 = root.getPropertyValue("--bg-mid") || "#8B1A2B";
    const warm = root.getPropertyValue("--accent-warm") || "#FF9933";
    themeColors.current = {
      c1: c1.trim(),
      c2: c2.trim(),
      c3: c3.trim(),
      c4: c4.trim(),
      warm: warm.trim(),
    };

    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, c1.trim());
    g.addColorStop(0.3, c2.trim());
    g.addColorStop(0.65, c3.trim());
    g.addColorStop(1, c4.trim());
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 80; i += 1) {
      ctx.fillStyle = "rgba(212,165,41,.15)";
      ctx.fillRect(Math.random() * width, Math.random() * height, Math.random() * 60 + 20, 1);
    }

    ctx.fillStyle = "rgba(212,165,41,0.4)";
    ctx.font = "12px Poppins, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Scratch here", width / 2, height / 2);
  }, []);

  const point = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    const p = e.touches ? e.touches[0] : e;
    return { x: p.clientX - r.left, y: p.clientY - r.top };
  };

  const scratch = (e) => {
    if (!drawing.current || revealed.current) return;
    e.preventDefault();

    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    const { x, y } = point(e);

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 44;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (lastPoint.current) {
      ctx.beginPath();
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 24, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPoint.current = { x, y };
    ctx.globalCompositeOperation = "source-over";

    const img = ctx.getImageData(0, 0, c.width, c.height).data;
    let clear = 0;
    for (let i = 3; i < img.length; i += 4) {
      if (img[i] < 20) clear += 1;
    }

    if ((clear / (img.length / 4)) * 100 > 20) {
      revealed.current = true;
      setShow(true);
      c.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 500, fill: "forwards" }
      );

      const { c1: _c1, c3: _c3, c4: _c4, warm: _warm } = themeColors.current || {};
      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: [_c3 || "#D4A529", _c1 || "#B22234", _warm || "#FF9933"],
        });
        confetti({
          particleCount: 40,
          spread: 100,
          scalar: 0.7,
          startVelocity: 25,
          origin: { y: 0.6 },
          colors: [_c3 || "#D4A529", _c4 || "#8B1A2B", _warm || "#FF9933"],
        });
      } catch (err) {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      }
    }
  };

  return (
    <ScrollReveal>
      <section className="py-20 px-5" style={{ backgroundColor: "var(--bg-deep)" }}>
        <div className="max-w-md mx-auto text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full px-7 py-2 text-xs uppercase tracking-[4px] shadow"
            style={{
              border: "1px solid rgba(0,0,0,0.06)",
              background: "linear-gradient(90deg, rgba(255,192,203,0.04), rgba(255,255,255,0))",
              color: "var(--accent-pink)",
              boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
              backdropFilter: "blur(2px)",
            }}
          >
            <Gift size={14} /> Gifts
          </span>
          <h2 className="mt-5 font-heading text-3xl" style={{ color: "var(--text-primary)" }}>
            A Little Surprise
          </h2>
          <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
            Scratch the card below.
          </p>

          <div
            ref={cardRef}
            className="relative mt-8 h-56 rounded-3xl shadow-xl overflow-hidden"
            style={{
              border: "1px solid rgba(212,165,41,0.12)",
              background: "linear-gradient(to bottom, var(--bg-mid), var(--bg-deep))",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
              <div className={`transition-all duration-500 ${show ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                <p className="text-xs uppercase tracking-[4px]" style={{ color: "var(--accent-pink-2)" }}>
                  Thank You
                </p>
                <h3 className="mt-3 font-heading text-3xl leading-snug" style={{ color: "var(--text-primary)" }}>
                  Your presence
                  <br />
                  is the greatest gift.
                </h3>
                <p className="mt-4 text-sm" style={{ color: "var(--text-secondary)" }}>
                  We can't wait to celebrate with you.
                </p>
              </div>
            </div>
            <canvas
              ref={canvasRef}
              className="absolute inset-0 cursor-pointer touch-none"
              onMouseDown={(e) => {
                drawing.current = true;
                lastPoint.current = null;
                scratch(e);
              }}
              onMouseMove={scratch}
              onMouseUp={() => {
                drawing.current = false;
                lastPoint.current = null;
              }}
              onMouseLeave={() => {
                drawing.current = false;
                lastPoint.current = null;
              }}
              onTouchStart={(e) => {
                drawing.current = true;
                lastPoint.current = null;
                scratch(e);
              }}
              onTouchMove={scratch}
              onTouchEnd={() => {
                drawing.current = false;
                lastPoint.current = null;
              }}
              onTouchCancel={() => {
                drawing.current = false;
                lastPoint.current = null;
              }}
            />
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
