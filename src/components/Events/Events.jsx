import { motion } from "framer-motion";
import eventsData from "./eventsData";

export default function Events() {
  return (
    <section
      id="events"
      className="
        bg-[#FFF8F2]
        px-6
        py-20
      "
    >

      <motion.div
        initial={{
          opacity: 0,
          y: 50,
          filter: "blur(8px)",
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        viewport={{
          once: true,
          margin: "-120px",
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          mx-auto
          max-w-md
          relative
        "
      >
        <div
          className="
            absolute
            -top-5
            left-1/2
            -translate-x-1/2
            z-20
            rounded-full
            bg-[#B76E79]
            px-8
            py-2
            text-xs
            uppercase
            tracking-[4px]
            text-white
            shadow-md
          "
        >
          Our Events
        </div>
        <div
          className="
            relative
            rounded-[28px]
            border
            border-[#D2A96B]
            bg-[#FFFCFA]
            px-8
            py-12
            shadow-[0_20px_50px_rgba(0,0,0,0.08)]
          "
        >
          <div
            className="
              absolute
              inset-3
              rounded-[22px]
              border
              border-[#EADCCB]
              pointer-events-none
            "
          />
          <div className="relative z-10">

            <h2
              className="
                text-center
                font-script
                text-4xl
                text-[#B76E79]
              "
            >
              Wedding Festivities
            </h2>


            <div
              className="
                mx-auto
                my-6
                h-px
                w-20
                bg-[#D2A96B]
              "
            />


            <div className="space-y-6">

              {eventsData.map((event, index) => (

                <motion.div
                  key={index}
                  initial={{
                    opacity:0,
                    y:20,
                  }}
                  whileInView={{
                    opacity:1,
                    y:0,
                  }}
                  viewport={{
                    once:true,
                  }}
                  transition={{
                    delay:index * 0.15,
                    duration:0.6,
                  }}
                >

                  <h3
                    className="
                      text-center
                      font-serif
                      text-xl
                      text-[#5E4C4C]
                    "
                  >
                    {event.title}
                  </h3>


                  <p
                    className="
                      mt-1
                      text-center
                      text-sm
                      tracking-[2px]
                      uppercase
                      text-[#8C7A7A]
                    "
                  >
                    {event.date}
                  </p>


                  <p
                    className="
                      mt-1
                      text-center
                      text-sm
                      text-[#B76E79]
                    "
                  >
                    {event.time}
                  </p>


                  {index !== eventsData.length - 1 && (
                    <div
                      className="
                        mx-auto
                        mt-5
                        flex
                        items-center
                        justify-center
                        gap-3
                      "
                    >
                      <span className="h-px w-12 bg-[#E5CFA8]" />

                      <span className="text-[#D2A96B]">
                        ✦
                      </span>

                      <span className="h-px w-12 bg-[#E5CFA8]" />
                    </div>
                  )}

                </motion.div>

              ))}

            </div>

          </div>

        </div>

      </motion.div>

    </section>
  );
}