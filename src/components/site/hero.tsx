import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { images } from "@/lib/menu-data";

const floaters = [
  { src: images.rollClassic, x: "6%", y: "18%", size: 150, delay: 0, dur: 7 },
  { src: images.rollCaramel, x: "80%", y: "12%", size: 120, delay: 0.6, dur: 8 },
  { src: images.rollPistachio, x: "12%", y: "68%", size: 110, delay: 1.1, dur: 6.5 },
  { src: images.rollBlueberry, x: "84%", y: "66%", size: 130, delay: 0.3, dur: 9 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBig = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const rotBig = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative isolate min-h-screen overflow-hidden paper-grain">
      {/* maroon wave top */}
      <svg className="absolute inset-x-0 top-0 -z-10 w-full" viewBox="0 0 1440 220" preserveAspectRatio="none">
        <motion.path
          initial={{ d: "M0,0 L1440,0 L1440,120 C1100,200 900,60 620,130 C380,190 180,80 0,140 Z" }}
          animate={{
            d: [
              "M0,0 L1440,0 L1440,120 C1100,200 900,60 620,130 C380,190 180,80 0,140 Z",
              "M0,0 L1440,0 L1440,150 C1120,80 880,190 600,110 C360,45 170,170 0,110 Z",
              "M0,0 L1440,0 L1440,120 C1100,200 900,60 620,130 C380,190 180,80 0,140 Z",
            ],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          fill="var(--maroon)"
        />
      </svg>

      {/* floating stickers */}
      {floaters.map((f, i) => (
        <motion.img
          key={i}
          src={f.src}
          alt=""
          aria-hidden
          loading="lazy"
          className="pointer-events-none absolute hidden sticker md:block"
          style={{ left: f.x, top: f.y, width: f.size, opacity: fade }}
          animate={{ y: [0, -26, 0], rotate: [-8, 8, -8] }}
          transition={{ duration: f.dur, repeat: Infinity, ease: "easeInOut", delay: f.delay }}
        />
      ))}

      <div className="relative mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-full bg-primary px-5 py-2 font-display text-sm text-primary-foreground"
        >
          طازج من الفرن كل ساعة 🔥
        </motion.p>

        <motion.h1
          initial={{ y: 60, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 160, damping: 15 }}
          whileHover={{ scale: 1.03, rotate: -1 }}
          className="mt-6 font-display text-[clamp(3rem,13vw,8rem)] leading-[0.95] tracking-normal text-gradient-caramel drop-shadow-[0_14px_28px_oklch(0.38_0.16_22/0.25)]"
        >
          سينابون
        </motion.h1>

        <motion.div
          style={{ y: yBig, rotate: rotBig }}
          className="relative my-4"
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 120, damping: 12 }}
        >
          <motion.img
            src={images.rollClassic}
            alt="سينابون كلاسيك بالكريمة"
            width={340}
            height={340}
            className="w-[min(70vw,340px)] sticker"
            whileHover={{ scale: 1.08 }}
            drag
            dragConstraints={{ top: -30, bottom: 30, left: -30, right: 30 }}
            dragElastic={0.3}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="lead-text mt-2 text-muted-foreground"
        >
          لفّات دافئة، كريمة سايحة، وكراميل يمشي لحاله. جرّب البوكس واحسبها بنفسك 👇
        </motion.p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <motion.a
            href="#menu"
            whileHover={{ scale: 1.06, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full ribbon px-8 py-4 font-display text-lg"
          >
            شوف المنيو
          </motion.a>
          <motion.a
            href="#builder"
            whileHover={{ scale: 1.06, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full border-2 border-primary px-8 py-4 font-display text-lg text-primary"
          >
            اصنع بوكسك
          </motion.a>
        </div>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="mt-14 font-display text-3xl text-primary/60"
        >
          ↓
        </motion.div>
      </div>
    </section>
  );
}
