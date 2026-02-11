import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";

const INF = 1e9;
const NODES = ["A", "B", "C", "D"];
const BASE = [
  [0, 3, INF, 7],
  [8, 0, 2, INF],
  [5, INF, 0, 1],
  [2, INF, INF, 0],
];

const buildSteps = () => {
  const dist = BASE.map((r) => [...r]);
  const steps = [{ k: -1, i: -1, j: -1, dist: dist.map((r) => [...r]), message: "Initial distance matrix." }];
  for (let k = 0; k < NODES.length; k++) {
    for (let i = 0; i < NODES.length; i++) {
      for (let j = 0; j < NODES.length; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
        steps.push({
          k, i, j,
          dist: dist.map((r) => [...r]),
          message: `Check path ${NODES[i]} → ${NODES[k]} → ${NODES[j]}.`,
        });
      }
    }
  }
  steps.push({ k: NODES.length - 1, i: -1, j: -1, dist: dist.map((r) => [...r]), message: "All-pairs shortest paths complete." });
  return steps;
};

const FloydWarshallAlgo = ({ autoPlay = true, compact = false }) => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const step = steps[stepIndex];

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 220);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  return (
    <Container>
      <CardContainer>
        <Title>Floyd-Warshall Algorithm</Title>
        <Para>Dynamic programming for shortest paths between every pair of vertices.</Para>
        <Para>{step.message}</Para>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <Button size={compact ? "sm" : "default"} variant="secondary" onClick={() => setIsPlaying((p) => !p)}>
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button
            size={compact ? "sm" : "default"}
            variant="outline"
            onClick={() => {
              setStepIndex(0);
              setIsPlaying(autoPlay);
            }}
          >
            Reset
          </Button>
        </div>

        <AlgoVisualizer>
          <div className="w-full overflow-x-auto">
            <table className="mx-auto border-collapse" style={{ minWidth: compact ? "320px" : "360px" }}>
              <thead>
                <tr>
                  <th className="border border-slate-300 p-1.5">from/to</th>
                  {NODES.map((n) => (
                    <th key={n} className="border border-slate-300 p-1.5">{n}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {step.dist.map((row, i) => (
                  <tr key={i}>
                    <th className="border border-slate-300 bg-slate-100 p-1.5">{NODES[i]}</th>
                    {row.map((v, j) => {
                      const active = i === step.i && j === step.j;
                      return (
                        <td
                          key={j}
                          className="border border-slate-300 p-1.5 text-center font-bold"
                          style={{
                            background: active ? "#0ea5e9" : "#fff",
                            color: active ? "#fff" : "#0f172a"
                          }}
                        >
                          {v >= INF / 2 ? "∞" : v}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AlgoVisualizer>

        <CodeBlock>
          {`function floydWarshall(dist) {
  const n = dist.length;
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }
  return dist;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default FloydWarshallAlgo;
