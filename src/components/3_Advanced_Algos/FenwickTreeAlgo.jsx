import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

const ARR = [3, 2, -1, 6, 5, 4, -3, 3, 7, 2, 3];

const buildSteps = () => {
  const n = ARR.length;
  const bit = Array(n + 1).fill(0);
  const steps = [{ bit: [...bit], idx: 0, msg: "Initialize BIT with zeros." }];

  const add = (i, delta) => {
    while (i <= n) {
      bit[i] += delta;
      steps.push({ bit: [...bit], idx: i, msg: `Update BIT[${i}] += ${delta}.` });
      i += i & -i;
    }
  };

  for (let i = 1; i <= n; i++) add(i, ARR[i - 1]);
  return steps;
};

const FenwickTreeAlgo = ({ autoPlay = true, compact = false }) => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const step = steps[stepIndex];

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 350);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>Fenwick Tree (Binary Indexed Tree)</Title>
        <Para>Supports prefix sums and point updates in O(log n).</Para>
        <Para>{step.msg}</Para>
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
          <div className="w-full overflow-x-auto">
            <div className="mx-auto flex min-w-[640px] justify-center gap-2">
              {step.bit.slice(1).map((v, i) => {
                const idx = i + 1;
                const active = idx === step.idx;
                return (
                  <div
                    key={idx}
                    className={cn(
                      "rounded-lg px-1 py-2 text-center font-mono",
                      compact ? "w-9" : "w-11",
                      active ? "bg-sky-500 text-white" : "bg-slate-200 text-slate-900"
                    )}
                  >
                    <div className={cn(compact ? "text-[10px]" : "text-[11px]")}>{idx}</div>
                    <div className="font-bold">{v}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </AlgoVisualizer>

        <CodeBlock>
          {`class Fenwick {
  constructor(n) { this.n = n; this.bit = Array(n + 1).fill(0); }
  add(i, delta) {
    while (i <= this.n) { this.bit[i] += delta; i += i & -i; }
  }
  sum(i) {
    let s = 0;
    while (i > 0) { s += this.bit[i]; i -= i & -i; }
    return s;
  }
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default FenwickTreeAlgo;
