import Link from "next/link";
import { conceptDisclosure } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-top">
          <Link prefetch={false} className="footer-wordmark" href="/" aria-label="ORÍ Studio home">ORÍ Studio</Link>
          <nav aria-label="Footer">
            <ul className="footer-nav">
              <li><Link prefetch={false} href="/services">Services</Link></li>
              <li><Link prefetch={false} href="/lookbook">Lookbook</Link></li>
              <li><Link prefetch={false} href="/#approach">Our Approach</Link></li>
              <li><Link prefetch={false} href="/book">Try booking</Link></li>
            </ul>
          </nav>
        </div>
        <div className="footer-bottom">
          <div>
            <p className="disclosure">{conceptDisclosure}</p>
            <p className="disclosure footer-credit">Self-initiated portfolio concept. AI-generated people and interiors.</p>
          </div>
          <a href="#top" className="text-link">Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </div>
    </footer>
  );
}
