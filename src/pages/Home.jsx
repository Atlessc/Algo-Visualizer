import {
  Component,
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AlgorithmSidebar from "../components/AlgorithmSidebar";
import { useNavigationUx } from "../context/useNavigationUx";
import { Button } from "../components/ui/button";
import {
  ALGO_COMPONENT_LOADERS,
  ALGO_ITEMS,
  ALGO_SECTIONS,
  filterAlgorithms,
  groupAlgorithmsByFolder,
} from "../data/algoCatalog";

const noop = () => {};

class AlgoCardErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
    this.handleRetry = this.handleRetry.bind(this);
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage:
        error instanceof Error && error.message
          ? error.message
          : "Unexpected visualizer rendering error.",
    };
  }

  componentDidCatch(error) {
    const { algoId } = this.props;
    console.error(`[Home] Visualizer render failure for ${algoId}`, error);
  }

  handleRetry() {
    this.setState({ hasError: false, errorMessage: "" });
    const { onRetry } = this.props;
    if (typeof onRetry === "function") {
      onRetry();
    }
  }

  render() {
    const { hasError, errorMessage } = this.state;
    const { label, children } = this.props;

    if (!hasError) return children;

    return (
      <div className="rounded-xl border border-red-200 bg-red-50/90 px-3 py-3 text-sm text-red-700">
        <p className="m-0 font-semibold">Visualizer failed to render: {label}</p>
        <p className="mb-2 mt-1 text-xs text-red-700/80">{errorMessage}</p>
        <Button type="button" variant="secondary" size="sm" onClick={this.handleRetry}>
          Retry Visualizer
        </Button>
      </div>
    );
  }
}

