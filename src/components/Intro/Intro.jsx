import React from "react";

export default function Intro({ envelopeOpened, onEnvelopeOpened }) {
  return (
    <div
      className={`fixed inset-0 z-[9999] transition-opacity duration-1000 overflow-hidden bg-black ${envelopeOpened ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
    >
      <video
        src="/envelope_design.mp4"
        autoPlay
        playsInline
        muted
        onEnded={onEnvelopeOpened}
        className="w-full h-full object-cover"
        style={{ objectPosition: '52.5% center' }}
      />
    </div>
  );
}
