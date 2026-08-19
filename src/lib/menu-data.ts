import rollClassic from "@/assets/roll-classic.png";
import rollCaramel from "@/assets/roll-caramel.png";
import rollChocolate from "@/assets/roll-chocolate.png";
import rollPistachio from "@/assets/roll-pistachio.png";
import rollBlueberry from "@/assets/roll-blueberry.png";
import rollLotus from "@/assets/roll-lotus.png";
import cheesecakeImg from "@/assets/cheesecake.png";
import fudgeImg from "@/assets/fudge.png";
import fattehImg from "@/assets/fatteh.png";
import boxImg from "@/assets/box.png";

export const images = {
  rollClassic,
  rollCaramel,
  rollChocolate,
  rollPistachio,
  rollBlueberry,
  rollLotus,
  cheesecakeImg,
  fudgeImg,
  fattehImg,
  boxImg,
};

export type Item = {
  id: string;
  name: string;
  price: number;
  img: string;
  tint: string;
  note?: string;
};

export const jumbo: Item[] = [
  { id: "j-classic", name: "كلاسيك", price: 160, img: rollClassic, tint: "var(--glaze)" },
  { id: "j-caramel", name: "كراميل", price: 160, img: rollCaramel, tint: "var(--caramel)" },
  { id: "j-caramel-walnut", name: "كراميل عين جمل", price: 175, img: rollCaramel, tint: "var(--caramel)" },
  { id: "j-lotus", name: "لوتس", price: 170, img: rollLotus, tint: "var(--caramel)" },
  { id: "j-nutella", name: "نوتيلا", price: 175, img: rollChocolate, tint: "var(--maroon)" },
  { id: "j-dark", name: "دارك شوكليت", price: 165, img: rollChocolate, tint: "var(--maroon-deep)" },
  { id: "j-pistachio", name: "بيستاشيو", price: 180, img: rollPistachio, tint: "var(--pistachio)" },
  { id: "j-blueberry", name: "بلوبيري", price: 185, img: rollBlueberry, tint: "var(--berry)" },
];

export const fatteh: Item[] = [
  { id: "f-classic", name: "كلاسيك", price: 175, img: fattehImg, tint: "var(--glaze)" },
  { id: "f-caramel", name: "كراميل", price: 175, img: fattehImg, tint: "var(--caramel)" },
  { id: "f-caramel-walnut", name: "كراميل عين جمل", price: 185, img: fattehImg, tint: "var(--caramel)" },
  { id: "f-lotus", name: "لوتس", price: 185, img: fattehImg, tint: "var(--caramel)" },
  { id: "f-nutella", name: "نوتيلا", price: 185, img: fattehImg, tint: "var(--maroon)" },
  { id: "f-dark", name: "دارك شوكليت", price: 175, img: fattehImg, tint: "var(--maroon-deep)" },
  { id: "f-pistachio", name: "بيستاشيو", price: 195, img: fattehImg, tint: "var(--pistachio)" },
  { id: "f-blueberry", name: "بلوبيري", price: 195, img: fattehImg, tint: "var(--berry)" },
];

export const cheesecake: Item[] = [
  { id: "c-blueberry", name: "بلوبيري", price: 110, img: cheesecakeImg, tint: "var(--berry)" },
  { id: "c-caramel", name: "كراميل", price: 100, img: cheesecakeImg, tint: "var(--caramel)" },
  { id: "c-nutella", name: "نوتيلا", price: 100, img: cheesecakeImg, tint: "var(--maroon)" },
  { id: "c-lotus", name: "لوتس", price: 100, img: cheesecakeImg, tint: "var(--caramel)" },
  { id: "c-pistachio", name: "بيستاشيو", price: 120, img: cheesecakeImg, tint: "var(--pistachio)" },
];

export const fudge: Item[] = [
  { id: "fd-molten", name: "بلچن تشوكليت", price: 90, img: fudgeImg, tint: "var(--maroon-deep)" },
];

export const single: Item = {
  id: "s-mid",
  name: "سينابون سينجل ( وسط )",
  price: 80,
  img: rollClassic,
  tint: "var(--glaze)",
};

export const boxes = [
  { id: "b3", pieces: 3, was: 240, price: 210 },
  { id: "b4", pieces: 4, was: 320, price: 260 },
  { id: "b5", pieces: 5, was: 400, price: 300 },
  { id: "b6", pieces: 6, was: 480, price: 345 },
];

export const addons = [
  { id: "a-pistachio", name: "بيستاشيو", price: 25, emoji: "🥜", tint: "var(--pistachio)" },
  { id: "a-blueberry", name: "بلوبيري", price: 25, emoji: "🫐", tint: "var(--berry)" },
  { id: "a-walnut", name: "عين جمل", price: 15, emoji: "🌰", tint: "var(--caramel)" },
];
