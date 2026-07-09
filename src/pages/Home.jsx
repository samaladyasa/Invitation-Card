import AnimatedBackground from "../components/Background/AnimatedBackground";
import Hero from "../components/Hero/Hero";
import Countdown from "../components/Countdown/Countdown";
import Events from "../components/Events/Events";
import Venue from "../components/Venue/Venue";
import Gallery from "../components/Gallery/Gallery";
import Gifts from "../components/Gifts/Gifts";
import Footer from "../components/Footer/Footer";
import WaveDivider from "../components/Dividers/WaveDivider";

function Home() {
  return (
    <div className="relative overflow-x-hidden animate-fade-in-slow" style={{ backgroundColor: 'var(--bg-deep)', color: 'var(--text-primary)' }}>
      <AnimatedBackground />
      <Hero />
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
  );
}

export default Home;