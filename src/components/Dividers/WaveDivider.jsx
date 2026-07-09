export default function WaveDivider({ flip = false }) {
    return (
        <div className={`relative w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`} style={{ height: "60px", marginTop: "-1px", marginBottom: "-1px" }}>
            <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="block w-full h-full">
                <path d="M0,30 C240,50 480,10 720,30 C960,50 1200,10 1440,30 L1440,60 L0,60 Z" fill="var(--bg-deep)" />
                <path d="M0,35 C240,55 480,15 720,35 C960,55 1200,15 1440,35 L1440,60 L0,60 Z" fill="var(--bg-mid)" opacity="0.3" />
            </svg>
        </div>
    );
}
