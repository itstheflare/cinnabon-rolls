import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { jumbo, boxes, images } from "@/lib/menu-data";
import { useCart } from "./cart";
import { SectionTitle } from "./menu";

export function Builder() {
  const [size, setSize] = useState(4);
  const [slots, setSlots] = useState<string[]>([]);
  const { add, setOpen } = useCart();

  const box = boxes.find((b) => b.pieces === size)!;
  const full = slots.length === size;

  const addFlavor = (name: string) => {
    if (full) {
      toast.error("البوكس تعبى 😅", { description: "كبّر البوكس او شيل قطعة" });
      return;
    }
    setSlots((s) => [...s, name]);
  };

  return (
    <section id="builder" className="relative overflow-hidden py-24 paper-grain">
      <div className="mx-auto max-w-5xl px-5">
        <SectionTitle title="اصنع بوكسك" sub="اختر الحجم وعبّي القطع بنفسك 🎯" />

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {boxes.map((b) => (
            <motion.button
              key={b.id}
              onClick={() => {
                setSize(b.pieces);
                setSlots((s) => s.slice(0, b.pieces));
              }}
              whileHover={{ scale: 1.07, y: -3 }}
              whileTap={{ scale: 0.93 }}
              className={`relative rounded-full px-5 py-2.5 font-display ${
                size === b.pieces ? "text-primary-foreground" : "text-primary"
              }`}
            >
              {size === b.pieces && (
                <motion.span layoutId="size-pill" className="absolute inset-0 -z-10 rounded-full ribbon" />
              )}
              {b.pieces} قطع
            </motion.button>
          ))}
        </div>

        {/* the box */}
        <motion.div
          layout
          className="relative mx-auto mt-10 max-w-2xl rounded-[2.5rem] border-4 border-dashed border-primary/40 bg-card p-6"
          animate={full ? { borderColor: "var(--caramel)" } : {}}
        >
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {Array.from({ length: size }).map((_, i) => {
              const flavor = slots[i];
              return (
                <motion.div
                  key={i}
                  layout
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className="relative grid aspect-square place-items-center rounded-3xl bg-secondary"
                >
                  <AnimatePresence mode="popLayout">
                    {flavor ? (
                      <motion.button
                        key={flavor + i}
                        onClick={() => setSlots((s) => s.filter((_, idx) => idx !== i))}
                        initial={{ y: -60, rotate: -40, opacity: 0 }}
                        animate={{ y: 0, rotate: 0, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 260, damping: 16 }}
                        whileHover={{ scale: 1.12, rotate: 10 }}
                        className="grid place-items-center p-1.5"
                        title="اضغط للحذف"
                      >
                        <img
                          src={jumbo.find((j) => j.name === flavor)!.img}
                          alt={flavor}
                          loading="lazy"
                          width={90}
                          height={90}
                          className="w-full object-contain sticker"
                        />
                      </motion.button>
                    ) : (
                      <motion.span
                        key={"empty" + i}
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                        className="font-display text-3xl text-primary/40"
                      >
                        +
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <p className="font-display text-lg">
              {slots.length} / {size} قطع
            </p>
            <motion.p key={box.price} animate={{ scale: [1.15, 1] }} className="font-display text-2xl text-primary">
              {box.price} جنيه
              <span className="ms-2 text-sm text-muted-foreground line-through">{box.was}</span>
            </motion.p>
          </div>
        </motion.div>

        {/* flavor tray */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {jumbo.map((j, i) => (
            <motion.button
              key={j.id}
              onClick={() => addFlavor(j.name)}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8, rotate: i % 2 ? 6 : -6, scale: 1.06 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-[var(--shadow-soft)]"
            >
              <img src={j.img} alt="" aria-hidden loading="lazy" width={40} height={40} className="size-9 object-contain" />
              <span className="font-display">{j.name}</span>
            </motion.button>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!full}
            onClick={() => {
              add({
                key: `custom-${size}-${slots.join("-")}`,
                name: `بوكس ${size} قطع: ${slots.join(" • ")}`,
                price: box.price,
                img: images.boxImg,
              });
              toast.success("بوكسك جاهز 📦✨", { description: slots.join(" • ") });
              setSlots([]);
              setOpen(true);
            }}
            className="rounded-full ribbon px-8 py-3.5 font-display text-lg disabled:opacity-40"
          >
            {full ? "اضف بوكسي للسلة" : `باقي ${size - slots.length} قطع`}
          </motion.button>
          {slots.length > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setSlots([])}
              className="rounded-full border-2 border-primary px-6 py-3.5 font-display text-primary"
            >
              فرّغ البوكس
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
}
