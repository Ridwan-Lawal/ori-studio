import Link from "next/link";
import { CatalogueImage } from "@/components/catalogue-image";
import { bookingHref, type Service } from "@/content/services";
import styles from "@/components/catalogue.module.css";

export function ServiceEntry({ service, illustrate = false }: { service: Service; illustrate?: boolean }) {
  const hasPortrait = illustrate && Boolean(service.image);
  const compactPortrait = service.slug === "silk-press";
  return (
    <article id={service.slug} className={`${styles.serviceEntry} ${hasPortrait ? styles.illustratedService : ""}`} aria-labelledby={`${service.slug}-title`}>
      <div className={styles.serviceName}>
        <h3 id={`${service.slug}-title`} className="text-subheading">{service.name}</h3>
        <p>{service.summary}</p>
      </div>
      <div className={styles.serviceDescription}>
        <p>{service.description}</p>
        <p className={styles.duration}>Illustrative duration <span>{service.durationLabel}</span></p>
        <Link href={bookingHref(service.slug)} className="text-link" aria-label={`Try booking ${service.name}`}>Try booking <span aria-hidden="true">↗</span></Link>
      </div>
      {hasPortrait && service.image && (
        <figure className={`${styles.servicePortrait} ${compactPortrait ? styles.compactPortrait : ""}`}>
          <CatalogueImage name={service.image} sizes={compactPortrait ? "240px" : "(min-width: 768px) 320px, (min-width: 440px) 400px, calc(100vw - 40px)"} aspectRatio={compactPortrait ? undefined : "4 / 5"} />
          <figcaption>{service.name} — style inspiration.</figcaption>
        </figure>
      )}
    </article>
  );
}
