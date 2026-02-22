import React, { useEffect, useMemo, useRef, useState } from "react";
import { CONTENT } from "../constants";

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
};

const lockBodyScroll = (locked: boolean) => {
  if (typeof document === "undefined") return;
  const body = document.body;
  if (!body) return;
  if (locked) {
    const scrollY = window.scrollY;
    body.dataset.scrollY = String(scrollY);
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
  } else {
    const y = Number(body.dataset.scrollY || "0");
    body.style.position = "";
    body.style.top = "";
    body.style.left = "";
    body.style.right = "";
    body.style.width = "";
    delete body.dataset.scrollY;
    window.scrollTo(0, y);
  }
};

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const navItems = useMemo(() => (CONTENT.navigation.top as any) ?? [], []);
  const cta = useMemo(() => navItems.find((x: any) => x.isCta) ?? null, [navItems]);
  const links = useMemo(() => navItems.filter((x: any) => !x.isCta), [navItems]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    lockBodyScroll(open);
    if (open) {
      setTimeout(() => closeButtonRef.current?.focus(), 0);
    } else {
      setTimeout(() => menuButtonRef.current?.focus(), 0);
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
      if (e.key === "Tab") {
        const root = dialogRef.current;
        if (!root) return;
        const focusables = root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (e.shiftKey) {
          if (active === first || !root.contains(active)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const navBase =
    "fixed top-0 left-0 w-full z-50 transition-[background,backdrop-filter,border-color,padding] duration-300";
  const navScrolled = "bg-black/80 backdrop-blur-md border-b border-white/5";
  const navTop = "bg-transparent border-b border-transparent";

  const padScrolled = "py-3";
  const padTop = "py-6";

  const linkClass =
    "text-[10px] uppercase tracking-[0.18em] text-zinc-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/15 focus-visible:ring-offset-0";
  const brandClass =
    "text-[10px] uppercase tracking-[0.2em] text-white/90 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/15";

  const ctaClass =
    "inline-flex items-center justify-center rounded-sm bg-white px-5 py-2 text-[10px] uppercase tracking-[0.18em] text-black transition-[transform,background,color,box-shadow] duration-200 hover:bg-[#ff5c00] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 active:scale-[0.98]";

  return (
    <>
      <nav className={`${navBase} ${isScrolled ? navScrolled : navTop} ${isScrolled ? padScrolled : padTop}`}>
        <div className="container-tight flex items-center">
          <div className="flex items-center gap-4">
            <a href={CONTENT.site?.homeHref ?? "#top"} className={brandClass} aria-label="Brittek home">
              Brittek
            </a>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="flex items-center gap-8 translate-x-4">
              {links.map((item: any) => (
                <a key={item.label} href={item.href} className={linkClass}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 ml-auto">
            <div className="flex flex-col items-end leading-none">
              <span className="font-technical text-[9px] text-zinc-500">{CONTENT.site.location}</span>
              <span className="font-technical text-[8px] text-zinc-600">{CONTENT.site.brandLine}</span>
            </div>
            {cta && (
              <a href={cta.href} className={ctaClass}>
                {cta.label}
              </a>
            )}
          </div>

          <div className="flex md:hidden items-center gap-3 ml-auto">
            {cta && (
              <a href={cta.href} className="inline-flex items-center rounded-sm border border-white/10 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-white/90 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/15">
                {cta.label}
              </a>
            )}

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center rounded-sm border border-white/10 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-white/90 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/15"
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              Menu
            </button>
          </div>
        </div>
      </nav>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`fixed inset-0 z-[60] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          tabIndex={open ? 0 : -1}
        />

        <div
          ref={dialogRef}
          className={[
            "absolute right-0 top-0 h-full w-full max-w-[480px]",
            "bg-black border-l border-white/10 shadow-2xl",
            "transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)",
            open ? "translate-x-0" : "translate-x-full",
            reducedMotion ? "!transition-none" : "",
          ].join(" ")}
        >
          <div className="p-8 pt-6">
            <div className="flex items-start justify-between mb-12">
              <div className="flex flex-col leading-none">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/90">Brittek</span>
                <span className="mt-2 font-technical text-[9px] text-zinc-500">{CONTENT.site.location}</span>
                <span className="mt-1 font-technical text-[8px] text-zinc-600">{CONTENT.site.brandLine}</span>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-sm border border-white/10 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-white/90 hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/15"
              >
                Close
              </button>
            </div>

            <div className="space-y-4">
              {links.map((item: any) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between rounded-sm border border-white/5 bg-white/[0.02] px-6 py-6 text-white/90 hover:bg-white/[0.05] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/15"
                >
                  <span className="text-[12px] uppercase tracking-[0.2em]">{item.label}</span>
                  <span className="text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all">→</span>
                </a>
              ))}

              {cta && (
                <a
                  href={cta.href}
                  onClick={() => setOpen(false)}
                  className="mt-6 inline-flex items-center justify-center w-full rounded-sm bg-white px-6 py-6 text-[12px] uppercase tracking-[0.2em] text-black hover:bg-[#ff5c00] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                >
                  {cta.label}
                </a>
              )}
            </div>

            <div className="mt-20 border-t border-white/5 pt-8">
              <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 leading-relaxed">
                Sydney-based engineering studio <br /> specialized in digital infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;