import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

const WORD = "banana$";

const buildSteps = () => {
  const steps = [];
  const suffixes = [];
  for (let i = 0; i < WORD.length; i++) {
    suffixes.push({ index: i, suffix: WORD.slice(i) });
    steps.push({
      suffixes: [...suffixes],
      sorted: [],
      message: `Collect suffix starting at index ${i}: "${WORD.slice(i)}".`,
    });
  }
  const sorted = [...suffixes].sort((a, b) => a.suffix.localeCompare(b.suffix));
  steps.push({ suffixes: [...suffixes], sorted, message: "Sort suffixes lexicographically to build suffix array." });
  return steps;
};

const SuffixArrayConstructionAlgo = ({ autoPlay = true, compact = false }) => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const step = steps[stepIndex];

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 1000);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>Suffix Array Construction</Title>
        <Para>
          A suffix array stores all suffix start indices in sorted order, enabling fast substring
          and pattern queries. It is a compact alternative to suffix trees for many string-search
          tasks.
        </Para>
        <Para>String: <strong>{WORD}</strong></Para>
        <Para>{step.message}</Para>
        <div className="mb-1 flex flex-wrap items-center justify-center gap-2.5">
          <Button
            type="button"
            size={compact ? "sm" : "default"}
            onClick={() => setIsPlaying((p) => !p)}
          >
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button
            type="button"
            size={compact ? "sm" : "default"}
            variant="secondary"
            onClick={() => { setStepIndex(0); setIsPlaying(true); }}
          >
            Reset
          </Button>
        </div>

        <AlgoVisualizer>
          <div className="mx-auto grid w-full max-w-[900px] gap-3">
            <div className="rounded-xl bg-indigo-100 p-2.5">
              <strong>Collected suffixes</strong>
              {step.suffixes.map((s) => (
                <div key={s.index} className={cn("mt-1.5 font-mono", compact ? "text-xs" : "text-sm")}>
                  [{s.index}] {s.suffix}
                </div>
              ))}
            </div>
            {step.sorted.length > 0 && (
              <div className="rounded-xl bg-emerald-50 p-2.5">
                <strong>Sorted suffixes (Suffix Array)</strong>
                {step.sorted.map((s) => (
                  <div key={`sorted-${s.index}`} className={cn("mt-1.5 font-mono", compact ? "text-xs" : "text-sm")}>
                    SA includes index {s.index} because suffix = {s.suffix}
                  </div>
                ))}
              </div>
            )}
          </div>
        </AlgoVisualizer>

        <CodeBlock>
          {`function buildSuffixArray(s) {
  const suffixes = [];
  for (let i = 0; i < s.length; i++) {
    suffixes.push({ index: i, suffix: s.slice(i) });
  }
  suffixes.sort((a, b) => a.suffix.localeCompare(b.suffix));
  return suffixes.map((x) => x.index);
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default SuffixArrayConstructionAlgo;
