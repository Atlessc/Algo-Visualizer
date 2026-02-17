import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";

const INITIAL = [38, 27, 43, 3, 9, 82, 10];

const buildMergeSteps = (arr) => {
  const steps = [{ array: [...arr], range: null, message: "Initial array." }];
  const work = [...arr];

  const mergeSort = (l, r) => {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    mergeSort(l, m);
    mergeSort(m + 1, r);

    const left = work.slice(l, m + 1);
    const right = work.slice(m + 1, r + 1);
    let i = 0;
    let j = 0;
    let k = l;
    while (i < left.length && j < right.length) {
      work[k++] = left[i] <= right[j] ? left[i++] : right[j++];
    }
    while (i < left.length) work[k++] = left[i++];
    while (j < right.length) work[k++] = right[j++];

    steps.push({
      array: [...work],
      range: [l, r],
      message: `Merge sorted halves for range [${l}, ${r}].`,
    });
  };

  mergeSort(0, arr.length - 1);
  steps.push({ array: [...work], range: [0, arr.length - 1], message: "Merge sort complete." });
  return steps;
};

const MergeSortAlgo = () => {
  const [array, setArray] = useState(INITIAL);
  const steps = useMemo(() => buildMergeSteps(array), [array]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const step = steps[stepIndex];

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 900);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  const randomize = () => {
    const next = Array.from({ length: 7 }, () => Math.floor(Math.random() * 90) + 1);
    setArray(next);
    setStepIndex(0);
    setIsPlaying(true);
  };

  const maxValue = Math.max(...step.array, 1);
  const barW = 62;
  const gap = 10;
  const chartW = step.array.length * (barW + gap) + gap;

  return (
    <Container>
      <CardContainer>
        <Title>Merge Sort</Title>
        <Para>
          Merge Sort uses divide-and-conquer: split the array into halves, sort each half, then
          merge them in order. It gives predictable O(n log n) time and is stable.
        </Para>
        <Para>{step.message}</Para>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
          <button type="button" onClick={() => setIsPlaying((p) => !p)}>{isPlaying ? "Pause" : "Play"}</button>
          <button type="button" onClick={() => { setStepIndex(0); setIsPlaying(true); }}>Reset</button>
          <button type="button" onClick={randomize}>Randomize</button>
        </div>

        <AlgoVisualizer>
          <svg width="100%" viewBox={`0 0 ${chartW} 280`} preserveAspectRatio="xMidYMid meet" style={{ maxWidth: "920px", height: "auto" }}>
            {step.array.map((value, idx) => {
              const x = gap + idx * (barW + gap);
              const h = 36 + (value / maxValue) * 140;
              const y = 220 - h;
              const inRange = step.range && idx >= step.range[0] && idx <= step.range[1];
              const fill = inRange ? "#0ea5e9" : "#64748b";
              return (
                <g key={`${idx}-${value}`}>
                  <rect x={x} y={y} width={barW} height={h} rx="10" fill={fill} />
                  <text x={x + barW / 2} y={y - 8} textAnchor="middle" fill="#0f172a" fontSize="13">{value}</text>
                </g>
              );
            })}
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default MergeSortAlgo;
