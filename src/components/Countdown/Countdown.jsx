import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Countdown() {
  const targetDate = new Date("2026-12-15T00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });


  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      setTimeLeft({
        days: Math.max(
          0,
          Math.floor(difference / (1000 * 60 * 60 * 24))
        ),

        hours: Math.max(
          0,
          Math.floor(
            (difference / (1000 * 60 * 60)) % 24
          )
        ),

        minutes: Math.max(
          0,
          Math.floor(
            (difference / (1000 * 60)) % 60
          )
        ),

        seconds: Math.max(
          0,
          Math.floor(
            (difference / 1000) % 60
          )
        ),
      });

    }, 1000);


    return () => clearInterval(timer);

  }, []);



  const Time = ({ value, label }) => (
    <div className="text-center">

      <motion.p
        key={value}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          font-serif
          text-3xl
          sm:text-4xl
          md:text-5xl
          text-[#5C4740]
        "
      >
        {String(value).padStart(2, "0")}
      </motion.p>


      <p
        className="
          mt-2
          text-[10px]
          sm:text-xs
          uppercase
          tracking-[4px]
          text-[#9B8176]
        "
      >
        {label}
      </p>

    </div>
  );



  return (

    <section
      className="
        relative
        overflow-hidden
        py-20
        px-5
        bg-gradient-to-b
        from-[#FFF9F3]
        via-[#FDF2EA]
        to-[#FFF8F2]
      "
    >


      <div
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          h-[350px]
          w-[350px]
          rounded-full
          bg-[#D2A96B]/20
          blur-[120px]
        "
      />


      <motion.div

        initial={{
          opacity:0,
          y:40
        }}

        whileInView={{
          opacity:1,
          y:0
        }}

        viewport={{
          once:true
        }}

        transition={{
          duration:1
        }}

        className="
          relative
          mx-auto
          max-w-4xl
          rounded-[35px]
          border
          border-[#D2A96B]/20
          bg-white/40
          backdrop-blur-xl
          px-6
          py-12
          sm:px-12
        "
      >
        <p
          className="
            text-center
            uppercase
            tracking-[7px]
            text-xs
            text-[#9B8176]
          "
        >
          Counting Down To Forever
        </p>


        <h2
          className="
            mt-4
            text-center
            font-script
            text-4xl
            sm:text-5xl
            text-[#B76E79]
          "
        >
          Our Wedding Day
        </h2>
        <div
          className="
            mt-6
            flex
            justify-center
            items-center
            gap-4
          "
        >

          <div className="h-px w-16 bg-[#D2A96B]/60"/>

          <p
            className="
              text-sm
              tracking-[5px]
              text-[#7E6860]
            "
          >
          </p>


          <div className="h-px w-16 bg-[#D2A96B]/60"/>

        </div>
        <div
          className="
            mt-10
            flex
            justify-center
            items-center
            gap-5
            sm:gap-10
          "
        >

          <Time
            value={timeLeft.days}
            label="Days"
          />


          <span className="text-[#D2A96B] text-xl">
            :
          </span>


          <Time
            value={timeLeft.hours}
            label="Hours"
          />


          <span className="text-[#D2A96B] text-xl">
            :
          </span>


          <Time
            value={timeLeft.minutes}
            label="Min"
          />


          <span className="text-[#D2A96B] text-xl">
            :
          </span>


          <Time
            value={timeLeft.seconds}
            label="Sec"
          />

        </div>
        <div
          className="
            mt-10
            flex
            justify-center
          "
        >

          <div
            className="
              h-px
              w-24
              bg-[#D2A96B]/50
            "
          />

        </div>


      </motion.div>


    </section>

  );
}