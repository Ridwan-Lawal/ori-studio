"use client";

import { useState } from "react";
import { EditorialImage } from "@/components/editorial-image";
import { approvedImage, type ApprovedImageName } from "@/content/images";
import styles from "@/components/catalogue.module.css";

export function CatalogueImage({ name, sizes, aspectRatio, className = "", preload = false }: {
  name: ApprovedImageName;
  sizes: string;
  aspectRatio?: string;
  className?: string;
  preload?: boolean;
}) {
  const asset = approvedImage(name);
  const [failed, setFailed] = useState(false);
  return (
    <div className={`${styles.mediaFrame} ${className}`} style={{ maxWidth: asset.recommended_max_display_width_px, aspectRatio: aspectRatio ?? `${asset.width} / ${asset.height}` }}>
      {failed ? (
        <div className={styles.imageFallback} role="img" aria-label={`Image unavailable. ${asset.alt}`}>
          <span>Image unavailable</span>
          <span>Details remain available.</span>
        </div>
      ) : (
        <EditorialImage preload={preload} name={name} sizes={sizes} objectPosition={name === "bantu-knots" ? "55% 0%" : undefined} onError={() => setFailed(true)} />
      )}
    </div>
  );
}
