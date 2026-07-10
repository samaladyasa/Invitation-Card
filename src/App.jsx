import { useState } from "react";

import Intro from "./components/Intro/Intro";
import Home from "./pages/Home";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [fadeAtSeconds] = useState(1.0);
  const [homeFadingIn, setHomeFadingIn] = useState(false);

  return (
    <>
      <div
        className="app-home-wrapper"
        style={{
          opacity: homeFadingIn ? 1 : 0,
          transform: homeFadingIn ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 1400ms ease, transform 1400ms ease",
        }}
      >
        <Home />
      </div>

      {showIntro && (
        <Intro
          fadeAtSeconds={fadeAtSeconds}
          onRevealStart={() => setHomeFadingIn(true)}
          onFinish={() => setShowIntro(false)}
        />
      )}
    </>
  );
}
