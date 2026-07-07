import ScrollReveal from "../ScrollReveal";
import venueData from "./venueData";

export default function Venue() {
  return (
    <section
      id="venue"
      className="bg-[#FFF8F2] py-20 px-5 md:px-8"
    >
      <ScrollReveal>
        <div className="mx-auto max-w-4xl">
          <div className="flex justify-center pt-8">
            <div
              className="
                relative
                w-full
                max-w-xl
                rounded-2xl
                bg-white
                p-4
                shadow-[0_25px_60px_rgba(0,0,0,0.18)]
                transition-all
                duration-500
                hover:-translate-y-2
              "
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30">
                <span
                  className="
                    inline-block
                    rounded-full
                    bg-[#B76E79]
                    px-8
                    py-3
                    text-xs
                    uppercase
                    tracking-[5px]
                    text-white
                    shadow-lg
                  "
                >
                  Venue
                </span>
              </div>

              <div
                className="
                  absolute
                  -top-3
                  left-12
                  h-8
                  w-24
                  rounded-sm
                  bg-[#EEDFCB]/60
                  backdrop-blur-[1px]
                "
              />

              <div
                className="
                  absolute
                  -top-3
                  right-12
                  h-8
                  w-24
                  rounded-sm
                  bg-[#EEDFCB]/60
                  backdrop-blur-[1px]
                "
              />
              <img
                src="/images/venue/venue.jpg"
                alt={venueData.name}
                className="
                  h-[320px]
                  w-full
                  rounded-xl
                  object-cover
                  md:h-[430px]
                "
              />
              <div className="pt-6 px-2">

                <h2 className="font-serif text-3xl md:text-4xl text-[#5E4C4C]">
                  {venueData.name}
                </h2>

                <p className="mt-3 flex items-center gap-2 text-[#8A7777]">
                  <span className="text-lg">📍</span>
                  {venueData.location}
                </p>

                <div className="my-6 flex items-center gap-3">
                  <span className="h-px flex-1 bg-[#D2A96B]" />
                  <span className="text-[#D2A96B] text-lg">✦</span>
                  <span className="h-px flex-1 bg-[#D2A96B]" />
                </div>

                <p className="leading-7 text-[#6F6060]">
                  {venueData.address}
                </p>

                <a
                  href={venueData.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-7
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-[#B76E79]
                    px-6
                    py-3
                    text-sm
                    font-medium
                    text-[#B76E79]
                    transition-all
                    duration-300
                    hover:bg-[#B76E79]
                    hover:text-white
                  "
                >
                  View on Google Maps
                  <span>↗</span>
                </a>

              </div>
            </div>
          </div>

        </div>
      </ScrollReveal>
    </section>
  );
}