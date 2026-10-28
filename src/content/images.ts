import manifest from "../../docs/ASSET_MANIFEST.json";

const selectedAssets = manifest.selected_assets;
export type ApprovedImageName =
  | "hero-natural-afro"
  | "knotless-braids"
  | "defined-natural-curls"
  | "silk-press"
  | "two-strand-twists"
  | "loc-updo"
  | "long-braids-side-view"
  | "updo-profile"
  | "styling-tools-still-life"
  | "braided-updo-editorial"
  | "bantu-knots"
  | "defined-curls-daylight"
  | "salon-interior-wide"
  | "amber-haircare-still-life";

export function approvedImage(name: ApprovedImageName) {
  const asset = selectedAssets.find((item) => item.path.endsWith(`/${name}.webp`));
  if (!asset) throw new Error(`Approved image missing from manifest: ${name}`);
  return { ...asset, src: asset.path.replace(/^public/, "") };
}
