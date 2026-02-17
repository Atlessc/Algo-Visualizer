import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";

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

const PagerankAlgorithmAlgo = ({ autoPlay = true, compact = false }) => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const step = steps[stepIndex];
  const maxRank = Math.max(...Object.values(step.rank));

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 850);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>PageRank Algorithm</Title>
        <Para>
          PageRank scores node importance by repeatedly distributing rank through incoming links. A
          node gets high rank when many important nodes point to it, not just when it has many
          links.
        </Para>
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
          <svg
            width="100%"
            viewBox="0 0 520 220"
            preserveAspectRatio="xMidYMid meet"
            className="mx-auto h-auto w-full max-w-[760px]"
          >
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
