import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../Styled Components/styledComponents";

const NODES = ["A", "B", "C", "D"];
const OUT = {
  A: ["B", "C"],
  B: ["C"],
  C: ["A"],
  D: ["C", "A"],
};

const buildSteps = () => {
  const d = 0.85;
  const n = NODES.length;
  let rank = Object.fromEntries(NODES.map((x) => [x, 1 / n]));
  const steps = [{ rank: { ...rank }, msg: "Initialize equal rank." }];
  for (let iter = 1; iter <= 8; iter++) {
    const next = Object.fromEntries(NODES.map((x) => [x, (1 - d) / n]));
    NODES.forEach((u) => {
      const share = rank[u] / OUT[u].length;
      OUT[u].forEach((v) => {
        next[v] += d * share;
      });
    });
    rank = next;
    steps.push({ rank: { ...rank }, msg: `Iteration ${iter}` });
  }
  return steps;
};

const PagerankAlgorithmAlgo = () => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const step = steps[stepIndex];
  const maxRank = Math.max(...Object.values(step.rank));

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 850);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>PageRank Algorithm</Title>
        <Para>Iteratively updates node importance based on incoming rank contributions.</Para>
        <Para>{step.msg}</Para>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <button type="button" onClick={() => setIsPlaying((p) => !p)}>{isPlaying ? "Pause" : "Play"}</button>
          <button type="button" onClick={() => { setStepIndex(0); setIsPlaying(true); }}>Reset</button>
        </div>

        <AlgoVisualizer>
          <svg width="100%" viewBox="0 0 520 220" preserveAspectRatio="xMidYMid meet" style={{ maxWidth: "760px", height: "auto" }}>
            {NODES.map((n, i) => {
              const y = 30 + i * 46;
              const w = (step.rank[n] / maxRank) * 320;
              return (
                <g key={n}>
                  <text x="12" y={y + 18} fill="#0f172a" fontWeight="700">{n}</text>
                  <rect x="40" y={y} width={w} height="24" rx="8" fill="#0ea5e9" />
                  <text x={48 + w} y={y + 17} fill="#0f172a" fontFamily="monospace" fontSize="12">
                    {step.rank[n].toFixed(4)}
                  </text>
                </g>
              );
            })}
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function pageRank(graph, damping = 0.85, iters = 20) {
  const nodes = Object.keys(graph);
  const n = nodes.length;
  let rank = Object.fromEntries(nodes.map((x) => [x, 1 / n]));
  for (let t = 0; t < iters; t++) {
    const next = Object.fromEntries(nodes.map((x) => [x, (1 - damping) / n]));
    for (const u of nodes) {
      const share = rank[u] / graph[u].length;
      for (const v of graph[u]) next[v] += damping * share;
    }
    rank = next;
  }
  return rank;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default PagerankAlgorithmAlgo;
