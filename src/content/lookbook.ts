import type { ApprovedImageName } from "@/content/images";
import type { ServiceCategory, ServiceSlug } from "@/content/services";

export type Look = {
  id: string;
  title: string;
  image: ApprovedImageName;
  category: ServiceCategory;
  description: string;
  serviceSlug?: ServiceSlug;
  shape: "feature" | "portrait" | "landscape";
};

export const looks: readonly Look[] = [
  { id: "braided-updo", title: "Braided updo", image: "braided-updo-editorial", category: "protective-styling", shape: "feature", description: "An elevated braided silhouette with two face-framing tendrils. An editorial reference for shape and parting; this updo is not a separately offered service." },
  { id: "silk-press", title: "Silk press", image: "silk-press", category: "styling-maintenance", shape: "portrait", serviceSlug: "silk-press", description: "A smooth, shoulder-length silhouette with a softly curved finish. Style inspiration for the Silk Press concept service." },
  { id: "two-strand-twists", title: "Two-strand twists", image: "two-strand-twists", category: "protective-styling", shape: "portrait", description: "Individual rope twists worn over the shoulders. These are two-strand twists, not flat twists along the scalp." },
  { id: "bantu-knots", title: "Bantu knots", image: "bantu-knots", category: "protective-styling", shape: "portrait", description: "Sculptural knots and visible sectioning, seen in profile. An inspiration look rather than a separately offered service." },
  { id: "loc-updo", title: "Loc updo", image: "loc-updo", category: "styling-maintenance", shape: "portrait", description: "Locs gathered into a high silhouette. This shows an updo, not the root maintenance of a loc retwist." },
  { id: "long-braids", title: "Long braids", image: "long-braids-side-view", category: "protective-styling", shape: "landscape", serviceSlug: "knotless-braids", description: "A side view of long braids in warm light. Explore the related Knotless Braids service for a braided direction; the image does not document a technique performed by ORÍ Studio." },
  { id: "defined-curls", title: "Defined curls", image: "defined-curls-daylight", category: "natural-haircare", shape: "landscape", serviceSlug: "wash-and-define", description: "Full curls in soft daylight. A reference for natural definition, not evidence that a wash or conditioning treatment was performed." },
  { id: "updo-profile", title: "Updo in profile", image: "updo-profile", category: "styling-maintenance", shape: "landscape", description: "An updo with face-framing twists in a dark olive setting. This is a styling reference, not a depiction of a loc-retwist treatment." },
];

export function filterLooks(category: ServiceCategory | "all", query: string, collection: readonly Look[] = looks) {
  const search = query.trim().toLocaleLowerCase("en");
  return collection.filter((look) => (category === "all" || look.category === category) &&
    `${look.title} ${look.description}`.toLocaleLowerCase("en").includes(search));
}
