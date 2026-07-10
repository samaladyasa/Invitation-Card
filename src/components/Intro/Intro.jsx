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
  const CURTAIN_FADE_DURATION_MS = 4500;

  useEffect(() => {
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    if (containerRef.current) {
      containerRef.current.classList.remove("intro--fading");
      containerRef.current.style.pointerEvents = "auto";
    }

    return () => {
      if (cleanupTimerRef.current) window.clearTimeout(cleanupTimerRef.current);
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

    if (containerRef.current) {
      containerRef.current.classList.add("intro--fading");
    }

    try {
      onRevealStart?.();
    } catch (e) {}

    cleanupTimerRef.current = window.setTimeout(() => onFinish?.(), CURTAIN_FADE_DURATION_MS);
  }

  function startIntro() {
    if (startedRef.current) return;
    startedRef.current = true;

    const vid = videoRef.current;
    const btn = buttonRef.current;
    if (btn) {
      try {
        btn.classList.add("play-hidden");
      } catch (e) {}
    }
    if (!vid) {
      fadeOutAndFinish();
      return;
    }

    try {
      vid.currentTime = 0;
    } catch (e) {}

    const playPromise = vid.play?.();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise.catch(() => {
        cleanupTimerRef.current = window.setTimeout(fadeOutAndFinish, 1200);
      });
    }

    vid.onended = () => {
      fadeOutAndFinish();
    };

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

    cleanupTimerRef.current = window.setTimeout(fadeOutAndFinish, 7000);
  }

  return (
    <div
      ref={containerRef}
      className="intro-overlay fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(255, 239, 243, 0.55)" }}
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
