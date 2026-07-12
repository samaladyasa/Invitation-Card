import HeroBackground from "../Background/HeroBackground";
import HeroContent from "./HeroContent";

export default function Hero({ scratched, onScratched, envelopeOpened }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden"
    >
      {envelopeOpened && (
        <>
          <HeroBackground />
        </>
      )}
      <HeroContent scratched={scratched} onScratched={onScratched} />
    </section>
  );
}