import { Button } from "./ui/button";
import { useNavigationUx } from "../context/useNavigationUx";

function MobileQuickActions({ onOpenAlgorithms }) {
  const {
    openCommandPalette,
    continueWhereLeftOff,
    lastVisitedItem,
    cycleTheme,
    isAlgorithmExperienceRoute,
  } = useNavigationUx();

  if (!isAlgorithmExperienceRoute) return null;

  return (
    <div className="pointer-events-none fixed bottom-[max(0.65rem,env(safe-area-inset-bottom))] left-1/2 z-30 w-[min(96vw,560px)] -translate-x-1/2 min-[1081px]:hidden">
      <div className="pointer-events-auto flex items-center justify-between gap-1 rounded-2xl border border-slate-300/70 bg-white/92 p-1.5 shadow-xl backdrop-blur-sm">
        <Button type="button" size="sm" variant="secondary" className="h-9 flex-1" onClick={onOpenAlgorithms}>
          Algorithms
        </Button>
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
        <Button type="button" size="sm" variant="ghost" className="h-9 flex-1" onClick={cycleTheme}>
          Theme
        </Button>
      </div>
    </div>
  );
}

export default MobileQuickActions;
