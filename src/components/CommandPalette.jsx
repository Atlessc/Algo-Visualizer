import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { ALGO_ITEMS } from "../data/algoCatalog";
import { useNavigationUx } from "../context/useNavigationUx";

function rankItem(item, query) {
  if (!query) return 0;
  const normalized = query.toLowerCase();
  const label = item.label.toLowerCase();
  const slug = item.slug.toLowerCase();

  if (label.startsWith(normalized)) return 100;
  if (slug.startsWith(normalized)) return 92;
  if (label.includes(normalized)) return 80;
  if (slug.includes(normalized)) return 72;
  if (item.topic.toLowerCase().includes(normalized)) return 64;
  if (item.folderLabel.toLowerCase().includes(normalized)) return 50;
  return 0;
}

function CommandPalette() {
  const {
    commandOpen,
    closeCommandPalette,
    goToAlgorithm,
  } = useNavigationUx();

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    const ranked = ALGO_ITEMS.map((item) => ({
      item,
      rank: rankItem(item, normalized),
    }))
      .filter((entry) => (normalized ? entry.rank > 0 : true))
      .sort((a, b) => {
        if (normalized) {
          if (b.rank !== a.rank) return b.rank - a.rank;
        }
        if (a.item.difficultyRank !== b.item.difficultyRank) {
          return a.item.difficultyRank - b.item.difficultyRank;
        }
        return a.item.label.localeCompare(b.item.label);
      })
      .slice(0, 24)
      .map((entry) => entry.item);

    return ranked;
  }, [query]);

  useEffect(() => {
    if (!commandOpen) return;

    setQuery("");
    setActiveIndex(0);
    window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  }, [commandOpen]);

  useEffect(() => {
    if (!commandOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closeCommandPalette();
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, Math.max(0, results.length - 1)));
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
        return;
      }

      if (event.key === "Enter") {
        const selected = results[activeIndex];
        if (selected) {
          goToAlgorithm(selected.slug);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, closeCommandPalette, commandOpen, goToAlgorithm, results]);

  if (!commandOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-slate-900/45 backdrop-blur-[1px]"
        onClick={closeCommandPalette}
        aria-hidden="true"
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Algorithm command palette"
        className="fixed left-1/2 top-[13vh] z-[60] w-[min(92vw,760px)] -translate-x-1/2 rounded-2xl border border-slate-300/70 bg-white/95 p-3 shadow-2xl backdrop-blur sm:p-4"
      >
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Jump to algorithm, topic, or slug..."
            aria-label="Search algorithms"
            className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none ring-sky-500 focus-visible:ring-2"
          />
          <Button type="button" variant="secondary" size="sm" className="h-9" onClick={closeCommandPalette}>
            Close
          </Button>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="rounded bg-slate-100 px-2 py-0.5">Ctrl/Cmd + K</span>
          <span className="rounded bg-slate-100 px-2 py-0.5">Arrow keys</span>
          <span className="rounded bg-slate-100 px-2 py-0.5">Enter to open</span>
        </div>

        <p className="mb-0 mt-2 text-xs text-slate-500">
          {results.length > 0 ? `${results.length} matches` : "No matches yet"}
        </p>

        <div className="mt-2 max-h-[50vh] overflow-y-auto rounded-lg border border-slate-200/90">
          {results.length === 0 ? (
            <p className="m-0 px-3 py-3 text-sm text-slate-600">No algorithms match your search.</p>
          ) : (
            results.map((item, index) => (
              <button
                key={item.slug}
                type="button"
                className={cn(
                  "w-full border-b border-slate-200/80 bg-gradient-to-r from-sky-500/30 via-cyan-500/20 to-indigo-500/30 p-[1px] text-left last:border-b-0",
                  index === activeIndex ? "brightness-105" : "hover:brightness-105"
                )}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => goToAlgorithm(item.slug)}
              >
                <span
                  className={cn(
                    "flex w-full items-start justify-between gap-3 rounded-[10px] px-3 py-2.5",
                    index === activeIndex ? "bg-[color:var(--surface)]" : "bg-[color:var(--bg-1)]"
                  )}
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-slate-900">{item.label}</span>
                    <span className="block text-xs text-slate-500">
                      {item.folderLabel} • {item.topic} • {item.timeComplexity}
                    </span>
                  </span>
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-600">
                    /algorithms/{item.slug}
                  </span>
                </span>
              </button>
            ))
          )}
        </div>
      </section>
    </>
  );
}

export default CommandPalette;
