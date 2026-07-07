import HeroBackground from "../Background/HeroBackground";
import HeroParticles from "./HeroParticles";
import HeroDecorations from "./HeroDecorations";
import HeroContent from "./HeroContent";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden"
    >
      <HeroBackground />
      <HeroParticles />
      <HeroDecorations />
      <HeroContent />
    </section>
  );
}