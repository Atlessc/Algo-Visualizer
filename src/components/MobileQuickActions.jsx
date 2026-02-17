import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useNavigationUx } from "../context/useNavigationUx";

function MobileQuickActions({ onOpenAlgorithms, showScrollSidebarAction = false }) {
  const {
    openCommandPalette,
    continueWhereLeftOff,
    lastVisitedItem,
    isVisualizerRoute,
  } = useNavigationUx();

  if (!isVisualizerRoute) return null;

  return (
    <div className="pointer-events-none fixed bottom-[max(0.65rem,env(safe-area-inset-bottom))] left-1/2 z-30 w-[min(96vw,560px)] -translate-x-1/2 min-[1081px]:hidden">
      <div className="pointer-events-auto flex items-center justify-between gap-1 rounded-2xl border border-slate-300/70 bg-white/92 p-1.5 shadow-xl backdrop-blur-sm">
        {showScrollSidebarAction ? (
          <Button type="button" size="sm" variant="secondary" className="h-9 flex-1" onClick={onOpenAlgorithms}>
            Scroll Menu
          </Button>
        ) : (
          <Link
            to="/algorithms"
            className="inline-flex h-9 flex-1 items-center justify-center rounded-md border border-slate-300 bg-white text-sm font-semibold text-slate-900"
          >
            Catalog
          </Link>
        )}
        <Button type="button" size="sm" variant="outline" className="h-9 flex-1" onClick={openCommandPalette}>
          Search
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-9 flex-1"
          onClick={continueWhereLeftOff}
          disabled={!lastVisitedItem}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export default MobileQuickActions;
