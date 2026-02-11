import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock,
  Para
} from "../ui/algo-primitives";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

const CHIP_COLORS = ["#e0f2fe", "#dcfce7", "#fef9c3", "#fee2e2", "#ede9fe", "#fce7f3"];

const getChipColor = (index) => CHIP_COLORS[index % CHIP_COLORS.length];

const TenXAlgoRenderer = ({
  title,
  description,
  intuition,
  complexity,
  useCase,
  steps,
  code,
  speedMs = 1300,
  autoPlay = true,
  compact = false
}) => {
  const timeline = useMemo(() => steps ?? [], [steps]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const cardMinWidth = compact ? 118 : 160;

  const currentStep = timeline[stepIndex] ?? timeline[0];

  useEffect(() => {
    if (!isPlaying || timeline.length === 0 || stepIndex >= timeline.length - 1) {
      return undefined;
    }

    const timerId = window.setInterval(() => {
      setStepIndex((prev) => Math.min(prev + 1, timeline.length - 1));
    }, speedMs);

    return () => window.clearInterval(timerId);
  }, [isPlaying, stepIndex, timeline.length, speedMs]);

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  return (
    <Container>
      <CardContainer>
        <Title>{title}</Title>
        <Para>{description}</Para>
        <Para>
          <strong>Core Intuition:</strong> {intuition}
        </Para>
        <Para>
          <strong>Time Complexity:</strong> {complexity} | <strong>Use Case:</strong> {useCase}
        </Para>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <Button size={compact ? "sm" : "default"} onClick={() => setIsPlaying((prev) => !prev)}>
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button
            size={compact ? "sm" : "default"}
            variant="secondary"
            onClick={() => {
              setStepIndex((prev) => Math.min(prev + 1, timeline.length - 1));
              setIsPlaying(false);
            }}
            disabled={timeline.length === 0 || stepIndex >= timeline.length - 1}
          >
            Next Step
          </Button>
          <Button
            size={compact ? "sm" : "default"}
            variant="outline"
            onClick={() => {
              setStepIndex(0);
              setIsPlaying(autoPlay);
            }}
            disabled={timeline.length === 0}
          >
            Reset
          </Button>
          <div className={cn("font-semibold text-slate-600", compact ? "text-xs" : "text-sm")}>
            Step {timeline.length === 0 ? 0 : stepIndex + 1} / {timeline.length}
          </div>
        </div>

        <AlgoVisualizer>
          <div
            className={cn("mx-auto grid w-full", compact ? "max-w-[760px] gap-2" : "max-w-[920px] gap-2.5")}
          >
            <div className={cn("rounded-xl border border-slate-200 bg-slate-50", compact ? "p-2" : "p-2.5")}>
              <div className="mb-1.5 font-bold text-slate-900">
                {currentStep?.title ?? "No timeline steps configured"}
              </div>
              <div className={cn("text-slate-700", compact ? "text-sm" : "text-[0.95rem]")}>
                {currentStep?.detail ?? ""}
              </div>
            </div>

            <div
              className={cn("grid", compact ? "gap-1.5" : "gap-2")}
              style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${cardMinWidth}px, 1fr))` }}
            >
              {timeline.map((step, index) => {
                const isActive = index === stepIndex;
                const isVisited = index <= stepIndex;

                return (
                  <div
                    key={`${step.title}-${index}`}
                    className={cn(
                      "flex flex-col justify-between rounded-xl text-slate-900",
                      compact ? "min-h-[66px] p-[7px]" : "min-h-[74px] p-2"
                    )}
                    style={{
                      border: isActive ? "2px solid #2563eb" : "1px solid #dbeafe",
                      background: isVisited ? getChipColor(index) : "#f8fafc"
                    }}
                  >
                    <div className={cn("font-bold", compact ? "text-xs" : "text-[0.84rem]")}>
                      {step.title}
                    </div>
                    <div className={cn("text-slate-700", compact ? "text-[0.74rem]" : "text-[0.8rem]")}>
                      {step.metric}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </AlgoVisualizer>

        <CodeBlock>{code}</CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default TenXAlgoRenderer;
