import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";

const POINTS = [
  [80, 90], [95, 75], [110, 100], [130, 85],
  [280, 90], [300, 75], [320, 105], [340, 88],
];
const COLORS = ["#0ea5e9", "#ef4444"];

const dist2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;

const buildSteps = () => {
  let centroids = [[90, 60], [320, 120]];
  const steps = [];

  for (let iter = 0; iter < 4; iter++) {
    const assign = POINTS.map((p) => (dist2(p, centroids[0]) <= dist2(p, centroids[1]) ? 0 : 1));
    steps.push({ centroids: centroids.map((c) => [...c]), assign, msg: `Iteration ${iter + 1}: assign points.` });

    const groups = [[], []];
    POINTS.forEach((p, i) => groups[assign[i]].push(p));
    centroids = groups.map((g, i) =>
      g.length ? [g.reduce((s, p) => s + p[0], 0) / g.length, g.reduce((s, p) => s + p[1], 0) / g.length] : centroids[i]
    );
    steps.push({ centroids: centroids.map((c) => [...c]), assign, msg: `Iteration ${iter + 1}: recompute centroids.` });
  }
  return steps;
};

const KMeansClusteringAlgo = ({ autoPlay = true, compact = false }) => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const step = steps[stepIndex];

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 900);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>K-Means Clustering</Title>
        <Para>
          K-Means groups data into k clusters by repeating two steps: assign each point to the
          nearest centroid, then recompute each centroid as the cluster average. It stops when
          assignments stabilize.
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
            viewBox="0 0 420 190"
            preserveAspectRatio="xMidYMid meet"
            className="mx-auto h-auto w-full max-w-[700px]"
          >
            <rect x="0" y="0" width="420" height="190" fill="#f8fafc" rx="10" />
            {POINTS.map((p, i) => (
              <circle key={i} cx={p[0]} cy={p[1]} r="7" fill={COLORS[step.assign[i]]} />
            ))}
            {step.centroids.map((c, i) => (
              <g key={`c-${i}`}>
                <rect x={c[0] - 10} y={c[1] - 10} width="20" height="20" fill={COLORS[i]} />
              </g>
            ))}
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function kMeans(points, k, iters = 10) {
  let centroids = points.slice(0, k);
  for (let t = 0; t < iters; t++) {
    const groups = Array.from({ length: k }, () => []);
    for (const p of points) {
      let best = 0;
      for (let i = 1; i < k; i++) {
        if (distance(p, centroids[i]) < distance(p, centroids[best])) best = i;
      }
      groups[best].push(p);
    }
    centroids = groups.map((g, i) => g.length ? mean(g) : centroids[i]);
  }
  return centroids;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default KMeansClusteringAlgo;
