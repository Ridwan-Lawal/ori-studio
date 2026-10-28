import { pageMetadata } from "@/lib/site-metadata";
import { HomeMotion } from "@/components/home-motion";
import Link from "next/link";
import { EditorialImage } from "@/components/editorial-image";
import { SectionHeading } from "@/components/section-heading";
import { approachSteps, homeFaqs, signatureServices } from "@/content/home";

export const metadata = pageMetadata("Natural-hair editorial concept", "Explore ORÍ Studio, a fictional natural-hair salon portfolio concept in Lagos. Discover services, hairstyle inspiration and a non-submitting booking preview.", "/");

export default function Home() {
  return (
    <HomeMotion><main id="main-content" tabIndex={-1}>
      <section className="site-container home-hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="text-eyebrow section-eyebrow">TEXTURE-LED HAIRCARE</p>
          <h1 id="hero-title" className="text-display">Hair deserves<br />its own <em>rhythm.</em></h1>
          <p className="text-intro hero-support">Texture-led care, considered styling, and time well spent in the chair.</p>
          <div className="hero-actions">
            <Link className="button" href="/services">Explore services</Link>
            <Link className="text-link" href="/lookbook">View the lookbook <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <EditorialImage name="hero-natural-afro" className="hero-image" sizes="(min-width: 1512px) 747px, (min-width: 768px) calc((100vw - 9vw - 32px) * 0.58), calc(100vw - 40px)" preload />
      </section>

      <section className="site-container philosophy section-space" aria-labelledby="philosophy-title">
        <div className="philosophy-copy">
          <SectionHeading id="philosophy-title" eyebrow="01 / THE PHILOSOPHY">Good hair begins<br />with <em>good care.</em></SectionHeading>
          <p className="text-intro">At ORÍ Studio, the process matters as much as the finished look. Every style begins with an understanding of your texture, your routine, and how you want to feel.</p>
        </div>
        <EditorialImage name="amber-haircare-still-life" className="philosophy-image" sizes="(min-width: 1024px) 240px, (min-width: 768px) 200px, 180px" />
      </section>

      <section className="services-section section-space" aria-labelledby="services-title">
        <div className="site-container">
          <div className="section-topline">
            <SectionHeading id="services-title" eyebrow="02 / WHAT WE DO">Care in every detail.</SectionHeading>
            <Link className="text-link" href="/services">Explore services <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="signature-services">
            <EditorialImage name="knotless-braids" className="services-image" sizes="(min-width: 1451px) 524px, (min-width: 768px) calc((91vw - 64px) * 0.4167), calc(100vw - 40px)" />
            <div className="service-list">
              {signatureServices.map((service, index) => (
                <Link className="service-row" href="/services" key={service.name}>
                  <span className="service-number" aria-hidden="true">0{index + 1}</span>
                  <div><p className="service-category">{service.category}</p><h3 className="text-subheading">{service.name}</h3></div>
                  <span className="service-arrow" aria-hidden="true">↗</span>
                </Link>
              ))}
              <p className="service-note">Protective styling, natural-hair care, styling &amp; maintenance.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="lookbook-section section-space" aria-labelledby="lookbook-title">
        <div className="site-container">
          <div className="section-topline">
            <div>
              <SectionHeading id="lookbook-title" eyebrow="03 / THE LOOKBOOK">Expressions of texture.</SectionHeading>
              <p className="lookbook-intro">A collection of styles worth considering.</p>
            </div>
            <Link className="text-link" href="/lookbook">View the lookbook <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="lookbook-composition">
            <figure className="lookbook-feature">
              <Link href="/lookbook" aria-label="Explore braided updo inspiration in the lookbook"><EditorialImage name="braided-updo-editorial" sizes="(min-width: 1400px) 700px, (min-width: 768px) calc((91vw - 64px) * 0.5833), calc(100vw - 40px)" /></Link>
              <figcaption>Braided updo</figcaption>
            </figure>
            <div className="lookbook-supporting">
              <figure className="lookbook-knots">
                <Link href="/lookbook" aria-label="Explore Bantu knots inspiration in the lookbook"><EditorialImage name="bantu-knots" objectPosition="55% 0%" sizes="(min-width: 1024px) 240px, (min-width: 768px) 180px, calc((100vw - 64px) / 2)" /></Link>
                <figcaption>Bantu knots</figcaption>
              </figure>
              <figure className="lookbook-curls">
                <Link href="/lookbook" aria-label="Explore defined curls inspiration in the lookbook"><EditorialImage name="defined-curls-daylight" sizes="(min-width: 1310px) 470px, (min-width: 768px) calc((91vw - 64px) * 0.4167), calc((100vw - 64px) / 2)" /></Link>
                <figcaption>Defined curls</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section id="approach" className="site-container approach-section section-space" aria-labelledby="approach-title">
        <SectionHeading id="approach-title" eyebrow="04 / OUR APPROACH">Thoughtful from<br /><em>start to finish.</em></SectionHeading>
        <div className="approach-content">
          <figure>
            <EditorialImage name="salon-interior-wide" sizes="(min-width: 1380px) 650px, (min-width: 768px) calc((91vw - 64px) * 0.5455), calc(100vw - 40px)" />
            <figcaption>A fictional studio, imagined.</figcaption>
          </figure>
          <ol className="approach-list">
            {approachSteps.map((step, index) => (
              <li key={step.title}>
                <span className="approach-number" aria-hidden="true">0{index + 1}</span>
                <div><h3 className="text-subheading">{step.title}</h3><p>{step.description}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="booking-introduction section-space" aria-labelledby="booking-title">
        <div className="site-container booking-content">
          <SectionHeading id="booking-title">Your next style<br /><em>begins here.</em></SectionHeading>
          <div className="booking-copy">
            <p className="text-intro">Choose a service, select your preferred appointment details, and preview your request.</p>
            <p>This is a demo booking experience. Times are preferences, not confirmed availability. No appointment will be submitted.</p>
            <Link href="/book" className="button">Try booking <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="site-container faq-section section-space" aria-labelledby="faq-title">
        <SectionHeading id="faq-title">A few things<br /><em>to know.</em></SectionHeading>
        <div className="faq-list">
          {homeFaqs.map(({ question, answer }) => (
            <details className="faq-item" name="home-faq" key={question}>
              <summary>{question}<span className="faq-indicator" aria-hidden="true" /></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta section-space" aria-labelledby="final-title">
        <div className="site-container final-content">
          <h2 id="final-title" className="text-section">Ready for your<br /><em>next look?</em></h2>
          <Link href="/book" className="button button-light">Explore booking <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main></HomeMotion>
  );
}
