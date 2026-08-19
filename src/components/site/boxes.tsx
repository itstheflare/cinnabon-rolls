import { motion } from "motion/react";
import { toast } from "sonner";
import { boxes, images } from "@/lib/menu-data";
import { useCart } from "./cart";

export function Boxes() {
  const { add, setOpen } = useCart();

  return (
    <section id="boxes" className="relative overflow-hidden bg-primary py-24 text-primary-foreground">
      <motion.img
        src={images.boxImg}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -left-24 top-10 w-72 opacity-20"
        animate={{ rotate: [0, 8, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto max-w-6xl px-5">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-display text-[clamp(2.2rem,7vw,4.5rem)] leading-none"
        >
          بوكسات السينابون
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-3 text-center text-primary-foreground/75"
        >
          اوفر بكتير 🤑 كل ما زادت القطع زاد التوفير
        </motion.p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {boxes.map((b, i) => {
            const save = Math.round(((b.was - b.price) / b.was) * 100);
            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 60, rotate: i % 2 ? 4 : -4 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 150, damping: 15 }}
                whileHover={{ y: -14, scale: 1.03 }}
                className="group relative overflow-hidden rounded-[2rem] bg-card p-6 text-center text-card-foreground"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08, type: "spring", stiffness: 300 }}
                  className="absolute -top-1 -left-1 rounded-full bg-accent px-3 py-1 font-display text-sm text-accent-foreground"
                >
                  وفّر {save}%
                </motion.span>
                <motion.img
                  src={images.boxImg}
                  alt={`بوكس ${b.pieces} قطع سينابون`}
                  loading="lazy"
                  width={200}
                  height={200}
                  className="mx-auto h-36 w-auto object-contain sticker"
                  whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                />
                <h3 className="mt-4 font-display text-3xl text-primary">بوكس {b.pieces} قطع</h3>
                <div className="mt-2 flex items-center justify-center gap-3">
                  <span className="font-display text-lg text-muted-foreground line-through">{b.was}</span>
                  <motion.span whileHover={{ scale: 1.15 }} className="font-display text-3xl text-primary">
                    {b.price}
                  </motion.span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    add({ key: b.id, name: `بوكس ${b.pieces} قطع`, price: b.price, img: images.boxImg });
                    toast.success(`بوكس ${b.pieces} قطع انضاف 📦`, { description: `وفّرت ${b.was - b.price} ريال` });
                    setOpen(true);
                  }}
                  className="mt-4 w-full rounded-full ribbon py-2.5 font-display"
                >
                  اضف للسلة
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
