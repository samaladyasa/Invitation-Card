import AnimatedBackground from "../components/Background/AnimatedBackground";

import Hero from "../components/Hero/Hero";
import Countdown from "../components/Countdown/Countdown";
import Story from "../components/Story/Story";
import Events from "../components/Events/Events";
import Venue from "../components/Venue/Venue";

import Gifts from "../components/Gifts/Gifts";
import DressCode from "../components/DressCode/DressCode";

import Footer from "../components/Footer/Footer";

function Home() {
  return (
    <div className="relative bg-[#FFF8F2] overflow-hidden">

      <AnimatedBackground />

      <Hero />

      <Countdown />

      <Story />

      <Events />

      <Venue />

      <DressCode />

      <Gifts />

      <Footer />

    </div>
  );
}

export default Home;