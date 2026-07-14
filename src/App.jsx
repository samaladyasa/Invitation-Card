import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { ReactLenis, useLenis } from "lenis/react";
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

  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const preventScroll = (e) => {
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    const preventKeyScroll = (e) => {
      const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "PageUp", "PageDown", "Home", "End", "Space"];
      if (keys.includes(e.code) || keys.includes(e.key)) {
        e.preventDefault();
      }
    };

    if (scratched) {
      window.removeEventListener("wheel", preventScroll, { capture: true });
      window.removeEventListener("scroll", preventScroll, { capture: true });
      window.removeEventListener("touchstart", preventScroll, { capture: true });
      window.removeEventListener("touchmove", preventScroll, { capture: true });
      window.removeEventListener("touchend", preventScroll, { capture: true });
      window.removeEventListener("touchcancel", preventScroll, { capture: true });
      window.removeEventListener("keydown", preventKeyScroll, { capture: true });

      html.style.overflow = "auto";
      body.style.overflow = "auto";
      html.style.position = "";
      body.style.position = "";
      html.style.top = "";
      body.style.top = "";
      html.style.left = "";
      body.style.left = "";
      html.style.width = "";
      body.style.width = "";
      html.style.height = "";
      body.style.height = "";
      html.style.overscrollBehavior = "auto";
      body.style.overscrollBehavior = "auto";
      html.style.touchAction = "auto";
      body.style.touchAction = "auto";
    } else {
      window.scrollTo(0, 0);
      window.addEventListener("wheel", preventScroll, { passive: false, capture: true });
      window.addEventListener("scroll", preventScroll, { passive: false, capture: true });
      window.addEventListener("touchstart", preventScroll, { passive: false, capture: true });
      window.addEventListener("touchmove", preventScroll, { passive: false, capture: true });
      window.addEventListener("touchend", preventScroll, { passive: false, capture: true });
      window.addEventListener("touchcancel", preventScroll, { passive: false, capture: true });
      window.addEventListener("keydown", preventKeyScroll, { passive: false, capture: true });

      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      html.style.position = "fixed";
      body.style.position = "fixed";
      html.style.top = "0";
      body.style.top = "0";
      html.style.left = "0";
      body.style.left = "0";
      html.style.width = "100%";
      body.style.width = "100%";
      html.style.height = "100vh";
      body.style.height = "100vh";
      html.style.overscrollBehavior = "none";
      body.style.overscrollBehavior = "none";
      html.style.touchAction = "none";
      body.style.touchAction = "none";
    }

    if (lenisRef.current) {
      if (scratched) {
        lenisRef.current.start?.();
      } else {
        lenisRef.current.stop?.();
      }
    }

    return () => {
      window.removeEventListener("wheel", preventScroll, { capture: true });
      window.removeEventListener("touchstart", preventScroll, { capture: true });
      window.removeEventListener("touchmove", preventScroll, { capture: true });
      window.removeEventListener("touchend", preventScroll, { capture: true });
      window.removeEventListener("touchcancel", preventScroll, { capture: true });
      window.removeEventListener("keydown", preventKeyScroll, { capture: true });
    };
  }, [scratched]);

  useLenis(ScrollTrigger.update);

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);
  }, []);



  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={true}
      options={{
        lerp: 0.08,
        smoothWheel: true,
        smoothTouch: true,
        syncTouch: false,
        touchMultiplier: 1,
        orientation: "vertical",
        overscroll: false,
      }}
    >
      <div
        className="app-home-wrapper"
        style={{
          height: scratched ? "auto" : "100vh",
          overflow: scratched ? "visible" : "hidden",
          touchAction: scratched ? "auto" : "none",
          position: scratched ? "static" : "fixed",
          inset: scratched ? undefined : 0,
          width: scratched ? undefined : "100%",
          zIndex: scratched ? undefined : 0,
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
