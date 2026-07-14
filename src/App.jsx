import { useState, useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Intro from "./components/Intro/Intro";
import Home from "./pages/Home";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [introUnmounted, setIntroUnmounted] = useState(false);
  const [scratched, setScratched] = useState(false);
  const lenisRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = scratched ? "auto" : "hidden";
    document.documentElement.style.overflow = scratched ? "auto" : "hidden";
  }, [scratched]);

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);

    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
      try {
        ScrollTrigger.update();
      } catch (e) {}
    }

    gsap.ticker.add(update);
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root="asChild"
      ref={lenisRef}
      autoRaf={true}
      options={{
        lerp: 0.08,
        smoothWheel: true,
        syncTouch: true,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        overscroll: false,
        autoResize: true,
      }}
    >
      <div
        className="app-home-wrapper"
        style={{
          minHeight: "100vh",
          overflow: scratched ? "visible" : "hidden",
        }}
      >
        <Home scratched={scratched} onScratched={() => setScratched(true)} envelopeOpened={envelopeOpened} />
      </div>

      {!introUnmounted && (
        <Intro
          envelopeOpened={envelopeOpened}
          onEnvelopeOpened={() => {
            setEnvelopeOpened(true);
            setTimeout(() => setIntroUnmounted(true), 1000);
          }}
        />
      )}
    </ReactLenis>
  );
}
