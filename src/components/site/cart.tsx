import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type CartLine = {
  key: string;
  name: string;
  price: number;
  img?: string;
  qty: number;
};

type CartCtx = {
  lines: CartLine[];
  add: (line: Omit<CartLine, "qty">, qty?: number) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  const value = useMemo<CartCtx>(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const total = lines.reduce((s, l) => s + l.qty * l.price, 0);
    return {
      lines,
      open,
      setOpen,
      count,
      total,
      add: (line, qty = 1) =>
        setLines((prev) => {
          const existing = prev.find((l) => l.key === line.key);
          if (!existing) return [...prev, { ...line, qty }];
          return prev.map((l) => (l.key === line.key ? { ...l, qty: l.qty + qty } : l));
        }),
      remove: (key) => setLines((prev) => prev.filter((l) => l.key !== key)),
      setQty: (key, qty) =>
        setLines((prev) =>
          qty <= 0
            ? prev.filter((l) => l.key !== key)
            : prev.map((l) => (l.key === key ? { ...l, qty } : l)),
        ),
      clear: () => setLines([]),
    };
  }, [lines, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
