import { motion } from "framer-motion";

export default function StoryCard({ story }) {
  const objectPosition =
    story.position === "right"
      ? "object-right"
      : story.position === "left"
      ? "object-left"
      : "object-center";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false }}
      className="
        snap-center
        shrink-0
        w-[90vw]
        sm:w-[75vw]
        md:w-[60vw]
        lg:w-[40vw]
        xl:w-[34vw]
        2xl:w-[30vw]
      "
    >
      <div
        className="
          rounded-[36px]
          overflow-hidden
          bg-white
          shadow-[0_25px_70px_rgba(0,0,0,.08)]
        "
      >
        <div className="relative aspect-[4/5]">
          <motion.img
            src={story.image}
            alt={story.tag}
            className={`absolute inset-0 h-full w-full object-cover ${objectPosition}`}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

          <div className="absolute bottom-8 left-8 text-white">
            <div className="inline-block rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-4 py-1">
              <p className="text-[10px] uppercase tracking-[4px] font-medium">
                {story.tag}
              </p>
            </div>

            <p className="mt-4 text-xs tracking-[5px] text-white/90">
              {story.date}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}