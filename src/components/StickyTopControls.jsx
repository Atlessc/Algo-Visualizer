import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { SPEED_OPTIONS, THEME_OPTIONS } from "../context/navigationUxConstants";
import { useNavigationUx } from "../context/useNavigationUx";

function ControlsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6h16" />
      <circle cx="9" cy="6" r="2" />
      <path d="M4 12h16" />
      <circle cx="15" cy="12" r="2" />
      <path d="M4 18h16" />
      <circle cx="11" cy="18" r="2" />
    </svg>
  );
}

function StickyTopControls() {
  const location = useLocation();
  const {
    speedId,
    setSpeedId,
    isPlaybackPaused,
    togglePlaybackPaused,
    triggerReset,
    themeId,
    setThemeId,
    recentlyViewedItems,
    lastVisitedItem,
    continueWhereLeftOff,
    isAlgorithmExperienceRoute,
  } = useNavigationUx();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const onPointerDown = (event) => {
      const root = rootRef.current;
      if (root && event.target instanceof Node && !root.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const showContinueButton =
    Boolean(lastVisitedItem) && location.pathname !== `/algorithms/${lastVisitedItem?.slug}`;

  if (!isAlgorithmExperienceRoute) return null;

  return (
    <section ref={rootRef} className="sticky top-[4.95rem] z-20 mb-1 flex justify-end">
      <div className="relative">
        <Button
          type="button"
          size="sm"
          variant="secondary"
          className="h-9 gap-1.5 px-3 shadow-sm"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-haspopup="dialog"
          aria-controls="sticky-controls-panel"
          aria-expanded={isOpen ? "true" : "false"}
        >
          <ControlsIcon />
          Controls
        </Button>

        {isOpen ? (
          <div
            id="sticky-controls-panel"
            role="dialog"
            aria-label="Visualizer controls"
            className="absolute right-0 mt-2 w-[min(94vw,420px)] rounded-xl border border-slate-300/70 bg-white/95 p-3 shadow-xl backdrop-blur-sm"
          >
            <div className="grid gap-2 sm:grid-cols-2">
              <label className="inline-flex min-w-0 flex-col gap-1 text-[11px] font-semibold uppercase tracking-[0.03em] text-slate-600">
                Speed
                <select
                  value={speedId}
                  onChange={(event) => setSpeedId(event.target.value)}
                  className="h-9 rounded-md border border-slate-300 bg-white px-2 text-sm font-medium normal-case tracking-normal text-slate-900 outline-none ring-sky-500 focus-visible:ring-2"
                >
                  {SPEED_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="inline-flex min-w-0 flex-col gap-1 text-[11px] font-semibold uppercase tracking-[0.03em] text-slate-600">
                Theme
                <select
                  value={themeId}
                  onChange={(event) => setThemeId(event.target.value)}
                  className="h-9 rounded-md border border-slate-300 bg-white px-2 text-sm font-medium normal-case tracking-normal text-slate-900 outline-none ring-sky-500 focus-visible:ring-2"
                >
                  {THEME_OPTIONS.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Button type="button" size="sm" variant="secondary" className="h-8 px-2.5" onClick={togglePlaybackPaused}>
                {isPlaybackPaused ? "Play" : "Pause"}
              </Button>

              <Button type="button" size="sm" variant="outline" className="h-8 px-2.5" onClick={triggerReset}>
                Reset
              </Button>

              {showContinueButton ? (
                <Button type="button" size="sm" variant="ghost" className="h-8 px-2.5" onClick={continueWhereLeftOff}>
                  Continue: {lastVisitedItem?.label}
                </Button>
              ) : null}
            </div>

            {recentlyViewedItems.length > 0 ? (
              <div className="mt-2 border-t border-slate-200 pt-2">
                <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.03em] text-slate-500">
                  Recently Viewed
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {recentlyViewedItems.slice(0, 4).map((item) => (
                    <Link
                      key={`sticky-recent-${item.slug}`}
                      to={`/algorithms/${item.slug}`}
                      className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 hover:bg-slate-100"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default StickyTopControls;
