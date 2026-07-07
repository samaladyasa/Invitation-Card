import { useState } from "react";

import Intro from "./components/Intro/Intro";
import Landing from "./components/Landing/Landing";
import Home from "./pages/Home";

export default function App() {
  const [stage, setStage] = useState("intro");

  return (
    <>
      {stage === "intro" && (
        <Intro onFinish={() => setStage("landing")} />
      )}

      {stage === "landing" && (
        <Landing onComplete={() => setStage("home")} />
      )}

      {stage === "home" && <Home />}
    </>
  );
}