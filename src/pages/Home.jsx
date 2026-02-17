import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { Button } from "../components/ui/button";
import { ALGO_COMPONENT_LOADERS, ALGO_SECTIONS } from "../data/algoCatalog";
import { cn } from "../lib/utils";

const noop = () => {};

const Home = ({ isTocOpen = false, setIsTocOpen = noop }) => {
  const tocGroups = useMemo(
    () => ALGO_SECTIONS.filter((section) => Array.isArray(section.items) && section.items.length > 0),
    []
  );
  const duplicateAlgoIds = useMemo(() => {
    const seenIds = new Set();
    const duplicates = new Set();
    tocGroups.forEach((group) => {
      group.items.forEach((item) => {
        if (seenIds.has(item.id)) {
          duplicates.add(item.id);
        }
        seenIds.add(item.id);
      });
    });
    return Array.from(duplicates);
  }, [tocGroups]);
  const allItems = useMemo(() => tocGroups.flatMap((group) => group.items), [tocGroups]);
  const allItemIds = useMemo(() => allItems.map((item) => item.id), [allItems]);
  const missingLoaderIds = useMemo(
    () => allItemIds.filter((id) => typeof ALGO_COMPONENT_LOADERS[id] !== "function"),
    [allItemIds]
  );
  const lazyComponentsById = useMemo(() => {
    const componentEntries = allItemIds
      .filter((id) => typeof ALGO_COMPONENT_LOADERS[id] === "function")
      .map((id) => [id, lazy(ALGO_COMPONENT_LOADERS[id])]);
    return new Map(componentEntries);
  }, [allItemIds]);
  const [activeId, setActiveId] = useState(allItems[0]?.id ?? "");
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 1080px)").matches : false
  );
  const [expandedIds, setExpandedIds] = useState(() =>
    new Set(allItems[0]?.id ? [allItems[0].id] : [])
  );

  useEffect(() => {
    if (duplicateAlgoIds.length === 0) return;
    console.warn(`[Home] Duplicate algorithm ids detected: ${duplicateAlgoIds.join(", ")}`);
  }, [duplicateAlgoIds]);

  useEffect(() => {
    if (missingLoaderIds.length === 0) return;
    console.warn(`[Home] Missing algorithm loaders for ids: ${missingLoaderIds.join(", ")}`);
  }, [missingLoaderIds]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const mediaQuery = window.matchMedia("(max-width: 1080px)");
    const onMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", onMediaQueryChange);
      return () => mediaQuery.removeEventListener("change", onMediaQueryChange);
    }

    mediaQuery.addListener(onMediaQueryChange);
    return () => mediaQuery.removeListener(onMediaQueryChange);
  }, []);

  useEffect(() => {
    setExpandedIds((prev) => {
      if (!isMobile) {
        return new Set(allItemIds);
      }

      const validIds = new Set(allItemIds);
      const next = new Set([...prev].filter((id) => validIds.has(id)));
      if (next.size === 0 && allItemIds[0]) {
        next.add(allItemIds[0]);
      }
      return next;
    });
  }, [allItemIds, isMobile]);

  useEffect(() => {
    let ticking = false;

    const getOffsetFromTop = () => {
      const nav = document.querySelector('[data-nav-root="true"]');
      const navTop = nav ? Number.parseFloat(window.getComputedStyle(nav).top || "0") || 0 : 0;
      const navHeight = nav ? nav.getBoundingClientRect().height : 0;
      return navHeight + navTop + 16;
    };

    const getCurrentInViewId = () => {
      const positions = allItems
        .map((item) => {
          const element = document.getElementById(item.id);
          if (!element) return null;
          return { id: item.id, top: element.getBoundingClientRect().top };
        })
        .filter(Boolean);

      if (positions.length === 0) return "";

      const offsetFromTop = getOffsetFromTop();
      const passed = positions.filter((position) => position.top <= offsetFromTop);
      if (passed.length > 0) {
        return passed[passed.length - 1].id;
      }
      return positions[0].id;
    };

    const updateActiveFromScroll = () => {
      const nextId = getCurrentInViewId();
      if (nextId) {
        setActiveId((prev) => (prev === nextId ? prev : nextId));
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateActiveFromScroll();
        ticking = false;
      });
    };

    const onHashChange = () => {
      const hashId = window.location.hash.replace("#", "");
      if (hashId) {
        setActiveId(hashId);
        setIsTocOpen(false);
        if (isMobile) {
          setExpandedIds((prev) => {
            if (prev.has(hashId)) return prev;
            const next = new Set(prev);
            next.add(hashId);
            return next;
          });
        }
      }
      updateActiveFromScroll();
    };

    onHashChange();
    updateActiveFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveFromScroll);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveFromScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [allItems, isMobile, setIsTocOpen]);

  useEffect(() => {
    document.body.classList.toggle("toc-open", isTocOpen);
    return () => {
      document.body.classList.remove("toc-open");
    };
  }, [isTocOpen, setIsTocOpen]);

  useEffect(() => {
    if (!isTocOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsTocOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isTocOpen, setIsTocOpen]);

  const ensureExpanded = (id) => {
    if (!isMobile || !id) return;
    setExpandedIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const toggleMobileItem = (id) => {
    if (!isMobile || !id) return;
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleTocSelect = (id, closeDrawer = false) => {
    setActiveId(id);
    ensureExpanded(id);
    if (closeDrawer) {
      setIsTocOpen(false);
    }
  };

  const isItemExpanded = (id) => !isMobile || expandedIds.has(id);

  const renderTocGroups = (onItemSelect, isMobileNav = false) =>
    tocGroups.map((group) => (
      <div key={`toc-${group.folder}`} className="flex min-w-0 flex-col">
        <p
          className={cn(
            "mb-1 mt-2 text-[0.72rem] font-bold uppercase tracking-[0.04em] text-slate-500",
            isMobileNav && "mt-2.5"
          )}
        >
          {group.title}
        </p>
        {group.items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "block w-full break-words rounded-md px-2 py-1.5 text-left text-sm leading-tight transition-colors",
              activeId === item.id
                ? "bg-gradient-to-r from-sky-600 to-cyan-500 font-semibold text-white"
                : "text-slate-700 hover:bg-slate-200/70"
            )}
            aria-current={activeId === item.id ? "true" : undefined}
            onClick={onItemSelect ? () => onItemSelect(item.id) : undefined}
          >
            {item.label}
          </a>
        ))}
      </div>
    ));

  return (
    <div className="relative grid items-start gap-4 [grid-template-columns:clamp(176px,22vw,228px)_minmax(0,1fr)] max-[1240px]:[grid-template-columns:clamp(164px,24vw,204px)_minmax(0,1fr)] max-[1080px]:grid-cols-1">
      <aside className="sticky top-[5.2rem] min-w-0 max-h-[calc(100vh-6.5rem)] overflow-y-auto rounded-xl border border-slate-300/70 bg-white/80 p-3 shadow-lg backdrop-blur-sm max-[1080px]:hidden">
        <h3 className="mb-2 text-[0.92rem] font-semibold uppercase tracking-[0.03em] text-slate-600">
          Algorithms By Folder
        </h3>
        <nav aria-label="Algorithm table of contents" className="min-w-0">
          {renderTocGroups((id) => handleTocSelect(id))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-col gap-4">
        <section className="rounded-[18px] border border-slate-300/70 bg-gradient-to-b from-white/95 to-white/80 p-4 shadow-lg sm:p-5">
          <p className="m-0 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-blue-700">
            Algorithm Playground
          </p>
          <h2 className="mb-1 mt-1 text-[clamp(1.2rem,2vw,1.8rem)] font-semibold leading-tight text-slate-900">
            Visualize how classic algorithms work step-by-step.
          </h2>
          <p className="m-0.5 text-slate-600">
            Explore searching, sorting, graph traversal, and dynamic programming with interactive
            animations.
          </p>
        </section>

        {tocGroups.map((section) => (
          <section className="flex min-w-0 flex-col gap-2" key={section.folder}>
            <h3 className="m-0 mt-1 text-[1.1rem] font-semibold text-slate-900 max-[700px]:text-[1.03rem]">
              {section.title}
            </h3>
            {section.items.map((item) => {
              const AlgoComponent = lazyComponentsById.get(item.id);
              const expanded = isItemExpanded(item.id);
              const { autoPlayOnMobile = false, ...itemProps } = item.props ?? {};
              const runtimeProps = {
                ...itemProps,
                compact: isMobile,
                autoPlay: isMobile ? autoPlayOnMobile : true,
              };

              return (
                <article id={item.id} key={item.id} className="algo-anchor-target min-w-0 scroll-mt-[5.8rem]">
                  {isMobile ? (
                    <div className="mb-2 flex min-w-0 items-center justify-between gap-3">
                      <h4 className="m-0 min-w-0 flex-1 break-words text-[0.98rem] font-semibold leading-tight text-slate-900">
                        {item.label}
                      </h4>
                      <Button
                        variant="outline"
                        size="sm"
                        className="shrink-0 whitespace-nowrap border-slate-300 bg-slate-200 text-slate-900 hover:bg-slate-300"
                        onClick={() => toggleMobileItem(item.id)}
                        aria-expanded={expanded}
                      >
                        {expanded ? "Hide Visualizer" : "Load Visualizer"}
                      </Button>
                    </div>
                  ) : null}

                  {expanded ? (
                    AlgoComponent ? (
                      <Suspense
                        fallback={
                          <div className="rounded-xl border border-slate-300 bg-slate-50/90 px-3 py-3 text-sm text-slate-600">
                            Loading visualizer...
                          </div>
                        }
                      >
                        <AlgoComponent {...runtimeProps} />
                      </Suspense>
                    ) : (
                      <div className="rounded-xl border border-red-200 bg-red-50/90 px-3 py-3 text-sm text-red-700">
                        Unable to load this visualizer right now.
                      </div>
                    )
                  ) : (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/90 px-3 py-3 text-sm text-slate-600">
                      Visualizer is collapsed on mobile to keep scrolling smooth. Tap
                      &quot;Load Visualizer&quot; to render it.
                    </div>
                  )}
                </article>
              );
            })}
          </section>
        ))}
      </div>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-900/50 transition-opacity duration-200 min-[1081px]:hidden",
          isTocOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setIsTocOpen(false)}
        aria-hidden={isTocOpen ? "false" : "true"}
      />
      <aside
        id="mobile-toc-sidebar"
        className={cn(
          "fixed right-0 top-0 z-50 flex h-dvh w-[min(92vw,360px)] flex-col border-l border-slate-300/70 bg-white p-3 shadow-2xl transition-transform duration-200 min-[1081px]:hidden max-[700px]:w-[min(96vw,360px)] max-[520px]:w-full",
          isTocOpen ? "translate-x-0" : "translate-x-[102%]"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Algorithm navigation"
      >
        <div className="mb-2 flex items-center justify-between gap-3 border-b border-slate-300/70 pb-2">
          <h3 className="m-0 text-sm font-semibold uppercase tracking-[0.03em] text-slate-700">
            Algorithms
          </h3>
          <Button variant="secondary" size="sm" onClick={() => setIsTocOpen(false)}>
            Close
          </Button>
        </div>
        <nav aria-label="Algorithm table of contents" className="overflow-y-auto pr-1">
          {renderTocGroups((id) => handleTocSelect(id, true), true)}
        </nav>
      </aside>
    </div>
  );
}

export default Home;
