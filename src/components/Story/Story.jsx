import { motion } from "framer-motion";
import StoryCard from "./StoryCard";
import storyData from "./storyData";

export default function Story() {
  return (
    <section className="overflow-hidden bg-[#FFF8F2] py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <p className="text-xs uppercase tracking-[8px] text-[#9B8176]">
          Our Story
        </p>

        <h2 className="mt-4 font-script text-5xl text-[#B76E79]">
          Chapters of Us
        </h2>

        <p className="mx-auto mt-6 max-w-xl px-6 leading-8 text-[#7B6A63]">
          Every page tells a memory.
          <br />
          Every memory led us here.
        </p>
      </motion.div>

      <div
        className="
          story-scroll
          mt-16
          flex
          gap-8
          overflow-x-auto
          scroll-smooth
          snap-x
          snap-mandatory
          px-6
          md:px-10
          lg:px-[10vw]
          pb-10
        "
      >
        {storyData.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </section>
  );
}