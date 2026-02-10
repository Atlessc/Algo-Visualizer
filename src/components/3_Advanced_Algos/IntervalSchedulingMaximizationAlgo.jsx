import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../Styled Components/styledComponents";

const INTERVALS = [
  { id: "I1", s: 1, e: 3 },
  { id: "I2", s: 2, e: 5 },
  { id: "I3", s: 4, e: 7 },
  { id: "I4", s: 1, e: 8 },
  { id: "I5", s: 8, e: 9 },
  { id: "I6", s: 5, e: 9 },
];

const buildSteps = () => {
  const sorted = [...INTERVALS].sort((a, b) => a.e - b.e);
  const chosen = [];
  const steps = [{ sorted, chosen: [], active: null, msg: "Sort intervals by finish time." }];
  let lastEnd = -Infinity;
  sorted.forEach((it) => {
    if (it.s >= lastEnd) {
      chosen.push(it.id);
      lastEnd = it.e;
      steps.push({ sorted, chosen: [...chosen], active: it.id, msg: `Select ${it.id} (${it.s}, ${it.e}).` });
    } else {
      steps.push({ sorted, chosen: [...chosen], active: it.id, msg: `Skip ${it.id}; overlaps selected interval.` });
    }
  });
  steps.push({ sorted, chosen: [...chosen], active: null, msg: `Done. Maximum compatible set has ${chosen.length} intervals.` });
  return steps;
};

const IntervalSchedulingMaximizationAlgo = () => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const step = steps[stepIndex];
  const maxT = Math.max(...INTERVALS.map((x) => x.e));

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 900);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>Interval Scheduling Maximization</Title>
        <Para>
          This greedy algorithm chooses the largest possible set of non-overlapping intervals by
          always selecting the interval that finishes earliest. This locally optimal choice leads
          to a globally optimal solution for the unweighted case.
        </Para>
        <Para>{step.msg}</Para>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <button type="button" onClick={() => setIsPlaying((p) => !p)}>{isPlaying ? "Pause" : "Play"}</button>
          <button type="button" onClick={() => { setStepIndex(0); setIsPlaying(true); }}>Reset</button>
        </div>

        <AlgoVisualizer>
          <svg width="100%" viewBox="0 0 760 310" preserveAspectRatio="xMidYMid meet" style={{ maxWidth: "940px", height: "auto" }}>
            {step.sorted.map((it, i) => {
              const y = 22 + i * 45;
              const x = 80 + (it.s / maxT) * 620;
              const w = ((it.e - it.s) / maxT) * 620;
              const selected = step.chosen.includes(it.id);
              const active = step.active === it.id;
              const fill = active ? "#0ea5e9" : selected ? "#16a34a" : "#94a3b8";
              return (
                <g key={it.id}>
                  <text x="10" y={y + 18} fontSize="13" fill="#0f172a" fontWeight="700">{it.id}</text>
                  <rect x={x} y={y} width={Math.max(8, w)} height="24" rx="8" fill={fill} />
                  <text x={x + 6} y={y + 17} fontSize="12" fill="#fff">{it.s}-{it.e}</text>
                </g>
              );
            })}
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function intervalScheduling(intervals) {
  intervals.sort((a, b) => a.end - b.end);
  const selected = [];
  let lastEnd = -Infinity;
  for (const it of intervals) {
    if (it.start >= lastEnd) {
      selected.push(it);
      lastEnd = it.end;
    }
  }
  return selected;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default IntervalSchedulingMaximizationAlgo;
