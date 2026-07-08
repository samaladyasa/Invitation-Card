import { motion } from "framer-motion";

export default function InvitationReveal({ onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
    >
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8 }}
        onClick={onComplete}
        className="cursor-pointer w-full max-w-lg rounded-[30px] bg-[#FFFDF8] p-10 text-center shadow-2xl"
      >
        <p className="uppercase tracking-[6px] text-xs text-[#9B8A8A]">
          Wedding Invitation
        </p>

        <p className="mt-6 text-sm leading-7 text-[#6F6060]">
          To the Sky and the Earth,
          <br />
          to the timeless beauty of our love.
        </p>

        <div className="mx-auto my-8 h-px w-32 bg-[#D2A96B]" />

        <p className="text-sm leading-7 text-[#6F6060]">
          We are delighted to invite you to the wedding ceremony of Alisha, daughter of Mr. and Mrs. Sharma, and Anirudh, son of Mr. and Mrs. Singh.
          Your presence will make our special day even more memorable.
        </p>

        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="mt-8 text-xs uppercase tracking-[4px] text-[#B76E79]"
        >
          Tap to continue
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
