import ScrollReveal from "../ScrollReveal";

const colors = [
  { name: "Burgundy", value: "#7A2238" },
  { name: "Champagne", value: "#E7D2B5" },
  { name: "Ivory", value: "#F7F2E9" },
  { name: "Sage", value: "#A8B89B" },
];

function SuitIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M8 4l4 3 4-3 3 4-2 13H7L5 8l3-4Z" />
      <path d="M12 7v14" />
      <path d="M9 11h6" />
    </svg>
  );
}

function DressIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M10 3h4" />
      <path d="M11 3v4l-5 14h12L13 7V3" />
      <path d="M8 16h8" />
    </svg>
  );
}

export default function DressCode() {
  return (
    <section
      id="dresscode"
      className="bg-[#FFF8F2] px-5 py-12 md:px-8"
    >
      <ScrollReveal>
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-6 shadow-[0_15px_40px_rgba(0,0,0,0.08)]">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[5px] text-[#B76E79]">
              Dress Code
            </p>

            <p className="mt-2 text-sm text-[#7A6B6B]">
              A palette we would love to see
            </p>
          </div>
          <div className="mt-6 flex justify-center gap-5">

            {colors.map((item) => (
              <div
                key={item.name}
                className="text-center"
              >
                <div
                  className="
                    h-11
                    w-11
                    rounded-full
                    border-2
                    border-white
                    shadow-md
                  "
                  style={{
                    background: item.value,
                  }}
                />

                <p className="mt-2 text-[10px] text-[#6F6060]">
                  {item.name}
                </p>
              </div>
            ))}

          </div>
          <div className="my-5 h-px bg-[#E8D8C6]" />
          <div className="space-y-3 text-sm">

            <div className="flex items-center justify-between text-[#5E4C4C]">

              <div className="flex items-center gap-2">
                <SuitIcon />
                <span className="font-medium">
                  Gentlemen
                </span>
              </div>

              <span className="text-[#7A6B6B]">
                Formal • Sherwani
              </span>

            </div>


            <div className="flex items-center justify-between text-[#5E4C4C]">

              <div className="flex items-center gap-2">
                <DressIcon />
                <span className="font-medium">
                  Ladies
                </span>
              </div>

              <span className="text-[#7A6B6B]">
                Saree • Lehenga • Gown
              </span>

            </div>

          </div>


          <p className="mt-5 text-center text-xs italic text-[#9C8888]">
            Kindly avoid bright neon colours.
          </p>

        </div>
      </ScrollReveal>
    </section>
  );
}