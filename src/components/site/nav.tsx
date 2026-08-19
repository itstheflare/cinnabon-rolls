import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { ShoppingBag, X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "./cart";
import { toast } from "sonner";

const links = [
  { href: "#menu", label: "المنيو" },
  { href: "#boxes", label: "البوكسات" },
  { href: "#builder", label: "اصنع بوكسك" },
  { href: "#addons", label: "الاضافات" },
];

export function Nav() {
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  const { count, open, setOpen } = useCart();

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-1.5 origin-right bg-accent"
        style={{ scaleX: bar }}
      />
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.1 }}
        className="fixed inset-x-0 top-1.5 z-40 px-3 sm:px-6"
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full ribbon px-4 py-2.5 backdrop-blur">
          <motion.a
            href="#top"
            className="flex items-center gap-2 font-display text-lg text-primary-foreground"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="text-2xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
            >
              🌀
            </motion.span>
            <span>رولز سينابون</span>
          </motion.a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <motion.a
                  href={l.href}
                  className="relative block rounded-full px-4 py-2 text-sm text-primary-foreground/85"
                  whileHover={{ scale: 1.08, color: "var(--caramel)" }}
                  whileTap={{ scale: 0.94 }}
                >
                  {l.label}
                </motion.a>
              </li>
            ))}
          </ul>

          <motion.button
            onClick={() => setOpen(true)}
            className="relative flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-display text-sm text-accent-foreground"
            whileHover={{ scale: 1.07, rotate: -2 }}
            whileTap={{ scale: 0.93 }}
          >
            <ShoppingBag className="size-4" />
            <span>السلة</span>
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0, y: -8 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 14 }}
                  className="absolute -top-2 -left-2 grid size-6 place-items-center rounded-full bg-primary text-xs text-primary-foreground"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.header>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lines, total, setQty, remove, clear } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-primary/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col paper-grain shadow-2xl"
          >
            <div className="flex items-center justify-between ribbon px-5 py-4">
              <h3 className="font-display text-xl">سلة الحلا 🛍️</h3>
              <motion.button whileHover={{ rotate: 90 }} onClick={onClose} aria-label="اغلاق">
                <X className="size-5" />
              </motion.button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {lines.length === 0 && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-16 text-center text-muted-foreground"
                >
                  السلة فاضية... اضف شي حلو 🌀
                </motion.p>
              )}
              <AnimatePresence initial={false}>
                {lines.map((l) => (
                  <motion.div
                    key={l.key}
                    layout
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 40, height: 0 }}
                    className="flex items-center gap-3 rounded-3xl bg-card p-3 shadow-[var(--shadow-soft)]"
                  >
                    {l.img && (
                      <motion.img
                        src={l.img}
                        alt={l.name}
                        loading="lazy"
                        width={64}
                        height={64}
                        className="size-16 object-contain sticker"
                        whileHover={{ rotate: 12, scale: 1.1 }}
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-display text-base leading-tight">{l.name}</p>
                      <p className="text-sm text-muted-foreground">{l.price} جنيه</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => setQty(l.key, l.qty - 1)}
                        className="grid size-7 place-items-center rounded-full bg-secondary"
                        aria-label="تقليل"
                      >
                        <Minus className="size-3.5" />
                      </motion.button>
                      <motion.span key={l.qty} animate={{ scale: [1.4, 1] }} className="w-6 text-center font-display">
                        {l.qty}
                      </motion.span>
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => setQty(l.key, l.qty + 1)}
                        className="grid size-7 place-items-center rounded-full bg-accent"
                        aria-label="زيادة"
                      >
                        <Plus className="size-3.5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ rotate: -12 }}
                        onClick={() => remove(l.key)}
                        className="ms-1 text-destructive"
                        aria-label="حذف"
                      >
                        <Trash2 className="size-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="space-y-3 border-t border-border p-4">
              <div className="flex items-center justify-between font-display text-xl">
                <span>المجموع</span>
                <motion.span key={total} animate={{ scale: [1.2, 1] }} className="text-primary">
                  {total} جنيه
                </motion.span>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                disabled={lines.length === 0}
                onClick={() => {
                  const orderLines = lines.map((l) => `• ${l.name} × ${l.qty} — ${l.price * l.qty} جنيه`).join("\n");
                  const message = `اهلاً رولز سينابون 🌀\nعايز اطلب:\n${orderLines}\n\nالمجموع: ${total} جنيه`;
                  const waUrl = `https://wa.me/2010140885351?text=${encodeURIComponent(message)}`;
                  window.open(waUrl, "_blank", "noopener,noreferrer");
                  toast.success("جاري تحويلك للواتساب 🌀", {
                    description: `${lines.length} اصناف • ${total} جنيه — كمّل الطلب من هناك`,
                  });
                  clear();
                  onClose();
                }}
                className="w-full rounded-full ribbon py-3.5 font-display text-lg disabled:opacity-40"
              >
                اطلب عبر واتساب
              </motion.button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
