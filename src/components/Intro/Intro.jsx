import React, { useEffect, useRef, useState } from "react";

export default function Intro({ envelopeOpened, onEnvelopeOpened }) {
  const videoRef = useRef(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleError = () => setVideoFailed(true);
    const startVideo = () => setShouldPlayVideo(true);

    video.addEventListener("error", handleError);
    window.addEventListener("pointerdown", startVideo, { once: true });
    window.addEventListener("touchstart", startVideo, { once: true });

    return () => {
      video.removeEventListener("error", handleError);
      window.removeEventListener("pointerdown", startVideo);
      window.removeEventListener("touchstart", startVideo);
    };
  }, []);

  useEffect(() => {
    if (!shouldPlayVideo || !videoRef.current) return;

    const video = videoRef.current;
    const handleComplete = () => {
      onEnvelopeOpened?.();
    };

    const timer = window.setTimeout(handleComplete, 4000);

    video.play().catch(() => {
      setVideoFailed(true);
      handleComplete();
    });

    return () => {
      window.clearTimeout(timer);
    };
  }, [shouldPlayVideo, onEnvelopeOpened]);

  return (
    <div
      className={`fixed inset-0 z-[5] transition-opacity duration-1000 overflow-hidden bg-black ${envelopeOpened ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
    >
      {videoFailed && (
        <div className="absolute inset-0 flex items-center justify-center text-white/80 text-sm tracking-[0.3em] uppercase">
          .
        </div>
      )}
      <video
        ref={videoRef}
        src="https://res.cloudinary.com/abbjs8kr/video/upload/v1783839994/envelope_design_1__compressed_kwthd2.mp4"
        playsInline
        muted
        preload="metadata"
        onEnded={onEnvelopeOpened}
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        style={{ objectPosition: '52.5% center' }}
      />
    </div>
  );
}
