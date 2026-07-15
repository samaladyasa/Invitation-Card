import React, { useEffect, useRef, useState } from "react";

export default function Intro({ envelopeOpened, onEnvelopeOpened }) {
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setVideoReady(true);
    const handleError = () => setVideoReady(false);

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    if (video.readyState >= 2) {
      setVideoReady(true);
    }

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[5] transition-opacity duration-1000 overflow-hidden bg-black ${envelopeOpened ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1f1213] via-[#3b2528] to-[#0d0a0a]" />
      {!videoReady && (
        <div className="absolute inset-0 flex items-center justify-center text-white/80 text-sm tracking-[0.3em] uppercase">
          Loading experience...
        </div>
      )}
      <video
        ref={videoRef}
        src="https://res.cloudinary.com/abbjs8kr/video/upload/v1783839994/envelope_design_1__compressed_kwthd2.mp4"
        autoPlay
        playsInline
        muted
        preload="metadata"
        onEnded={onEnvelopeOpened}
        className={`absolute inset-0 h-full w-full object-cover pointer-events-none transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
        style={{ objectPosition: '52.5% center' }}
      />
    </div>
  );
}
