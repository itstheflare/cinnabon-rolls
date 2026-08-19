import { motion } from "motion/react";
import { Instagram, Phone, MapPin, Clock } from "lucide-react";
import { images } from "@/lib/menu-data";

const info = [
  { icon: Clock, label: "كل يوم", value: "٤ عصراً — ١ بعد منتصف الليل" },
  { icon: MapPin, label: "الفرع", value: "شارع التحلية، الرياض" },
  { icon: Phone, label: "اتصل", value: "0500 000 000" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary pt-20 pb-10 text-primary-foreground">
      <svg className="absolute inset-x-0 top-0 w-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <motion.path
          animate={{
            d: [
              "M0,0 C260,90 520,10 760,70 C1000,125 1220,30 1440,80 L1440,0 Z",
              "M0,0 C280,20 560,110 800,50 C1040,0 1240,100 1440,40 L1440,0 Z",
              "M0,0 C260,90 520,10 760,70 C1000,125 1220,30 1440,80 L1440,0 Z",
            ],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          fill="var(--cream)"
        />
      </svg>

      <div className="relative mx-auto max-w-5xl px-5">
        <motion.img
          src={images.rollCaramel}
          alt=""
          aria-hidden
          loading="lazy"
          width={120}
          height={120}
          className="mx-auto w-28 sticker"
          animate={{ y: [0, -14, 0], rotate: [0, 360] }}
          transition={{ y: { duration: 4, repeat: Infinity }, rotate: { duration: 24, repeat: Infinity, ease: "linear" } }}
        />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 text-center font-display text-5xl"
        >
          ونـز سينابون
        </motion.h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {info.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="rounded-3xl bg-primary-foreground/10 p-5 text-center"
            >
              <it.icon className="mx-auto size-6 text-accent" />
              <p className="mt-2 font-display text-lg">{it.label}</p>
              <p className="text-sm text-primary-foreground/75">{it.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <motion.a
            href="#top"
            whileHover={{ scale: 1.08, rotate: -3 }}
            whileTap={{ scale: 0.94 }}
            className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-accent-foreground"
          >
            <Instagram className="size-5" />
            تابعنا على انستقرام
          </motion.a>
        </div>

        <p className="mt-10 text-center text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} ونـز سينابون — كل الحقوق محفوظة
        </p>
      </div>
    </footer>
  );
}
