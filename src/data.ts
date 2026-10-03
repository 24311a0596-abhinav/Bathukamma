import type { Avatar, Design } from "./types";
export const SKINS = ["#FFDCB8", "#E9B58A", "#C98B5E", "#8D5A3A"];
export const PALETTES = [
  { name: "Marigold & Magenta", main: "#F9A825", blouse: "#C2185B", trim: "#8E1B3A", accent: "#C2185B" },
  { name: "Pochampally Rose", main: "#D81B60", blouse: "#F9A825", trim: "#7B1FA2", accent: "#F9A825" },
  { name: "Gadwal Green", main: "#2E7D32", blouse: "#F9A825", trim: "#B8860B", accent: "#E91E63" },
  { name: "Royal Purple", main: "#6A1B9A", blouse: "#F9A825", trim: "#B8860B", accent: "#EC407A" },
  { name: "Peacock Teal", main: "#00838F", blouse: "#E65100", trim: "#B8860B", accent: "#F9A825" },
  { name: "Temple Maroon", main: "#8E1B3A", blouse: "#F5E6C8", trim: "#B8860B", accent: "#F9A825" },
];
export const HAIR = [{ id: "braid", label: "Braid" }, { id: "bun", label: "Bun" }, { id: "twin", label: "Twin braids" }, { id: "open", label: "Open" }, { id: "short", label: "Bob" }];
export const OUTFITS = [
  { id: "langa", label: "Langa Voni" }, { id: "pavadai", label: "Pattu Pavadai" }, { id: "lehenga", label: "Lehenga" },
  { id: "saree", label: "Saree" }, { id: "churidar", label: "Churidar" }, { id: "kurta", label: "Kurta set" },
];
export const ACCS = [
  { id: "bindi", label: "Bindi" }, { id: "tikka", label: "Maang tikka" }, { id: "gajra", label: "Gajra" }, { id: "jhumka", label: "Jhumkas" },
  { id: "mukkera", label: "Mukkera" }, { id: "haaram", label: "Haaram" }, { id: "bangles", label: "Bangles" },
];
export const FLOWERS = [
  { id: "tangedi", label: "Tangedi", te: "తంగేడు", meaning: "Senna auriculata, the state flower of Telangana. Its golden blooms carpet the fields after the monsoon." },
  { id: "gunugu", label: "Gunugu", te: "గునుగు", meaning: "Soft celosia plumes, dyed in festival colours. Seasonal wildflowers are the heart of the offering." },
  { id: "banthi", label: "Banthi", te: "బంతి", meaning: "Marigold, the flower of auspicious beginnings, offered to deities across South India." },
  { id: "chamanthi", label: "Chamanthi", te: "చామంతి", meaning: "Chrysanthemum. Its many fine petals stand for abundance and the layers of life." },
];
export const COLORS = ["#FFC107", "#FF9800", "#E91E78", "#F8F8F8", "#9C27B0", "#F44336", "#FFEB3B", "#8BC34A"];
export const APEX = [
  { id: "gauramma", label: "Gauramma", meaning: "A cone of turmeric paste crowns the stack. It represents Goddess Gauri, and turmeric is a symbol of auspiciousness and wellbeing." },
  { id: "lotus", label: "Lotus", meaning: "The lotus is purity and the seat of the Goddess in Indian tradition." },
  { id: "diya", label: "Diya", meaning: "A lamp is lit so the prayer travels with the light." },
] as const;
export const DAYS = [
  { name: "Engili Pula Bathukamma", te: "ఎంగిలి పూల బతుకమ్మ", note: "Begins on Mahalaya Amavasya. The first, humble stack. Offering: sesame and jaggery." },
  { name: "Atkula Bathukamma", te: "అటుకుల బతుకమ్మ", note: "Offering: flattened rice (atukulu) with jaggery and lentils." },
  { name: "Muddapappu Bathukamma", te: "ముద్దపప్పు బతుకమ్మ", note: "Offering: cooked lentils (muddapappu), milk and jaggery." },
  { name: "Nanabiyyam Bathukamma", te: "నానబియ్యం బతుకమ్మ", note: "Offering: soaked rice (nanabiyyam) with milk and jaggery." },
  { name: "Atla Bathukamma", te: "అట్ల బతుకమ్మ", note: "Offering: atlu, thin rice pancakes." },
  { name: "Aligina Bathukamma", te: "అలిగిన బతుకమ్మ", note: "Aligina means 'sulking'. Traditionally a day of rest, with no stack made." },
  { name: "Vepakayala Bathukamma", te: "వేపకాయల బతుకమ్మ", note: "Offering: fried rice-flour bits shaped like neem fruits (vepakayalu)." },
  { name: "Vennamuddala Bathukamma", te: "వెన్నముద్దల బతుకమ్మ", note: "Offering: butter (venna), sesame and jaggery." },
  { name: "Saddula Bathukamma", te: "సద్దుల బతుకమ్మ", note: "Durgashtami. The grandest stack, with five rice dishes, then the immersion." },
];
export const HERITAGE = [
  { t: "Kakatiya Kala Thoranam", te: "కాకతీయ కళా తోరణం", d: "The 12th-13th century gateway of Warangal Fort, a symbol on Telangana's emblem." },
  { t: "Ramappa Temple", te: "రామప్ప దేవాలయం", d: "Palampet's Kakatiya temple, a UNESCO World Heritage Site since 2021." },
  { t: "Charminar", te: "చార్మినార్", d: "Hyderabad's landmark, built in 1591 by Muhammad Quli Qutb Shah." },
  { t: "Pochampally Ikat", te: "పోచంపల్లి ఇక్కత్", d: "Double-ikat weaving from Bhoodan Pochampally, with its signature diamond motifs." },
  { t: "Gadwal Sarees", te: "గద్వాల చీరలు", d: "Cotton bodies joined to silk borders, woven in Gadwal with zari detail." },
  { t: "Bonalu", te: "బోనాలు", d: "Hyderabad and Secunderabad's festival of offerings to Goddess Mahankali, carried in decorated pots." },
];
export const RITUAL = [
  { t: "Gather the flowers", d: "Wildflowers are collected after the monsoon. It is an act of gratitude to the land that provides." },
  { t: "Stack the tiers", d: "Flowers are layered into a cone, tier by tier, much like a temple gopuram rising towards the divine." },
  { t: "Crown with Gauramma", d: "A turmeric cone for Goddess Gauri, invoked for the wellbeing of the family and community." },
  { t: "Sing and circle", d: "Women gather around the stack, clapping and singing Bathukamma songs. The circle stands for unity." },
  { t: "Float and farewell", d: "The stack is set on a water body with a farewell song. It marks the cycle of life: what is received from nature returns to it." },
];
export const FACTS = [
  "Bathukamma means 'Mother Goddess, come alive'. Bathuku is life, Amma is mother.",
  "It is the state festival of Telangana, celebrated for nine days ending at Durgashtami.",
  "The refrain 'Uyyalo' carries the rhythm. Clapping keeps time as the circle turns.",
  "Singing together carries stories of the Goddess, of family, and of the land.",
  "Traditionally, flowers released into the water are believed to enrich the lake, so the offering returns to nature.",
];
export const defaultAvatar: Avatar = { skin: 1, hair: "braid", outfit: "langa", palette: 0, acc: ["bindi", "gajra", "jhumka"] };
export const defaultDesign: Design = {
  apex: "gauramma",
  rings: [
    { flower: "tangedi", color: "#FFC107", alt: false }, { flower: "gunugu", color: "#E91E78", alt: false },
    { flower: "banthi", color: "#FF9800", alt: false }, { flower: "chamanthi", color: "#F8F8F8", alt: true },
    { flower: "tangedi", color: "#FFEB3B", alt: false },
  ],
};
