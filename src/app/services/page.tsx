import { pageMetadata } from "@/lib/site-metadata";
import Link from "next/link";
import { CatalogueImage } from "@/components/catalogue-image";
import { ServiceEntry } from "@/components/service-entry";
import { serviceCategories, services } from "@/content/services";
import styles from "@/components/catalogue.module.css";

export const metadata = pageMetadata("Services", "Explore six fictional natural-hair care, protective styling and maintenance services. Durations are illustrative; no real appointments are accepted.", "/services");

export default function ServicesPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className={`site-container ${styles.intro} ${styles.serviceIntro}`} aria-labelledby="services-page-title">
        <div>
          <p className="text-eyebrow section-eyebrow">Services</p>
          <h1 id="services-page-title" className={`text-display ${styles.pageTitle}`}>Care for every chapter of your hair.</h1>
          <p className={`text-intro ${styles.introCopy}`}>Protective styling, natural haircare, and maintenance. Explore the approach, then try the booking preview.</p>
          <p className={styles.conceptNote}>Durations are fictional examples for this portfolio concept, not salon estimates. No real appointments are accepted.</p>
          <a className="text-link" href="#protective-styling">Explore the services <span aria-hidden="true">↓</span></a>
        </div>
        <figure className={styles.introPortrait}>
          <CatalogueImage preload name="knotless-braids" sizes="(min-width: 1200px) 480px, (min-width: 768px) 38vw, calc(100vw - 40px)" aspectRatio="4 / 5" />
          <figcaption>Knotless braids — editorial style inspiration.</figcaption>
        </figure>
      </section>
      <nav className={`site-container ${styles.categoryNavigation}`} aria-label="Service categories">
        {serviceCategories.map((category) => <a key={category.id} href={`#${category.id}`}>{category.name}</a>)}
      </nav>
      {serviceCategories.map((category, index) => (
        <section key={category.id} id={category.id} className={`site-container ${styles.categorySection}`} aria-labelledby={`${category.id}-title`}>
          <div className={styles.categoryHeading}>
            <p className="text-eyebrow section-eyebrow">0{index + 1} / Services</p>
            <h2 id={`${category.id}-title`} className="text-section">{category.name}</h2>
            <p>{category.introduction}</p>
          </div>
          <div className={styles.fullListing}>
            {services.filter((service) => service.category === category.id).map((service) => (
              <ServiceEntry key={service.slug} service={service} illustrate={service.slug === "wash-and-define" || service.slug === "silk-press"} />
            ))}
          </div>
        </section>
      ))}
      <section className={`site-container ${styles.pageClosing}`} aria-labelledby="services-closing-title">
        <h2 id="services-closing-title" className="text-subheading">Find your next expression.</h2>
        <Link href="/lookbook" className="text-link">View the lookbook <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
