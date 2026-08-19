import { motion } from "motion/react";
import { addons } from "@/lib/menu-data";
import { SectionTitle } from "./menu";

export function Addons() {
  return (
    <section id="addons" className="relative overflow-hidden py-24 paper-grain">
      <div className="mx-auto max-w-4xl px-5">
        <SectionTitle title="اضافات" sub="حرّك الماوس عليها 👀" />
        <div className="mt-12 space-y-5">
          {addons.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: i % 2 ? 80 : -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: "spring", stiffness: 120, damping: 16 }}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center gap-5 overflow-hidden rounded-[2rem] bg-card p-5 shadow-[var(--shadow-soft)] ${
                i % 2 ? "flex-row-reverse" : ""
              }`}
            >
              <motion.span
                className="grid size-20 shrink-0 place-items-center rounded-full text-4xl"
                style={{ background: a.tint }}
                whileHover={{ rotate: [0, -18, 18, 0], scale: 1.15 }}
                transition={{ duration: 0.6 }}
              >
                {a.emoji}
              </motion.span>
              <div className="flex-1">
                <h3 className="font-display text-3xl text-primary">{a.name}</h3>
                <motion.div
                  className="mt-2 h-2 rounded-full"
                  style={{ background: a.tint }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${a.price * 3}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
              <motion.span
                whileHover={{ scale: 1.2, rotate: -6 }}
                className="rounded-full bg-primary px-4 py-2 font-display text-xl text-primary-foreground"
              >
                +{a.price}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
