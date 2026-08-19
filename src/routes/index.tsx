import { createFileRoute } from "@tanstack/react-router";

import { CartProvider } from "@/components/site/cart";
import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Marquee } from "@/components/site/marquee";
import { Menu } from "@/components/site/menu";
import { Boxes } from "@/components/site/boxes";
import { Builder } from "@/components/site/builder";
import { Addons } from "@/components/site/addons";
import { Footer } from "@/components/site/footer";

// Arabic head metadata for the home route. TanStack Router merges this with
// __root.tsx by meta key, so title/description/og/twitter here override the
// root's generic defaults while charset/viewport/favicon stay inherited.
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ونـز سينابون | لفّات دافئة طازة كل ساعة" },
      {
        name: "description",
        content:
          "لفّات سينابون دافئة بكريمة سايحة وكراميل يمشي لحاله. شوف المنيو، اطلب بوكس جاهز، أو اصنع بوكسك الخاص.",
      },
      { property: "og:title", content: "ونـز سينابون | لفّات دافئة طازة كل ساعة" },
      {
        property: "og:description",
        content: "لفّات سينابون دافئة بكريمة سايحة وكراميل يمشي لحاله. اصنع بوكسك الخاص أونلاين.",
      },
      { property: "og:locale", content: "ar_SA" },
      { name: "twitter:title", content: "ونـز سينابون | لفّات دافئة طازة كل ساعة" },
      {
        name: "twitter:description",
        content: "لفّات سينابون دافئة بكريمة سايحة وكراميل يمشي لحاله.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <CartProvider>
      <div dir="rtl" lang="ar">
        <Nav />
        <Hero />
        <Marquee />
        <Menu />
        <Boxes />
        <Builder />
        <Addons />
        <Footer />
      </div>
    </CartProvider>
  );
}
