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

    html.style.overflow = "auto";
    html.style.overflowX = "hidden";
    html.style.height = "auto";
    html.style.position = "";
    html.style.top = "";
    html.style.left = "";
    html.style.width = "";
    html.style.touchAction = "auto";
    html.style.overscrollBehavior = "auto";

    body.style.overflow = "auto";
    body.style.overflowX = "hidden";
    body.style.height = "auto";
    body.style.position = "";
    body.style.top = "";
    body.style.left = "";
    body.style.width = "";
    body.style.touchAction = "auto";
    body.style.overscrollBehavior = "auto";

    if (!scratched) {
      window.scrollTo(0, 0);
    }

    if (lenisRef.current) {
      if (scratched) {
        lenisRef.current.start?.();
      } else {
        lenisRef.current.stop?.();
      }
    }
  }, [scratched]);

  useLenis(ScrollTrigger.update);

  useEffect(() => {
    gsap.ticker.lagSmoothing(0);
  }, []);

  // Anchor/link handling for clicks and touch on mobile
  useEffect(() => {
    let lastTouchHandled = 0;

    const onAnchorClick = (e) => {
      // ignore clicks immediately after a touch handled the same action
      if (Date.now() - lastTouchHandled < 700) return;
      try {
        const anchor = e.target.closest && e.target.closest('a');
        if (!anchor) return;
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;

        // Hash link
        if (href.startsWith('#')) {
          const id = href.replace(/^#/, '');
          const el = document.getElementById(id);
          if (!el) return;
          e.preventDefault();
          const top = el.getBoundingClientRect().top + window.pageYOffset;

          const html = document.documentElement;
          const body = document.body;
          const isLocked = html.style.position === 'fixed' || html.style.overflow === 'hidden' || body.style.overflow === 'hidden';

          const restoreLock = () => {
            try {
              html.style.overflow = 'hidden';
              body.style.overflow = 'hidden';
              html.style.position = 'fixed';
              body.style.position = 'fixed';
              html.style.top = '0';
              body.style.top = '0';
              html.style.left = '0';
              body.style.left = '0';
              html.style.width = '100%';
              body.style.width = '100%';
              html.style.height = '100vh';
              body.style.height = '100vh';
              html.style.overscrollBehavior = 'none';
              body.style.overscrollBehavior = 'none';
              html.style.touchAction = 'none';
              body.style.touchAction = 'none';
            } catch (err) {}
            try { lenisRef.current?.stop?.(); } catch(_){}
          };

          if (isLocked) {
            try {
              html.style.overflow = 'auto';
              body.style.overflow = 'auto';
              html.style.position = '';
              body.style.position = '';
              html.style.height = '';
              body.style.height = '';
              html.style.overscrollBehavior = 'auto';
              body.style.overscrollBehavior = 'auto';
              html.style.touchAction = 'auto';
              body.style.touchAction = 'auto';
            } catch (err) {}
            try { lenisRef.current?.start?.(); } catch(_){}

            window.scrollTo({ top, behavior: 'smooth' });
            setTimeout(() => restoreLock(), 700);
            return;
          }

          if (lenisRef.current && typeof lenisRef.current.scrollTo === 'function') {
            try { lenisRef.current.scrollTo(el); return; } catch (_) {}
            try { lenisRef.current.scrollTo(`#${id}`); return; } catch (_) {}
            try { lenisRef.current.scrollTo(top); return; } catch (_) {}
          }

          window.scrollTo({ top, behavior: 'smooth' });
          return;
        }

        // External link: open to ensure navigation on mobile
        try {
          const absoluteHref = anchor.href;
          if (anchor.target === '_blank' || new URL(absoluteHref).origin !== window.location.origin) {
            e.preventDefault();
            window.open(absoluteHref, anchor.target || '_blank');
            return;
          }
        } catch (err) {
          // ignore
        }
      } catch (err) {
        // ignore
      }
    };

    const onAnchorTouchEnd = (e) => {
      try {
        const anchor = e.target.closest && e.target.closest('a');
        if (!anchor) return;
        lastTouchHandled = Date.now();
        onAnchorClick({ target: anchor, preventDefault: () => e.preventDefault(), defaultPrevented: false });
      } catch (err) {}
    };

    const debugClick = (e) => {
      try {
        const a = e.target.closest && e.target.closest('a');
        if (!a) return;
        console.debug('[anchor-debug] href=', a.getAttribute('href'), 'defaultPrevented=', e.defaultPrevented);
        let node = a;
        while (node) {
          try {
            const style = window.getComputedStyle(node);
            console.debug('[anchor-debug] node=', node.tagName, 'id=', node.id || '', 'class=', node.className || '', 'pointerEvents=', style.pointerEvents, 'zIndex=', style.zIndex);
          } catch (err) {}
          node = node.parentElement;
        }
      } catch (err) {}
    };

    document.addEventListener('click', onAnchorClick, true);
    document.addEventListener('touchend', onAnchorTouchEnd, true);
    document.addEventListener('click', debugClick, true);

    return () => {
      document.removeEventListener('click', onAnchorClick, true);
      document.removeEventListener('touchend', onAnchorTouchEnd, true);
      document.removeEventListener('click', debugClick, true);
    };
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
          height: scratched ? "auto" : "100dvh",
          overflow: scratched ? "visible" : "hidden",
          touchAction: scratched ? "auto" : "none",
          position: scratched ? "static" : "fixed",
          inset: scratched ? undefined : 0,
          width: scratched ? undefined : "100%",
          zIndex: scratched ? undefined : 0,
          overscrollBehavior: scratched ? "auto" : "none",
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
