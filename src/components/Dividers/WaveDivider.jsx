export default function WaveDivider({ flip = false }) {
    return (
        <div className="relative w-full z-20 pointer-events-none" style={{ height: "0px" }}>
            <div className={`absolute left-0 w-full leading-[0] -translate-y-1/2 ${flip ? "rotate-180" : ""}`} style={{ height: "60px" }}>
                <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="block w-full h-full" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.15))' }}>
                    <path d="M0,30 C240,50 480,10 720,30 C960,50 1200,10 1440,30" fill="none" stroke="#D4A529" strokeWidth="2.5" opacity="0.8" />
                    <path d="M0,35 C240,55 480,15 720,35 C960,55 1200,15 1440,35" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.5" />
                </svg>
            </div>
        </div>
    );
}
