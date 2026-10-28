"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { CatalogueImage } from "@/components/catalogue-image";
import { filterLooks, looks, type Look } from "@/content/lookbook";
import { approvedImage } from "@/content/images";
import { bookingHref, serviceBySlug, serviceCategories, type ServiceCategory } from "@/content/services";
import styles from "@/components/catalogue.module.css";

export function LookbookGallery() {
  const [category, setCategory] = useState<ServiceCategory | "all">("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const search = useRef<HTMLInputElement>(null);
  const visibleLooks = filterLooks(category, query);
  const selected = looks.find((look) => look.id === selectedId);
  const selectedIndex = visibleLooks.findIndex((look) => look.id === selectedId);
  const relatedService = serviceBySlug(selected?.serviceSlug);
  const selectedCategory = serviceCategories.find((item) => item.id === selected?.category);
  const open = selectedId !== null;

  useEffect(() => {
    const activeDialog = dialog.current;
    if (!open || !activeDialog?.open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      activeDialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function openLook(look: Look, trigger: HTMLButtonElement) {
    opener.current = trigger;
    setSelectedId(look.id);
    dialog.current?.showModal();
  }

  function changeLook(direction: number) {
    if (!visibleLooks.length) return;
    const index = (selectedIndex + direction + visibleLooks.length) % visibleLooks.length;
    setSelectedId(visibleLooks[index].id);
  }

  function handleDialogKeys(event: KeyboardEvent<HTMLDialogElement>) {
    if (!event.altKey && !event.ctrlKey && !event.metaKey && ["ArrowLeft", "ArrowRight"].includes(event.key)) {
      event.preventDefault();
      changeLook(event.key === "ArrowLeft" ? -1 : 1);
    }
    if (event.key !== "Tab") return;
    const controls = event.currentTarget.querySelectorAll<HTMLButtonElement | HTMLAnchorElement>("button:not(:disabled), a[href]");
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }

  function resetFilters() {
    setCategory("all");
    setQuery("");
    search.current?.focus();
  }

  return (
    <section className={`site-container ${styles.gallerySection}`} aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className="sr-only">Hairstyle inspiration</h2>
      <div className={styles.galleryControls}>
        <div className={styles.filterGroup} role="group" aria-label="Filter styles by category">
          <button type="button" aria-pressed={category === "all"} onClick={() => setCategory("all")}>All</button>
          {serviceCategories.map((item) => <button type="button" key={item.id} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item.name}</button>)}
        </div>
        <div className={styles.searchField}>
          <label htmlFor="style-search">Find a style</label>
          <input ref={search} id="style-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the lookbook" />
        </div>
      </div>
      <p role="status" aria-live="polite" aria-atomic="true" className={styles.resultsStatus}>
        {visibleLooks.length ? `${visibleLooks.length} ${visibleLooks.length === 1 ? "look" : "looks"}` : "No styles found"}
        {` · ${category === "all" ? "All categories" : serviceCategories.find((item) => item.id === category)?.name}`}
        {query.trim() && ` · Search: ${query.trim()}`}
      </p>
      {visibleLooks.length ? (
        <ul className={styles.galleryGrid}>
          {visibleLooks.map((look) => (
            <li key={look.id} className={`${styles.galleryTile} ${styles[look.shape]}`}>
              <button type="button" className={styles.lookButton} aria-labelledby={`look-${look.id}-title look-${look.id}-category look-${look.id}-action`} aria-haspopup="dialog" onClick={(event) => openLook(look, event.currentTarget)}>
                <CatalogueImage name={look.image} sizes={look.shape === "feature" ? "(min-width: 1451px) 644px, (min-width: 768px) calc((91vw - 32px) / 2), calc(100vw - 40px)" : look.shape === "portrait" ? "(min-width: 768px) 240px, calc((100vw - 64px) / 2)" : "(min-width: 768px) 420px, calc(100vw - 40px)"} aspectRatio={look.shape === "feature" ? "4 / 5" : look.id === "long-braids" ? "8 / 5" : undefined} />
                <span className={styles.lookCaption}>
                  <span id={`look-${look.id}-title`} className={`text-subheading ${styles.lookTitle}`}>{look.title}</span>{" "}
                  <span id={`look-${look.id}-category`} className={styles.lookCategory}>{serviceCategories.find((item) => item.id === look.category)?.name}</span>{" "}
                  <span id={`look-${look.id}-action`} className={styles.lookAction}>View style <span aria-hidden="true">↗</span></span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.emptyResults}>
          <h3 className="text-subheading">A different direction?</h3>
          <p>No styles match this selection. Try another category or clear your search.</p>
          <button type="button" className="button" onClick={resetFilters}>Reset filters</button>
        </div>
      )}

      <dialog ref={dialog} className={styles.detailDialog} aria-labelledby="look-detail-title" aria-describedby="look-detail-disclosure" onKeyDown={handleDialogKeys} onClose={() => { setSelectedId(null); if (opener.current?.isConnected) opener.current.focus(); }} onClick={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.target === event.currentTarget && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.current?.close();
      }}>
        <div className={styles.dialogHeading}>
          <span className="text-eyebrow">Style detail</span>
          <button type="button" className={styles.closeDetail} onClick={() => dialog.current?.close()} autoFocus>Close <span aria-hidden="true">×</span></button>
        </div>
        {selected && (
          <>
            <div className={styles.detailContent}>
              <div className={styles.detailImageColumn}>
                <CatalogueImage key={selected.id} name={selected.image} aspectRatio={selected.id === "long-braids" ? "8 / 5" : undefined} sizes={`(min-width: 768px) ${Math.min(440, approvedImage(selected.image).recommended_max_display_width_px)}px, calc(100vw - 64px)`} />
              </div>
              <div className={styles.detailCopy}>
                <p className={styles.detailCategory}>{selectedCategory?.name}</p>
                <h2 id="look-detail-title" className="text-subheading">{selected.title}</h2>
                <p>{selected.description}</p>
                <p id="look-detail-disclosure" className={styles.conceptNote}>AI-generated concept imagery. These are not real clients or work performed by ORÍ Studio.</p>
                {relatedService ? (
                  <div className={styles.detailLinks}>
                    <Link onNavigate={() => dialog.current?.close()} className="text-link" href={`/services#${relatedService.slug}`}>Explore {relatedService.name} <span aria-hidden="true">↗</span></Link>
                    <Link onNavigate={() => dialog.current?.close()} className="button" href={bookingHref(relatedService.slug)}>Try booking {relatedService.name}</Link>
                  </div>
                ) : (
                  <div className={styles.detailLinks}>
                    <p>This inspiration look is not a separately offered service.</p>
                    <Link onNavigate={() => dialog.current?.close()} className="text-link" href={`/services#${selected.category}`}>Explore {selectedCategory?.name} <span aria-hidden="true">↗</span></Link>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.detailNavigation}>
              <button type="button" disabled={visibleLooks.length < 2} onClick={() => changeLook(-1)}>← Previous style</button>
              <p role="status" aria-live="polite" aria-atomic="true">{selectedIndex + 1} of {visibleLooks.length} · {selected.title}</p>
              <button type="button" disabled={visibleLooks.length < 2} onClick={() => changeLook(1)}>Next style →</button>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
