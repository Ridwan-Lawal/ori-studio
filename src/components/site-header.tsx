"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { conceptDisclosure } from "@/content/site";

const links = [
  { href: "/services", label: "Services" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/#approach", label: "Our Approach" },
  { href: "/book", label: "Try booking" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  function closeMenu() { dialog.current?.close(); }

  function containFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = event.currentTarget.querySelectorAll<HTMLAnchorElement | HTMLButtonElement>(
      "a[href], button:not([disabled])",
    );
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  // Browser Back/Forward can change routes without invoking a menu link handler.
  useEffect(() => { dialog.current?.close(); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => { if (desktop.matches) dialog.current?.close(); };
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <>
      <header id="top" className="site-container site-header">
        <Link prefetch={false} href="/" className="wordmark" aria-label="ORÍ Studio home">ORÍ Studio</Link>
        <nav aria-label="Primary" className="desktop-navigation">
          <ul className="site-nav">
            {links.map(({ href, label }) => (
              <li key={href}>
                <Link prefetch={false} href={href} className={href === "/book" ? "button" : "nav-link"} aria-current={pathname === href ? "page" : undefined}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <button ref={trigger} type="button" className="menu-trigger" aria-expanded={open} aria-controls="mobile-navigation" aria-haspopup="dialog" onClick={() => { dialog.current?.showModal(); setOpen(true); }}>
          Menu <span aria-hidden="true" className="menu-mark"><span /><span /></span>
        </button>
      </header>
      <dialog ref={dialog} id="mobile-navigation" className="mobile-menu" aria-labelledby="menu-title" onKeyDown={containFocus} onClose={() => { setOpen(false); if (window.matchMedia("(max-width: 1023px)").matches) trigger.current?.focus(); }} onClick={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.target === event.currentTarget && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) closeMenu();
      }}>
        <div className="mobile-menu-heading">
          <h2 id="menu-title" className="wordmark">ORÍ Studio</h2>
          <button type="button" className="menu-close" onClick={closeMenu} autoFocus>Close menu <span aria-hidden="true">×</span></button>
        </div>
        <nav aria-label="Mobile">
          <ul className="mobile-menu-links">
            {links.map(({ href, label }) => (
              <li key={href}><Link prefetch={false} href={href} aria-current={pathname === href ? "page" : undefined} onClick={closeMenu}>{label}</Link></li>
            ))}
          </ul>
        </nav>
        <p className="disclosure">{conceptDisclosure}</p>
      </dialog>
    </>
  );
}
