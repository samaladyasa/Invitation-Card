import { motion } from "framer-motion";
import weddingData from "../../data/weddingData";

export default function HeroContent() {
  return (
    <div className="relative z-20 flex min-h-screen items-center justify-center px-6">

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="
            uppercase
            tracking-[8px]
            text-xs
            md:text-sm
            text-[#8C7A7A]
          "
        >
          Together With Our Families
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mx-auto mt-6 h-px w-28 bg-[#D2A96B]"
        />
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="
            mt-10
            font-script
            text-[clamp(4.2rem,9vw,7.5rem)]
            leading-none
            text-[#B76E79]
          "
        >
          {weddingData.hero.bride}
        </motion.h1>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.9,
            type: "spring",
            stiffness: 180,
          }}
          className="
            my-5
            text-5xl
            text-[#D2A96B]
          "
        >
          &
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="
            font-script
            text-[clamp(4.2rem,9vw,7.5rem)]
            leading-none
            text-[#B76E79]
          "
        >
          {weddingData.hero.groom}
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mx-auto mt-10 h-px w-36 bg-[#D2A96B]"
        />
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="
            mt-8
            inline-flex
            rounded-full
            border
            border-[#D2A96B]/30
            bg-white/60
            px-8
            py-3
            backdrop-blur-md
          "
        >
          <p
            className="
              uppercase
              tracking-[5px]
              text-sm
              text-[#8C7A7A]
            "
          >
            {weddingData.hero.date}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-20 flex flex-col items-center"
        >
          <motion.p
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="
              uppercase
              tracking-[6px]
              text-xs
              text-[#8C7A7A]
            "
          >
            Scroll to Explore
          </motion.p>

          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
            }}
            className="
              mt-4
              text-2xl
              text-[#B76E79]
            "
          >
            ↓
          </motion.div>
        </motion.div>

      </motion.div>

    </div>
  );
}