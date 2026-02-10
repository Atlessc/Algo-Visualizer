import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../Styled Components/styledComponents";

const INITIAL = [12, 11, 13, 5, 6, 7];

const buildSteps = (arr) => {
  const a = [...arr];
  const steps = [{ array: [...a], active: null, boundary: a.length, message: "Initial array." }];

  const heapify = (n, i) => {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;
    if (l < n && a[l] > a[largest]) largest = l;
    if (r < n && a[r] > a[largest]) largest = r;
    if (largest !== i) {
      [a[i], a[largest]] = [a[largest], a[i]];
      steps.push({ array: [...a], active: i, boundary: n, message: `Heapify swap at indices ${i} and ${largest}.` });
      heapify(n, largest);
    }
  };

  for (let i = Math.floor(a.length / 2) - 1; i >= 0; i--) heapify(a.length, i);
  steps.push({ array: [...a], active: null, boundary: a.length, message: "Max heap built." });

  for (let i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    steps.push({ array: [...a], active: i, boundary: i, message: `Move max to sorted position ${i}.` });
    heapify(i, 0);
  }

  steps.push({ array: [...a], active: null, boundary: 0, message: "Heap sort complete." });
  return steps;
};

const HeapSortAlgo = () => {
  const [source, setSource] = useState(INITIAL);
  const steps = useMemo(() => buildSteps(source), [source]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const step = steps[stepIndex];

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 800);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  const randomize = () => {
    setSource(Array.from({ length: 6 }, () => Math.floor(Math.random() * 20) + 1));
    setStepIndex(0);
    setIsPlaying(true);
  };

  const max = Math.max(...step.array, 1);
  const barW = 68;
  const gap = 10;
  const chartW = step.array.length * (barW + gap) + gap;

  return (
    <Container>
      <CardContainer>
        <Title>Heap Sort</Title>
        <Para>Build a max heap, then repeatedly extract the maximum element.</Para>
        <Para>{step.message}</Para>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
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
              if (i >= step.boundary) fill = "#16a34a";
              if (i === step.active) fill = "#f59e0b";
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
          {`function heapSort(arr) {
  buildMaxHeap(arr);
  for (let i = arr.length - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default HeapSortAlgo;
