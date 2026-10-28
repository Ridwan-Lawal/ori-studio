import type { ApprovedImageName } from "@/content/images";

export const serviceCategories = [
  { id: "protective-styling", name: "Protective Styling", introduction: "Braids and twists, with texture in mind." },
  { id: "natural-haircare", name: "Natural Haircare", introduction: "Time for cleansing, conditioning and curl definition." },
  { id: "styling-maintenance", name: "Styling & Maintenance", introduction: "A change of finish, or care for an existing style." },
] as const;

export type ServiceCategory = (typeof serviceCategories)[number]["id"];
export type ServiceSlug = "knotless-braids" | "flat-twists" | "deep-conditioning" | "wash-and-define" | "silk-press" | "loc-retwist";

export type Service = {
  slug: ServiceSlug;
  name: string;
  category: ServiceCategory;
  summary: string;
  description: string;
  durationLabel: string;
  image?: ApprovedImageName;
};

// Durations are explicitly fictional examples for the portfolio concept, not salon estimates.
export const services: readonly Service[] = [
  {
    slug: "knotless-braids", name: "Knotless Braids", category: "protective-styling",
    summary: "A considered braided style.",
    description: "Sectioned braids with a gradual feed-in of added hair. Length, parting and braid size are elements to consider when choosing the look.",
    durationLabel: "4–6 hours", image: "knotless-braids",
  },
  {
    slug: "flat-twists", name: "Flat Twists", category: "protective-styling",
    summary: "Texture, shaped close to the scalp.",
    description: "Sections of hair twisted along the scalp into a defined pattern. The direction and parting can shape a simple finish or an updo.",
    durationLabel: "1½–2½ hours",
  },
  {
    slug: "deep-conditioning", name: "Deep Conditioning Treatment", category: "natural-haircare",
    summary: "A pause for conditioning care.",
    description: "A cleansing and conditioning session, with time set aside for product application and rinsing. A care-focused option rather than a particular finished hairstyle.",
    durationLabel: "45–60 minutes", image: "amber-haircare-still-life",
  },
  {
    slug: "wash-and-define", name: "Wash & Define", category: "natural-haircare",
    summary: "Make room for your curl pattern.",
    description: "Cleansing, conditioning and section-by-section styling to explore natural definition.",
    durationLabel: "60–90 minutes", image: "defined-natural-curls",
  },
  {
    slug: "silk-press", name: "Silk Press", category: "styling-maintenance",
    summary: "Explore a smooth, straightened finish.",
    description: "Cleansing and drying followed by a temporary heat-styled finish.",
    durationLabel: "1½–2 hours", image: "silk-press",
  },
  {
    slug: "loc-retwist", name: "Loc Retwist", category: "styling-maintenance",
    summary: "Maintenance for established locs.",
    description: "Attention to the roots and partings of existing locs. A retwist is maintenance; a loc updo is a different styling choice.",
    durationLabel: "1½–2½ hours",
  },
];

export function serviceBySlug(slug: string | undefined) {
  return services.find((service) => service.slug === slug);
}

export function bookingHref(slug: ServiceSlug) {
  return `/book?service=${slug}`;
}
