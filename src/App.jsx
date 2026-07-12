import { useState, useEffect } from "react";

import Intro from "./components/Intro/Intro";
import Home from "./pages/Home";

export default function App() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [introUnmounted, setIntroUnmounted] = useState(false);
  const [scratched, setScratched] = useState(false);

  useEffect(() => {
    document.body.style.overflow = scratched ? "auto" : "hidden";
    document.documentElement.style.overflow = scratched ? "auto" : "hidden";
  }, [scratched]);

  return (
    <>
      <div
        className="app-home-wrapper"
        style={{
          height: scratched ? "auto" : "100vh",
          overflow: scratched ? "visible" : "hidden",
        }}
      >
        <Home scratched={scratched} onScratched={() => setScratched(true)} envelopeOpened={envelopeOpened} />
      </div>

      {!introUnmounted && (
        <Intro
          envelopeOpened={envelopeOpened}
          onEnvelopeOpened={() => {
            setEnvelopeOpened(true);
            setTimeout(() => setIntroUnmounted(true), 1000);
          }}
        />
      )}
    </>
  );
}
