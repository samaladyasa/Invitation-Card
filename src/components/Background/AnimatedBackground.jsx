import AmbientGlow from "./AmbientGlow";
import FallingPetals from "./FallingPetals";

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">

      <AmbientGlow />

      <FallingPetals />

    </div>
  );
}

export default AnimatedBackground;