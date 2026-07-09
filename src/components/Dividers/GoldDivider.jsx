import { Sparkles } from "lucide-react";

export default function GoldDivider({ className = "" }) {
    return (
        <div className={`flex items-center justify-center gap-3 ${className}`}>
            <span className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, rgba(212,165,41,0.12))' }} />
            <Sparkles size={14} style={{ color: 'var(--accent-pink-2)', opacity: 0.5 }} />
            <span className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, rgba(212,165,41,0.12))' }} />
        </div>
    );
}
