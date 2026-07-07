import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#FFF8F2] py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-2xl text-center"
      >
        <div className="mx-auto mb-10 h-px w-28 bg-[#D2A96B]" />
        <p className="text-lg italic text-[#8C7A7A]">
          With all our love,
        </p>

        <h2 className="mt-5 font-script text-6xl leading-none text-[#B76E79]">
          Alisha & Anirudh
        </h2>

        <p className="mx-auto mt-6 max-w-md leading-7 text-[#6F6060]">
          Thank you for celebrating with us. Your love, blessings and presence
          are the greatest gifts we could ask for.
        </p>
        <div className="mx-auto mt-12 h-px w-28 bg-[#D2A96B]" />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-col items-center"
        >
          <p className="uppercase tracking-[6px] text-xs text-[#8C7A7A]">
            End of Invitation
          </p>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
            className="mt-4 text-2xl text-[#B76E79]"
          >
            ♥
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  );
}