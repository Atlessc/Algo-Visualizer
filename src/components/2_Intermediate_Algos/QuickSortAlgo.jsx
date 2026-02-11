import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";

const INITIAL = [29, 10, 14, 37, 13, 5, 41];

const buildQuickSteps = (arr) => {
  const work = [...arr];
  const steps = [{ array: [...work], pivot: null, active: null, message: "Initial array." }];

  const partition = (lo, hi) => {
    const pivot = work[hi];
    let i = lo;
    for (let j = lo; j < hi; j++) {
      steps.push({ array: [...work], pivot: hi, active: j, message: `Compare ${work[j]} with pivot ${pivot}.` });
      if (work[j] < pivot) {
        [work[i], work[j]] = [work[j], work[i]];
        steps.push({ array: [...work], pivot: hi, active: i, message: `Swap into left partition.` });
        i++;
      }
    }
    [work[i], work[hi]] = [work[hi], work[i]];
    steps.push({ array: [...work], pivot: i, active: null, message: `Place pivot at index ${i}.` });
    return i;
  };

  const quick = (lo, hi) => {
    if (lo >= hi) return;
    const p = partition(lo, hi);
    quick(lo, p - 1);
    quick(p + 1, hi);
  };
  quick(0, work.length - 1);
  steps.push({ array: [...work], pivot: null, active: null, message: "Quick sort complete." });
  return steps;
};

const QuickSortAlgo = () => {
  const [array, setArray] = useState(INITIAL);
  const steps = useMemo(() => buildQuickSteps(array), [array]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const step = steps[stepIndex];

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 850);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  const randomize = () => {
    setArray(Array.from({ length: 7 }, () => Math.floor(Math.random() * 50) + 1));
    setStepIndex(0);
    setIsPlaying(true);
  };

  const max = Math.max(...step.array, 1);
  const barW = 62;
  const gap = 10;
  const chartW = step.array.length * (barW + gap) + gap;

  return (
    <Container>
      <CardContainer>
        <Title>Quick Sort</Title>
        <Para>Partition around a pivot, then recursively sort left and right partitions.</Para>
        <Para>{step.message}</Para>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
          <button type="button" onClick={() => setIsPlaying((p) => !p)}>{isPlaying ? "Pause" : "Play"}</button>
          <button type="button" onClick={() => { setStepIndex(0); setIsPlaying(true); }}>Reset</button>
          <button type="button" onClick={randomize}>Randomize</button>
        </div>

        <AlgoVisualizer>
          <svg width="100%" viewBox={`0 0 ${chartW} 280`} preserveAspectRatio="xMidYMid meet" style={{ maxWidth: "920px", height: "auto" }}>
            {step.array.map((v, i) => {
              const x = gap + i * (barW + gap);
              const h = 36 + (v / max) * 140;
              const y = 220 - h;
              let fill = "#64748b";
              if (step.active === i) fill = "#f59e0b";
              if (step.pivot === i) fill = "#ef4444";
              return (
                <g key={`${i}-${v}`}>
                  <rect x={x} y={y} width={barW} height={h} rx="10" fill={fill} />
                  <text x={x + barW / 2} y={y - 8} textAnchor="middle" fill="#0f172a" fontSize="13">{v}</text>
                </g>
              );
            })}
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function quickSort(arr, lo = 0, hi = arr.length - 1) {
  if (lo >= hi) return;
  const p = partition(arr, lo, hi);
  quickSort(arr, lo, p - 1);
  quickSort(arr, p + 1, hi);
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default QuickSortAlgo;
