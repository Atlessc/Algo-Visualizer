import { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

const noop = () => {};

function AlgorithmSidebar({
  sections,
  currentSlug,
  searchValue,
  onSearchChange,
  isOpen = false,
  onClose = noop,
  onItemSelect = noop,
  title = "Algorithms",
  panelId = "mobile-algorithm-sidebar",
  getItemHref = (item) => `/algorithms/${item.slug}`,
}) {
  const drawerRef = useRef(null);
  const searchInputRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousFocusRef = useRef(null);

  const totalItemCount = useMemo(
    () => sections.reduce((sum, section) => sum + section.items.length, 0),
    [sections]
  );

  const hasSearch = typeof onSearchChange === "function";

  useEffect(() => {
    if (!isOpen) return undefined;

    const activeElement = document.activeElement;
    previousFocusRef.current = activeElement instanceof HTMLElement ? activeElement : null;

    const focusTarget = searchInputRef.current ?? closeButtonRef.current ?? drawerRef.current;
    window.requestAnimationFrame(() => {
      focusTarget?.focus();
    });

    const drawer = drawerRef.current;
    if (!drawer) return undefined;

    const getFocusableElements = () =>
      Array.from(
        drawer.querySelectorAll(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element instanceof HTMLElement && element.offsetParent !== null);

    const onDrawerKeyDown = (event) => {
      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        event.preventDefault();
        drawer.focus();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !drawer.contains(active)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    drawer.addEventListener("keydown", onDrawerKeyDown);
    return () => {
      drawer.removeEventListener("keydown", onDrawerKeyDown);
      if (previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus();
      }
      previousFocusRef.current = null;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.classList.toggle("toc-open", isOpen);
    return () => {
      document.body.classList.remove("toc-open");
    };
  }, [isOpen]);

  const renderSections = (closeOnSelect = false) => (
    sections.map((section) => (
      <div key={section.folder} className="flex min-w-0 flex-col">
        <p className="mb-1 mt-2 text-[0.72rem] font-bold uppercase tracking-[0.04em] text-slate-500">
          {section.title}
        </p>
        {section.items.map((item) => {
          const href = getItemHref(item);
          const isActive = currentSlug === item.slug;
          return (
            <Link
              key={`${section.folder}-${item.id}`}
              to={href}
              className={cn(
                "block w-full wrap-break-words rounded-md px-2 py-1.5 text-left text-sm leading-tight transition-colors",
                isActive
                  ? "bg-linear-to-r from-sky-600 to-cyan-500 font-semibold text-white"
                  : "text-slate-700 hover:bg-slate-200/70"
              )}
              aria-current={isActive ? "page" : undefined}
              onClick={() => {
                onItemSelect(item);
                if (closeOnSelect) {
                  onClose();
                }
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    ))
  );

  return (
    <>
      <aside className="sticky top-[5.2rem] hidden min-w-0 max-h-[calc(100vh-6.5rem)] overflow-y-auto rounded-xl border border-slate-300/70 bg-white/80 p-3 shadow-lg backdrop-blur-sm min-[1081px]:block">
        <h3 className="mb-2 text-[0.92rem] font-semibold uppercase tracking-[0.03em] text-slate-600">{title}</h3>
        {hasSearch ? (
          <div className="mb-2 border-b border-slate-200 pb-2">
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={searchValue}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search algorithms..."
                aria-label="Search algorithms"
                className="h-9 w-full rounded-md border border-slate-300 bg-white px-2.5 text-sm text-slate-900 outline-none ring-sky-500 focus-visible:ring-2"
              />
              {searchValue ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="shrink-0 px-2 text-xs text-slate-600"
                  onClick={() => onSearchChange("")}
                >
                  Clear
                </Button>
              ) : null}
            </div>
            <p className="mb-0 mt-1 text-[0.72rem] text-slate-500">Showing {totalItemCount}</p>
          </div>
        ) : null}
        <nav aria-label="Algorithms by folder" className="min-w-0">
          {renderSections(false)}
        </nav>
      </aside>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-900/50 transition-opacity duration-200 min-[1081px]:hidden",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden={isOpen ? "false" : "true"}
      />

      <aside
        ref={drawerRef}
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${panelId}-title`}
        tabIndex={-1}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 flex h-[min(78dvh,620px)] flex-col rounded-t-2xl border border-slate-300/70 border-b-0 bg-white p-3 pb-[calc(env(safe-area-inset-bottom)+0.8rem)] shadow-2xl transition-transform duration-200 min-[1081px]:hidden",
          isOpen ? "translate-y-0" : "translate-y-[104%]"
        )}
      >
        <div className="mx-auto mb-2 h-1.5 w-16 rounded-full bg-slate-300" aria-hidden="true" />
        <div className="mb-2 flex items-center justify-between gap-3 border-b border-slate-300/70 pb-2">
          <h3 id={`${panelId}-title`} className="m-0 text-sm font-semibold uppercase tracking-[0.03em] text-slate-700">
            {title}
          </h3>
          <Button ref={closeButtonRef} variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>

        {hasSearch ? (
          <div className="mb-2 border-b border-slate-200 pb-2">
            <div className="flex items-center gap-1.5">
              <input
                ref={searchInputRef}
                type="text"
                value={searchValue}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search algorithms..."
                aria-label="Search algorithms"
                className="h-9 w-full rounded-md border border-slate-300 bg-white px-2.5 text-sm text-slate-900 outline-none ring-sky-500 focus-visible:ring-2"
              />
              {searchValue ? (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="shrink-0 px-2 text-xs text-slate-600"
                  onClick={() => onSearchChange("")}
                >
                  Clear
                </Button>
              ) : null}
            </div>
            <p className="mb-0 mt-1 text-[0.72rem] text-slate-500">Showing {totalItemCount}</p>
          </div>
        ) : null}

        <nav aria-label="Algorithms by folder" className="overflow-y-auto pr-1">
          {renderSections(true)}
        </nav>
      </aside>
    </>
  );
}

export default AlgorithmSidebar;
