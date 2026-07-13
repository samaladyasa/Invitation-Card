import heroBgDesktop from "../../assets/herobd.png";
import heroBgMobile from "../../assets/herobm.png";

export default function HeroBackground() {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none opacity-100">
        <img src={heroBgMobile} alt="Hero Background" className="w-full h-full object-cover block md:hidden" loading="eager" />
        <img src={heroBgDesktop} alt="Hero Background" className="w-full h-full object-cover hidden md:block" loading="eager" />
      </div>
    </>
  );
}
