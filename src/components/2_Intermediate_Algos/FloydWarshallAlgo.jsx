import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../Styled Components/styledComponents";

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

const FloydWarshallAlgo = () => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const step = steps[stepIndex];

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 220);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>Floyd-Warshall Algorithm</Title>
        <Para>Dynamic programming for shortest paths between every pair of vertices.</Para>
        <Para>{step.message}</Para>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <button type="button" onClick={() => setIsPlaying((p) => !p)}>{isPlaying ? "Pause" : "Play"}</button>
          <button type="button" onClick={() => { setStepIndex(0); setIsPlaying(true); }}>Reset</button>
        </div>

        <AlgoVisualizer>
          <div style={{ overflowX: "auto", width: "100%" }}>
            <table style={{ borderCollapse: "collapse", margin: "0 auto", minWidth: "min(100%, 360px)" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #cbd5e1", padding: "6px" }}>from/to</th>
                  {NODES.map((n) => (
                    <th key={n} style={{ border: "1px solid #cbd5e1", padding: "6px" }}>{n}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {step.dist.map((row, i) => (
                  <tr key={i}>
                    <th style={{ border: "1px solid #cbd5e1", padding: "6px", background: "#f1f5f9" }}>{NODES[i]}</th>
                    {row.map((v, j) => {
                      const active = i === step.i && j === step.j;
                      return (
                        <td
                          key={j}
                          style={{
                            border: "1px solid #cbd5e1",
                            padding: "6px",
                            textAlign: "center",
                            background: active ? "#0ea5e9" : "#fff",
                            color: active ? "#fff" : "#0f172a",
                            fontWeight: 700,
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
