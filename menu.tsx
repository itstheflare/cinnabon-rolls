import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { jumbo, fatteh, cheesecake, fudge, single, addons, type Item } from "@/lib/menu-data";
import { useCart } from "./cart";

const groups = [
  { id: "jumbo", label: "جامبو سينجل", items: jumbo, hint: "قطعة كبيرة تكفي شخصين" },
  { id: "fatteh", label: "فتة السينابون", items: fatteh, hint: "كبيرة وتكفي اكتر من شخص 😍" },
  { id: "cheesecake", label: "تشيز كيك", items: cheesecake, hint: "باردة وكريمية" },
  { id: "fudge", label: "فادج كيك", items: fudge, hint: "شوكليت سايح" },
  { id: "single", label: "سينجل وسط", items: [single], hint: "الحجم الوسط الكلاسيكي" },
];

export function Menu() {
  const [active, setActive] = useState(groups[0]!.id);
  const [picked, setPicked] = useState<Item | null>(null);
  const group = groups.find((g) => g.id === active)!;

  return (
    <section id="menu" className="relative overflow-hidden py-24 paper-grain">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle title="المنيو" sub={group.hint} />

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {groups.map((g) => (
            <motion.button
              key={g.id}
              onClick={() => setActive(g.id)}
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.94 }}
              className={`relative rounded-full px-5 py-2.5 font-display text-sm transition-colors ${
                active === g.id ? "text-primary-foreground" : "text-primary"
              }`}
            >
              {active === g.id && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 -z-10 rounded-full ribbon"
                  transition={{ type: "spring", stiffness: 320, damping: 26 }}
                />
              )}
              {g.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-10 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {group.items.map((item, i) => (
              <ItemCard key={item.id} item={item} index={i} onPick={() => setPicked(item)} />
            ))}
          </motion.div>
        </AnimatePresence>

      </div>

      <AddonDialog item={picked} onClose={() => setPicked(null)} />
    </section>
  );
}

export function SectionTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="text-center">
      <motion.h2
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: "spring", stiffness: 160, damping: 14 }}
        className="display-xl title-flourish text-gradient-caramel text-[clamp(2.4rem,7vw,4.75rem)]"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          key={sub}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="lead-text mt-3 text-muted-foreground"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}

function ItemCard({ item, index, onPick }: { item: Item; index: number; onPick: () => void }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, rotate: index % 2 ? 3 : -3 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 140, damping: 16 }}
      whileHover={{ y: -12, rotate: index % 2 ? 1.5 : -1.5 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-card p-5 shadow-[var(--shadow-soft)]"
    >

      <motion.span
        className="pointer-events-none absolute -top-16 -left-16 size-40 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-40"
        style={{ background: item.tint }}
      />
      <motion.img
        src={item.img}
        alt={item.name}
        loading="lazy"
        width={220}
        height={220}
        className="mx-auto h-40 w-auto object-contain sticker"
        whileHover={{ rotate: 360, scale: 1.12 }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
      />
      <h3 className="display-xl mt-4 text-center text-2xl text-primary">{item.name}</h3>
      <div className="mt-2 mb-4 flex items-center justify-center gap-1 font-display text-xl text-accent-foreground">
        <motion.span className="num-fancy" whileHover={{ scale: 1.2 }}>
          {item.price}
        </motion.span>
        <span className="text-sm text-muted-foreground">جنيه</span>
      </div>
      <motion.button
        onClick={onPick}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.94 }}
        className="mt-auto flex w-full items-center justify-center gap-2 rounded-full ribbon pt-2.5 pb-2.5 font-display"
      >
        <Plus className="size-4" />
        اضف للسلة
      </motion.button>
    </motion.article>
  );
}

function AddonDialog({ item, onClose }: { item: Item | null; onClose: () => void }) {
  const { add, setOpen } = useCart();
  const [selected, setSelected] = useState<string[]>([]);
  const [qty, setQty] = useState(1);

  const extras = addons.filter((a) => selected.includes(a.id));
  const unit = (item?.price ?? 0) + extras.reduce((s, a) => s + a.price, 0);

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const close = () => {
    onClose();
    setSelected([]);
    setQty(1);
  };

  return (
    <AnimatePresence>
      {item && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[70] bg-primary/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="fixed inset-x-4 top-1/2 z-[71] mx-auto max-w-md -translate-y-1/2 rounded-[2.5rem] bg-card p-6 shadow-2xl"
          >
            <motion.img
              src={item.img}
              alt={item.name}
              width={200}
              height={200}
              className="mx-auto h-36 w-auto object-contain sticker"
              animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <h3 className="mt-3 text-center font-display text-3xl text-primary">{item.name}</h3>
            <p className="mt-1 text-center text-sm text-muted-foreground">زوّدها اضافات 🤤</p>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {addons.map((a) => {
                const on = selected.includes(a.id);
                return (
                  <motion.button
                    key={a.id}
                    onClick={() => toggle(a.id)}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.92 }}
                    animate={on ? { scale: 1.03 } : { scale: 1 }}
                    className={`rounded-3xl border-2 p-3 text-center transition-colors ${
                      on ? "border-primary bg-secondary" : "border-border bg-background"
                    }`}
                  >
                    <motion.span
                      className="block text-2xl"
                      animate={on ? { rotate: [0, 20, -20, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {a.emoji}
                    </motion.span>
                    <span className="mt-1 block font-display text-sm">{a.name}</span>
                    <span className="text-xs text-muted-foreground">+{a.price}</span>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center gap-3 rounded-full bg-secondary px-3 py-2">
                <motion.button whileTap={{ scale: 0.85 }} onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="تقليل">
                  −
                </motion.button>
                <motion.span key={qty} animate={{ scale: [1.4, 1] }} className="w-6 text-center font-display">
                  {qty}
                </motion.span>
                <motion.button whileTap={{ scale: 0.85 }} onClick={() => setQty((q) => q + 1)} aria-label="زيادة">
                  +
                </motion.button>
              </div>
              <motion.p key={unit * qty} animate={{ scale: [1.15, 1] }} className="font-display text-2xl text-primary">
                {unit * qty} جنيه
              </motion.p>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                const suffix = extras.length ? ` + ${extras.map((e) => e.name).join(" + ")}` : "";
                add(
                  {
                    key: item.id + [...selected].sort().join("-"),
                    name: item.name + suffix,
                    price: unit,
                    img: item.img,
                  },
                  qty,
                );
                toast.success("انضاف للسلة 🌀", { description: `${item.name}${suffix}` });
                close();
                setOpen(true);
              }}
              className="mt-5 w-full rounded-full ribbon py-3.5 font-display text-lg"
            >
              اضف للسلة
            </motion.button>
            <button onClick={close} className="mt-2 w-full py-2 text-sm text-muted-foreground">
              الغاء
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
