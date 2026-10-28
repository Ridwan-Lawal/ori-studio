import { pageMetadata } from "@/lib/site-metadata";
import { Suspense } from "react";
import { BookingQuery } from "@/components/booking/booking-query";
import { bookingDemoNote } from "@/content/booking";
import { conceptDisclosure } from "@/content/site";
import styles from "@/components/booking/booking.module.css";

export const metadata = pageMetadata("Booking preview", "Explore a fictional four-step appointment request demo. No personal information is collected and no real appointment is booked.", "/book");

export default function BookingPage() {
  return (
    <main id="main-content" tabIndex={-1} className={`site-container ${styles.page}`}>
      <section className={styles.intro} aria-labelledby="booking-page-title">
        <div>
          <p className="text-eyebrow section-eyebrow">The booking preview</p>
          <h1 id="booking-page-title" className={`text-display ${styles.pageTitle}`}>Make time for your hair.</h1>
        </div>
        <div className={styles.introCopy}>
          <p className="text-intro">{bookingDemoNote}</p>
          <p className="disclosure">{conceptDisclosure}</p>
        </div>
      </section>
      <Suspense fallback={<p className={styles.loading} role="status">Loading the booking preview…</p>}>
        <BookingQuery />
      </Suspense>
      <noscript><p>The interactive preview needs JavaScript. You can still <a className="text-link" href="/services">explore our services</a>.</p></noscript>
    </main>
  );
}
