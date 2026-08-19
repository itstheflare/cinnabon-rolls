import { motion } from "motion/react";

const words = ["طازج من الفرن", "🌀", "كريمة سايحة", "🍯", "كراميل عين جمل", "🥜", "بيستاشيو", "🫐", "بلوبيري", "🔥"];

export function Marquee({ reverse = false }: { reverse?: boolean }) {
  const row = [...words, ...words, ...words, ...words];
  return (
    <div className="relative overflow-hidden bg-accent py-3">
      <motion.div
        className="flex w-max gap-8 whitespace-nowrap font-display text-xl text-accent-foreground"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {row.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </motion.div>
    </div>
  );
}
