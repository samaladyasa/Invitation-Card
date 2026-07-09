import { useEffect, useRef } from "react";
import { Play } from "lucide-react";

const INTRO_VIDEO =
  "https://res.cloudinary.com/t7dfiv9t/video/upload/v1783591373/st_image_is_starting_frame_an_online-video-cutter.com_u9rvmj.mp4";

export default function Intro({ onFinish, fadeAtSeconds = 1.0, onRevealStart }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const buttonRef = useRef(null);
  const startedRef = useRef(false);
  const finishedRef = useRef(false);
  const cleanupTimerRef = useRef(null);
  const timeUpdateHandlerRef = useRef(null);

  // Keep the page locked while intro is visible
  useEffect(() => {
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Ensure overlay fully covers the page on initial paint (no bleeding)
    if (containerRef.current) {
      containerRef.current.classList.remove("intro--fading");
      containerRef.current.style.backgroundColor = "var(--bg-base)";
      containerRef.current.style.pointerEvents = "auto";
    }

    return () => {
      if (cleanupTimerRef.current) window.clearTimeout(cleanupTimerRef.current);
      // remove any attached handlers
      const vid = videoRef.current;
      if (vid) {
        try {
          if (timeUpdateHandlerRef.current)
            vid.removeEventListener("timeupdate", timeUpdateHandlerRef.current);
          vid.onended = null;
        } catch (e) {}
      }
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, []);

  function fadeOutAndFinish() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    // notify parent that reveal is starting so the home can begin fading in
    try {
      onRevealStart?.();
    } catch (e) {}

    if (containerRef.current) {
      containerRef.current.classList.add("intro--fading");
    }
    const FADE_DURATION = 1200;
    cleanupTimerRef.current = window.setTimeout(() => onFinish?.(), FADE_DURATION);
  }

  function startIntro() {
    if (startedRef.current) return;
    startedRef.current = true;

    const vid = videoRef.current;
    const btn = buttonRef.current;
    // hide button immediately on click (CSS transition)
    if (btn) {
      try {
        btn.classList.add("play-hidden");
      } catch (e) {}
    }
    if (!vid) {
      // fallback
      fadeOutAndFinish();
      return;
    }

    // Ensure video starts from the first frame and plays only after user interaction
    try {
      vid.currentTime = 0;
    } catch (e) {}

    const playPromise = vid.play?.();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.catch(() => {
        // ignore play errors (autoplay policies) — still proceed with fade after a short delay
        cleanupTimerRef.current = window.setTimeout(fadeOutAndFinish, 1200);
      });
    }

    // When the video ends, fade the overlay to reveal the page
    vid.onended = () => {
      fadeOutAndFinish();
    };

    // Begin fading a bit earlier while video still plays (configurable via prop)
    const FADE_TRIGGER_SECONDS = Number(fadeAtSeconds) || 1.0;
    function onTimeUpdate() {
      try {
        if (vid.currentTime >= FADE_TRIGGER_SECONDS) {
          if (timeUpdateHandlerRef.current) vid.removeEventListener("timeupdate", timeUpdateHandlerRef.current);
          fadeOutAndFinish();
        }
      } catch (e) {}
    }
    timeUpdateHandlerRef.current = onTimeUpdate;
    vid.addEventListener("timeupdate", onTimeUpdate);

    // Safety: if video doesn't fire ended, fade after MAX duration
    cleanupTimerRef.current = window.setTimeout(fadeOutAndFinish, 7000);
  }

  return (
    <div
      ref={containerRef}
      className="intro-overlay fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: "var(--bg-base)" }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={INTRO_VIDEO}
        muted
        playsInline
        preload="auto"
        aria-hidden
      />

      <button
        ref={buttonRef}
        onClick={startIntro}
        aria-label="Open invitation"
        className="play-button relative z-20 rounded-full shadow-lg"
        style={{
          backdropFilter: "blur(6px)",
          backgroundColor: 'rgba(255,248,249,0.28)',
          border: '1px solid var(--border-accent)'
        }}
      >
        <Play color="var(--accent-pink-2)" strokeWidth={1.5} size={34} />
      </button>
    </div>
  );
}