function Home({ isTocOpen = false, setIsTocOpen = noop }) {
  const {
    isPlaybackPaused,
    registerVisitedAlgorithm,
    resetToken,
    speedMultiplier,
  } = useNavigationUx();
  const allItems = ALGO_ITEMS;
  const allItemIds = useMemo(() => allItems.map((item) => item.id), [allItems]);
  const allItemIdsSet = useMemo(() => new Set(allItemIds), [allItemIds]);
  const prefetchedAlgoIdsRef = useRef(new Set());

  const [activeId, setActiveId] = useState(allItems[0]?.id ?? "");
  const [tocQuery, setTocQuery] = useState("");
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 1080px)").matches : false
  );
  const [renderReadyIds, setRenderReadyIds] = useState(
    () => new Set(allItemIds.slice(0, 6))
  );
  const [expandedIds, setExpandedIds] = useState(
    () => new Set(allItemIds[0] ? [allItemIds[0]] : [])
  );
  const [collapsedFolderIds, setCollapsedFolderIds] = useState(() => new Set());

  const lazyComponentsById = useMemo(() => {
    const componentEntries = allItemIds
      .filter((id) => typeof ALGO_COMPONENT_LOADERS[id] === "function")
      .map((id) => [id, lazy(ALGO_COMPONENT_LOADERS[id])]);

    return new Map(componentEntries);
  }, [allItemIds]);

  const missingLoaderIds = useMemo(
    () => allItemIds.filter((id) => typeof ALGO_COMPONENT_LOADERS[id] !== "function"),
    [allItemIds]
  );

  const itemFolderById = useMemo(() => {
    const map = new Map();
    ALGO_SECTIONS.forEach((section) => {
      section.items.forEach((item) => {
        map.set(item.id, section.folder);
      });
    });
    return map;
  }, []);

  const sidebarSections = useMemo(() => {
    const filteredItems = filterAlgorithms(ALGO_ITEMS, { query: tocQuery });
    return groupAlgorithmsByFolder(filteredItems);
  }, [tocQuery]);

  const prefetchAlgo = useCallback((id) => {
    if (!id || prefetchedAlgoIdsRef.current.has(id)) return;
    const loader = ALGO_COMPONENT_LOADERS[id];
    if (typeof loader !== "function") return;

    prefetchedAlgoIdsRef.current.add(id);
    loader().catch(() => {
      prefetchedAlgoIdsRef.current.delete(id);
    });
  }, []);

  const ensureRenderReady = useCallback(
    (id) => {
      if (!id || !allItemIdsSet.has(id)) return;
      setRenderReadyIds((prev) => {
        if (prev.has(id)) return prev;
        const next = new Set(prev);
        next.add(id);
        return next;
      });
    },
    [allItemIdsSet]
  );

  const ensureFolderExpandedForItem = useCallback(
    (id) => {
      if (!id) return;
      const folder = itemFolderById.get(id);
      if (!folder) return;

      setCollapsedFolderIds((prev) => {
        if (!prev.has(folder)) return prev;
        const next = new Set(prev);
        next.delete(folder);
        return next;
      });
    },
    [itemFolderById]
  );

  const handleTocSelect = useCallback(
    (id) => {
      if (!id) return;
      registerVisitedAlgorithm(id);
      setActiveId(id);
      prefetchAlgo(id);
      ensureRenderReady(id);
      ensureFolderExpandedForItem(id);

      if (isMobile) {
        setExpandedIds((prev) => {
          if (prev.has(id)) return prev;
          const next = new Set(prev);
          next.add(id);
          return next;
        });
      }
    },
    [ensureFolderExpandedForItem, ensureRenderReady, isMobile, prefetchAlgo, registerVisitedAlgorithm]
  );

  useEffect(() => {
    if (missingLoaderIds.length === 0) return;
    console.warn(`[Home] Missing algorithm loaders for ids: ${missingLoaderIds.join(", ")}`);
  }, [missingLoaderIds]);

  useEffect(() => {
    allItemIds.slice(0, 8).forEach((id) => prefetchAlgo(id));
  }, [allItemIds, prefetchAlgo]);

  useEffect(() => {
    setRenderReadyIds((prev) => {
      const next = new Set();
      allItemIds.forEach((id, index) => {
        if (prev.has(id) || index < 6) {
          next.add(id);
        }
      });
      return next;
    });
  }, [allItemIds]);

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
    if (typeof window === "undefined") return undefined;
    if (typeof window.IntersectionObserver !== "function") {
      setRenderReadyIds(new Set(allItemIds));
      return undefined;
    }

    const observer = new window.IntersectionObserver(
      (entries) => {
        const intersectingIds = entries
          .filter((entry) => entry.isIntersecting && entry.target instanceof HTMLElement)
          .map((entry) => entry.target.id)
          .filter((id) => id && allItemIdsSet.has(id));

        if (intersectingIds.length === 0) return;

        setRenderReadyIds((prev) => {
          const next = new Set(prev);
          let changed = false;
          intersectingIds.forEach((id) => {
            if (!next.has(id)) {
              next.add(id);
              changed = true;
            }
          });
          return changed ? next : prev;
        });
      },
      { root: null, rootMargin: "360px 0px", threshold: 0.01 }
    );

    const nodes = document.querySelectorAll(".algo-anchor-target[id]");
    nodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
    };
  }, [allItemIds, allItemIdsSet]);

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
    if (typeof window === "undefined") return undefined;

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
      if (hashId && allItemIdsSet.has(hashId)) {
        handleTocSelect(hashId);
        if (isMobile) {
          setIsTocOpen(false);
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
  }, [allItemIdsSet, allItems, handleTocSelect, isMobile, setIsTocOpen]);

  const toggleFolderCollapse = useCallback((folder) => {
    if (!folder) return;
    setCollapsedFolderIds((prev) => {
      const next = new Set(prev);
      if (next.has(folder)) {
        next.delete(folder);
      } else {
        next.add(folder);
      }
      return next;
    });
  }, []);

  const toggleMobileItem = useCallback(
    (id) => {
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
    },
    [isMobile]
  );

  return (
    <div className="relative grid items-start gap-4 [grid-template-columns:clamp(176px,22vw,228px)_minmax(0,1fr)] max-[1240px]:[grid-template-columns:clamp(164px,24vw,204px)_minmax(0,1fr)] max-[1080px]:grid-cols-1">
      <AlgorithmSidebar
        sections={sidebarSections}
        currentSlug={activeId}
        searchValue={tocQuery}
        onSearchChange={setTocQuery}
        isOpen={isTocOpen}
        onClose={() => setIsTocOpen(false)}
        onItemSelect={(item) => handleTocSelect(item.id)}
        title="Algorithms by Folder"
        panelId="mobile-toc-sidebar"
        getItemHref={(item) => `/legacy-home#${item.id}`}
      />

      <div className="flex min-w-0 flex-col gap-4">
        <section className="rounded-[18px] border border-slate-300/70 bg-gradient-to-b from-white/95 to-white/80 p-4 shadow-lg sm:p-5">
          <p className="m-0 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-blue-700">
            Legacy Long-Scroll View
          </p>
          <h2 className="mb-1 mt-1 text-[clamp(1.2rem,2vw,1.8rem)] font-semibold leading-tight text-slate-900">
            All algorithms grouped by project folders.
          </h2>
          <p className="m-0.5 text-slate-600">
            This page keeps the original long-scroll experience while sharing the same taxonomy and
            sidebar system used by the new catalog routes.
          </p>
        </section>

        {ALGO_SECTIONS.map((section) => (
          <section className="flex min-w-0 flex-col gap-2" key={section.folder}>
            <div className="mt-1 flex min-w-0 items-center justify-between gap-3">
              <h3 className="m-0 text-[1.1rem] font-semibold text-slate-900 max-[700px]:text-[1.03rem]">
                {section.title}
              </h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 px-2.5 text-xs text-slate-600"
                aria-expanded={collapsedFolderIds.has(section.folder) ? "false" : "true"}
                aria-controls={`algo-folder-panel-${section.folder}`}
                onClick={() => toggleFolderCollapse(section.folder)}
              >
                {collapsedFolderIds.has(section.folder) ? "Show Folder" : "Hide Folder"}
              </Button>
            </div>

            {collapsedFolderIds.has(section.folder) ? (
              <div
                id={`algo-folder-panel-${section.folder}`}
                className="rounded-lg border border-dashed border-slate-300 bg-slate-50/80 px-3 py-2 text-sm text-slate-600"
              >
                {section.items.length} algorithms hidden.
              </div>
            ) : (
              <div id={`algo-folder-panel-${section.folder}`} className="flex min-w-0 flex-col gap-2">
                {section.items.map((item) => {
                  const AlgoComponent = lazyComponentsById.get(item.id);
                  const expanded = !isMobile || expandedIds.has(item.id);
                  const readyToRender = renderReadyIds.has(item.id);
                  const { autoPlayOnMobile = false, ...itemProps } = item.props ?? {};
                  const runtimeProps = {
                    ...itemProps,
                    compact: isMobile,
                    autoPlay: isPlaybackPaused ? false : isMobile ? autoPlayOnMobile : true,
                    globalPlaybackPaused: isPlaybackPaused,
                    globalSpeedMultiplier: speedMultiplier,
                  };

                  return (
                    <article
                      id={item.id}
                      key={`${item.id}-${resetToken}`}
                      className="algo-anchor-target min-w-0 scroll-mt-[5.8rem]"
                    >
                      {isMobile ? (
                        <div className="mb-2 flex min-w-0 items-center justify-between gap-3">
                          <h4 className="m-0 min-w-0 flex-1 break-words text-[0.98rem] font-semibold leading-tight text-slate-900">
                            {item.label}
                          </h4>
                          <Button
                            variant="outline"
                            size="sm"
                            className="shrink-0 whitespace-nowrap border-slate-300 bg-slate-200 text-slate-900 hover:bg-slate-300"
                            onClick={() => {
                              prefetchAlgo(item.id);
                              ensureRenderReady(item.id);
                              toggleMobileItem(item.id);
                            }}
                            aria-expanded={expanded}
                          >
                            {expanded ? "Hide Visualizer" : "Load Visualizer"}
                          </Button>
                        </div>
                      ) : null}

                      {expanded ? (
                        readyToRender && AlgoComponent ? (
                          <AlgoCardErrorBoundary
                            algoId={item.id}
                            label={item.label}
                            onRetry={() => {
                              prefetchAlgo(item.id);
                              ensureRenderReady(item.id);
                            }}
                          >
                            <Suspense
                              fallback={
                                <div className="rounded-xl border border-slate-300 bg-slate-50/90 px-3 py-3 text-sm text-slate-600">
                                  Loading visualizer...
                                </div>
                              }
                            >
                              <AlgoComponent {...runtimeProps} />
                            </Suspense>
                          </AlgoCardErrorBoundary>
                        ) : (
                          <div className="rounded-xl border border-slate-300 bg-slate-50/90 px-3 py-3 text-sm text-slate-600">
                            Preparing visualizer...
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
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

export default Home;
