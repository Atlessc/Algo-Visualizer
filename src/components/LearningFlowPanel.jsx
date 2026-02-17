import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import {
  LEARNING_DEPTHS,
  LEARNING_SECTIONS,
  getLearningFlowForAlgorithm,
} from "../data/algoLearningFlow";

function LearningFlowPanel({ algorithm }) {
  const [depth, setDepth] = useState("beginner");
  const [guidedMode, setGuidedMode] = useState(true);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const learningFlow = useMemo(
    () => getLearningFlowForAlgorithm(algorithm),
    [algorithm]
  );

  const sectionsForDepth = useMemo(
    () =>
      LEARNING_SECTIONS.map((section) => ({
        ...section,
        content: learningFlow[depth]?.[section.id] ?? "",
      })),
    [depth, learningFlow]
  );

  useEffect(() => {
    setDepth("beginner");
    setGuidedMode(true);
    setActiveStepIndex(0);
  }, [algorithm?.id]);

  useEffect(() => {
    if (activeStepIndex >= sectionsForDepth.length) {
      setActiveStepIndex(Math.max(0, sectionsForDepth.length - 1));
    }
  }, [activeStepIndex, sectionsForDepth.length]);

  const activeSection = sectionsForDepth[activeStepIndex];

  return (
    <section className="rounded-2xl border border-(--surface-border) bg-(--card-bg) p-4 shadow-lg sm:p-5">
      <p className="m-0 text-xs font-bold uppercase tracking-wider text-[(--primary-strong)]">
        Learning Flow
      </p>
      <h3 className="mb-1 mt-1 text-lg font-semibold leading-tight text-[(--text-strong)] sm:text-xl">
        Structured explanation for {algorithm.label}
      </h3>
      <p className="m-0.5 text-sm text-(--text-soft)">
        Switch depth by experience level, then use guided mode to walk through each explanation step.
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {LEARNING_DEPTHS.map((level) => (
          <Button
            key={level.id}
            type="button"
            size="sm"
            variant={depth === level.id ? "default" : "outline"}
            className="h-8 px-3"
            onClick={() => {
              setDepth(level.id);
              setActiveStepIndex(0);
            }}
            aria-pressed={depth === level.id}
          >
            {level.label}
          </Button>
        ))}
        <Button
          type="button"
          size="sm"
          variant={guidedMode ? "secondary" : "outline"}
          className="h-8 px-3"
          onClick={() => setGuidedMode((prev) => !prev)}
          aria-pressed={guidedMode}
        >
          Guided Mode: {guidedMode ? "On" : "Off"}
        </Button>
      </div>

      {guidedMode ? (
        <div className="mt-3 rounded-lg border border-(--surface-border) bg-(--card-bg-soft) p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="m-0 text-xs font-semibold uppercase tracking-wide text-(--text-soft)">
              Step {activeStepIndex + 1} of {sectionsForDepth.length}
            </p>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-8 px-2.5"
                onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                disabled={activeStepIndex === 0}
              >
                Previous Step
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-8 px-2.5"
                onClick={() =>
                  setActiveStepIndex((prev) =>
                    Math.min(sectionsForDepth.length - 1, prev + 1)
                  )
                }
                disabled={activeStepIndex === sectionsForDepth.length - 1}
              >
                Next Step
              </Button>
            </div>
          </div>
          <p className="mb-0 mt-2 text-sm font-semibold text-(--text-strong)">{activeSection?.title}</p>
          <p className="mb-0 mt-1 text-sm text-(--text-soft)">{activeSection?.content}</p>
        </div>
      ) : null}

      <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {sectionsForDepth.map((section, index) => {
          const isFocused = guidedMode && index === activeStepIndex;
          return (
            <article
              key={section.id}
              className={cn(
                "rounded-lg border p-3 transition-colors",
                isFocused
                  ? "border-(--primary) bg-(--surface-muted) shadow-sm"
                  : guidedMode
                    ? "border-(--surface-border) bg-(--card-bg) opacity-90"
                    : "border-(--surface-border) bg-(--card-bg)"
              )}
              aria-current={isFocused ? "step" : undefined}
            >
              <p className="m-0 text-xs font-bold uppercase tracking-wide text-(--muted)">
                {index + 1}. {section.title}
              </p>
              <p className="mb-0 mt-1 text-sm text-(--text-soft)">{section.content}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default LearningFlowPanel;
