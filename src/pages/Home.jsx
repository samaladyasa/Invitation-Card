import Hero from "../components/Hero/Hero";
import Countdown from "../components/Countdown/Countdown";
import Events from "../components/Events/Events";
import Venue from "../components/Venue/Venue";
import Gallery from "../components/Gallery/Gallery";
import Gifts from "../components/Gifts/Gifts";
import Footer from "../components/Footer/Footer";
import WaveDivider from "../components/Dividers/WaveDivider";
import FallingPetals from "../components/Background/FallingPetals";

export default function Home({ scratched, onScratched, envelopeOpened }) {
  return (
    <div className="relative overflow-x-hidden animate-fade-in-slow" style={{ color: 'var(--text-primary)' }}>
      <FallingPetals />
      {}
      <Hero scratched={scratched} onScratched={onScratched} envelopeOpened={envelopeOpened} />

      {}
      <div style={{
        opacity: scratched ? 1 : 0,
        transform: scratched ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 2s ease 1s, transform 2s ease 1s",
        pointerEvents: scratched ? "auto" : "none"
      }}>
        <WaveDivider />
        <Countdown />
        <WaveDivider flip />
        <Gifts />
        <WaveDivider />
        <Events />
        <WaveDivider flip />
        <Gallery />
        <WaveDivider />
        <Venue />
        <WaveDivider flip />
        <Footer />
      </div>
    </div>
  );
}