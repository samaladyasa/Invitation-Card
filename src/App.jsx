import { useState, useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
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
      root
      ref={lenisRef}
      autoRaf={false}
      options={{
        lerp: 0.05,
        smoothWheel: true,
        syncTouch: true,
      }}
    >
      <div
        className="app-home-wrapper"
        style={{
          height: scratched ? "auto" : "100vh",
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
