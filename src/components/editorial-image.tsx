import Image from "next/image";
import type { ReactEventHandler } from "react";
import { approvedImage, type ApprovedImageName } from "@/content/images";

export function EditorialImage({
  name, sizes, className = "", preload = false, objectPosition, onError,
}: {
  name: ApprovedImageName;
  sizes: string;
  className?: string;
  preload?: boolean;
  objectPosition?: string;
  onError?: ReactEventHandler<HTMLImageElement>;
}) {
  const asset = approvedImage(name);
  return (
    <div
      className={`editorial-image ${className}`}
      style={{ maxWidth: asset.recommended_max_display_width_px }}
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        sizes={sizes}
        preload={preload}
        fetchPriority={preload ? "high" : undefined}
        onError={onError}
        style={{ objectPosition: objectPosition ?? asset.object_position }}
      />
    </div>
  );
}
