import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { SPEED_OPTIONS, THEME_OPTIONS } from "../context/navigationUxConstants";
import { useNavigationUx } from "../context/useNavigationUx";

function StickyTopControls() {
  const location = useLocation();
  const {
    speedId,
    setSpeedId,
    isPlaybackPaused,
    togglePlaybackPaused,
    triggerReset,
    themeId,
    cycleTheme,
    recentlyViewedItems,
    lastVisitedItem,
    continueWhereLeftOff,
    isAlgorithmExperienceRoute,
  } = useNavigationUx();

  if (!isAlgorithmExperienceRoute) return null;

  const currentThemeLabel =
    THEME_OPTIONS.find((theme) => theme.id === themeId)?.label ?? "Light";

  const showContinueButton =
    Boolean(lastVisitedItem) && location.pathname !== `/algorithms/${lastVisitedItem?.slug}`;

  return (
    <section className="sticky top-[4.95rem] z-20 rounded-xl border border-slate-300/70 bg-white/90 p-2 shadow-sm backdrop-blur-sm">
      <div className="flex flex-wrap items-center gap-2">
        <label className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700">
          Speed
          <select
            value={speedId}
            onChange={(event) => setSpeedId(event.target.value)}
            className="rounded border border-slate-300 bg-white px-1.5 py-0.5 text-xs text-slate-900 outline-none"
          >
            {SPEED_OPTIONS.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <Button type="button" size="sm" variant="secondary" className="h-8 px-2.5" onClick={togglePlaybackPaused}>
          {isPlaybackPaused ? "Play" : "Pause"}
        </Button>

        <Button type="button" size="sm" variant="outline" className="h-8 px-2.5" onClick={triggerReset}>
          Reset
        </Button>

        <Button type="button" size="sm" variant="outline" className="h-8 px-2.5" onClick={cycleTheme}>
          Theme: {currentThemeLabel}
        </Button>

        {showContinueButton ? (
          <Button type="button" size="sm" variant="ghost" className="h-8 px-2.5" onClick={continueWhereLeftOff}>
            Continue: {lastVisitedItem?.label}
          </Button>
        ) : null}
      </div>

      {recentlyViewedItems.length > 0 ? (
        <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="font-semibold uppercase tracking-[0.03em] text-slate-500">Recently Viewed</span>
          {recentlyViewedItems.slice(0, 4).map((item) => (
            <Link
              key={`sticky-recent-${item.slug}`}
              to={`/algorithms/${item.slug}`}
              className="rounded-md border border-slate-300 bg-white px-2 py-1 text-slate-700 hover:bg-slate-100"
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default StickyTopControls;
