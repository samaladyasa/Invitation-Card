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

    const lenis = lenisRef.current?.lenis;
    if (lenis) {
      const scrollHandler = () => {
        try {
          ScrollTrigger.update();
        } catch (e) {}
      };
      lenis.on("scroll", scrollHandler);
      return () => {
        lenis.off("scroll", scrollHandler);
      };
    }
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
      lenisRef.current?.lenis?.resize?.();
    });
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
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
        overscroll: false,
      }}
    >
      <div
        className="app-home-wrapper"
        style={{
          minHeight: scratched ? "auto" : "100vh",
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
