import { Component, Suspense, lazy, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import AlgorithmSidebar from "../components/AlgorithmSidebar";
import LearningFlowPanel from "../components/LearningFlowPanel";
import { useNavigationUx } from "../context/useNavigationUx";
import { Button } from "../components/ui/button";
import { ALGO_COMPONENT_LOADERS, ALGO_SECTIONS, getAlgoBySlug } from "../data/algoCatalog";

const noop = () => {};

class VisualizerErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.handleRetry = this.handleRetry.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleRetry() {
    this.setState({ hasError: false });
  }

  render() {
    const { hasError } = this.state;
    const { children, label } = this.props;

    if (!hasError) return children;

    return (
      <div className="rounded-xl border border-red-200 bg-red-50/90 px-3 py-3 text-sm text-red-700">
        <p className="m-0 font-semibold">Visualizer failed to render: {label}</p>
        <Button type="button" size="sm" variant="secondary" className="mt-2" onClick={this.handleRetry}>
          Retry Visualizer
        </Button>
      </div>
    );
  }
}

function filterSectionsByQuery(sections, query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return sections;

  return sections
    .map((section) => {
      const nextItems = section.items.filter((item) => {
        return [item.label, item.id, item.topic, item.dataStructure, item.timeComplexity]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      });
      return {
        ...section,
        items: nextItems,
      };
    })
    .filter((section) => section.items.length > 0);
}

function AlgorithmDetail({ isTocOpen = false, setIsTocOpen = noop }) {
  const {
    isPlaybackPaused,
    registerVisitedAlgorithm,
    resetToken,
    speedMultiplier,
  } = useNavigationUx();
  const { slug } = useParams();
  const location = useLocation();
  const [sidebarQuery, setSidebarQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const item = getAlgoBySlug(slug);

  const sidebarSections = useMemo(
    () => filterSectionsByQuery(ALGO_SECTIONS, sidebarQuery),
    [sidebarQuery]
  );

  const AlgoComponent = useMemo(() => {
    if (!item) return null;
    const loader = ALGO_COMPONENT_LOADERS[item.id];
    if (typeof loader !== "function") return null;
    return lazy(loader);
  }, [item]);

  useEffect(() => {
    if (!item?.slug) return;
    registerVisitedAlgorithm(item.slug);
  }, [item?.slug, registerVisitedAlgorithm]);

  const runtimeProps = useMemo(
    () => ({
      ...(item?.props ?? {}),
      autoPlay: isPlaybackPaused ? false : item?.props?.autoPlay ?? true,
      globalSpeedMultiplier: speedMultiplier,
      globalPlaybackPaused: isPlaybackPaused,
    }),
    [isPlaybackPaused, item?.props, speedMultiplier]
  );

  if (!item) {
    return (
      <section className="rounded-[18px] border border-slate-300/70 bg-white/90 p-5 shadow-lg">
        <p className="m-0 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-red-600">Not Found</p>
        <h2 className="mb-1 mt-1 text-[clamp(1.2rem,2vw,1.8rem)] font-semibold leading-tight text-slate-900">
          This algorithm page does not exist.
        </h2>
        <p className="m-0.5 text-slate-600">Choose an existing algorithm from the catalog.</p>
        <div className="mt-3">
          <Link
            to="/algorithms"
            className="inline-flex h-10 items-center justify-center rounded-md bg-sky-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
          >
            Go to Catalog
          </Link>
        </div>
      </section>
    );
  }

  const detailPath = location.pathname;

  return (
    <div className="relative grid items-start gap-4 [grid-template-columns:clamp(176px,22vw,240px)_minmax(0,1fr)] max-[1240px]:[grid-template-columns:clamp(164px,24vw,212px)_minmax(0,1fr)] max-[1080px]:grid-cols-1">
      <AlgorithmSidebar
        sections={sidebarSections}
        currentSlug={item.slug}
        searchValue={sidebarQuery}
        onSearchChange={setSidebarQuery}
        isOpen={isTocOpen}
        onClose={() => setIsTocOpen(false)}
        title="Algorithms by Folder"
        panelId="mobile-algorithms-sidebar"
        getItemHref={(next) => `/algorithms/${next.slug}`}
      />

      <section className="flex min-w-0 flex-col gap-4">
        <div className="rounded-[18px] border border-slate-300/70 bg-gradient-to-b from-white/95 to-white/80 p-4 shadow-lg sm:p-5">
          <p className="m-0 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-blue-700">Algorithm Detail</p>
          <h2 className="mb-1 mt-1 text-[clamp(1.2rem,2vw,1.8rem)] font-semibold leading-tight text-slate-900">
            {item.label}
          </h2>
          <p className="m-0.5 text-slate-600">
            Shareable URL: <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">{detailPath}</code>
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] text-slate-700">
            <span className="rounded-full bg-slate-200 px-2 py-0.5">{item.difficulty}</span>
            <span className="rounded-full bg-sky-100 px-2 py-0.5 text-sky-900">{item.topic}</span>
            <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-indigo-900">{item.timeComplexity}</span>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-900">{item.dataStructure}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 1200);
                } catch {
                  setCopied(false);
                }
              }}
            >
              {copied ? "Link Copied" : "Copy Link"}
            </Button>
            <Link
              to="/algorithms"
              className="inline-flex h-9 items-center justify-center rounded-md border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
            >
              Back to Catalog
            </Link>
          </div>
        </div>

        <LearningFlowPanel algorithm={item} />

        {isPlaybackPaused ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50/90 px-3 py-2 text-xs text-amber-800">
            Global pause is active. Visualizers that support global controls are paused.
          </div>
        ) : null}

        <article
          id={item.id}
          key={`${item.id}-${resetToken}`}
          className="algo-anchor-target min-w-0 scroll-mt-[5.8rem]"
        >
          {AlgoComponent ? (
            <VisualizerErrorBoundary label={item.label}>
              <Suspense
                fallback={
                  <div className="rounded-xl border border-slate-300 bg-slate-50/90 px-3 py-3 text-sm text-slate-600">
                    Loading visualizer...
                  </div>
                }
              >
                <AlgoComponent {...runtimeProps} />
              </Suspense>
            </VisualizerErrorBoundary>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/80 px-3 py-3 text-sm text-slate-600">
              This visualizer is currently unavailable.
            </div>
          )}
        </article>
      </section>
    </div>
  );
}

export default AlgorithmDetail;
