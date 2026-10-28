import { pageMetadata } from "@/lib/site-metadata";
import { LookbookGallery } from "@/components/lookbook-gallery";
import styles from "@/components/catalogue.module.css";

export const metadata = pageMetadata("Lookbook", "Explore eight AI-generated hairstyle inspirations for the fictional ORÍ Studio portfolio concept. Filter styles and discover related services.", "/lookbook");

export default function LookbookPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <section className={`site-container ${styles.intro} ${styles.lookbookIntro}`} aria-labelledby="lookbook-page-title">
        <div>
          <p className="text-eyebrow section-eyebrow">Lookbook</p>
          <h1 id="lookbook-page-title" className={`text-display ${styles.pageTitle}`}>Find your next <em>expression.</em></h1>
        </div>
        <div className={styles.lookbookIntroCopy}>
          <p className="text-intro">A collection of styles worth considering.</p>
          <p className={styles.conceptNote}>AI-generated hairstyle inspiration for a fictional portfolio concept. These are not real clients or work performed by ORÍ Studio.</p>
        </div>
      </section>
      <LookbookGallery />
    </main>
  );
}
