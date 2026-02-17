import { Component, Suspense, lazy, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import LearningFlowPanel from "../components/LearningFlowPanel";
import { useNavigationUx } from "../context/useNavigationUx";
import { Button } from "../components/ui/button";
import { ALGO_COMPONENT_LOADERS, getAlgoBySlug } from "../data/algoCatalog";

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

function AlgorithmDetail() {
  const {
    isPlaybackPaused,
    registerVisitedAlgorithm,
    resetToken,
    speedMultiplier,
  } = useNavigationUx();
  const { slug } = useParams();
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  const item = getAlgoBySlug(slug);

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
      <section className="rounded-[18px] border border-(--surface-border) bg-(--card-bg) p-5 shadow-lg">
        <p className="m-0 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-red-600">Not Found</p>
        <h2 className="mb-1 mt-1 text-[clamp(1.2rem,2vw,1.8rem)] font-semibold leading-tight text-(--text-strong)">
          This algorithm page does not exist.
        </h2>
        <p className="m-0.5 text-(--text-soft)">Choose an existing algorithm from the catalog.</p>
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
    <section className="flex min-w-0 flex-col gap-4">
      <div className="rounded-[18px] border border-(--surface-border) bg-(--card-bg) p-4 shadow-lg sm:p-5">
        <p className="m-0 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-(--primary-strong)">Algorithm Detail</p>
        <h2 className="mb-1 mt-1 text-[clamp(1.2rem,2vw,1.8rem)] font-semibold leading-tight text-(--text-strong)">
          {item.label}
        </h2>
        <p className="m-0.5 text-(--text-soft)">
          Shareable URL: <code className="rounded bg-(--card-bg-soft) px-1.5 py-0.5 text-xs">{detailPath}</code>
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] text-(--text-soft)">
          <span className="rounded-full bg-(--surface-muted) px-2 py-0.5">{item.difficulty}</span>
          <span className="rounded-full bg-(--primary-muted) px-2 py-0.5 text-(--primary-strong)">{item.topic}</span>
          <span className="rounded-full bg-(--secondary-muted) px-2 py-0.5 text-(--secondary-strong)">{item.timeComplexity}</span>
          <span className="rounded-full bg-(--success-muted) px-2 py-0.5 text-(--success-strong)">{item.dataStructure}</span>
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
            className="inline-flex h-9 items-center justify-center rounded-md border border-(--surface-border) bg-(--card-bg) px-3 text-sm font-semibold text-(--text-strong) transition-colors hover:bg-(--card-bg-soft)"
          >
            Back to Catalog
          </Link>
          <Link
            to="/legacy-home"
            className="inline-flex h-9 items-center justify-center rounded-md border border-(--surface-border) bg-(--card-bg) px-3 text-sm font-semibold text-(--text-strong) transition-colors hover:bg-(--card-bg-soft)"
          >
            Open Scroll Page
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
                <div className="flex justify-center items-center rounded-xl border border-(--surface-border) bg-(--card-bg-soft) px-3 py-3 text-sm text-(--text-soft)">
                  Loading visualizer...
                </div>
              }
            >
              <AlgoComponent {...runtimeProps} />
            </Suspense>
          </VisualizerErrorBoundary>
        ) : (
          <div className="rounded-xl border border-dashed border-(--surface-border) bg-(--card-bg-soft) px-3 py-3 text-sm text-(--text-soft)">
            This visualizer is currently unavailable.
          </div>
        )}
      </article>
    </section>
  );
}

export default AlgorithmDetail;
