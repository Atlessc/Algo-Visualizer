import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock,
  Para,
} from "../Styled Components/styledComponents";

const GRAPH = {
  A: [
    { to: "B", w: 2 },
    { to: "C", w: 5 },
  ],
  B: [
    { to: "C", w: 1 },
    { to: "D", w: 4 },
  ],
  C: [{ to: "D", w: 1 }],
  D: [],
};

const buildSteps = () => {
  const dist = { A: 0, B: Infinity, C: Infinity, D: Infinity };
  const pq = [{ node: "A", d: 0 }];
  const steps = [
    { dist: { ...dist }, pq: [...pq], msg: "Initialize with source A." },
  ];

  while (pq.length) {
    pq.sort((a, b) => a.d - b.d);
    const cur = pq.shift();
    if (cur.d > dist[cur.node]) continue;
    steps.push({
      dist: { ...dist },
      pq: [...pq],
      current: cur.node,
      msg: `Pop ${cur.node} (${cur.d}) from priority queue.`,
    });

    for (const e of GRAPH[cur.node]) {
      const nd = dist[cur.node] + e.w;
      if (nd < dist[e.to]) {
        dist[e.to] = nd;
        pq.push({ node: e.to, d: nd });
        steps.push({
          dist: { ...dist },
          pq: [...pq],
          current: cur.node,
          msg: `Relax ${cur.node}→${e.to}, update to ${nd}.`,
        });
      }
    }
  }
  return steps;
};

const DijkstraPriorityQueueAlgo = () => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const step = steps[stepIndex];

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(
      () => setStepIndex((p) => Math.min(p + 1, steps.length - 1)),
      850,
    );
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>Dijkstra (Priority Queue)</Title>
        <Para>
          Min-priority queue always expands the closest unsettled node first.
        </Para>
        <Para>{step.msg}</Para>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button type="button" onClick={() => setIsPlaying((p) => !p)}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            onClick={() => {
              setStepIndex(0);
              setIsPlaying(true);
            }}
          >
            Reset
          </button>
        </div>

        <AlgoVisualizer>
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "#eef2ff",
                borderRadius: "12px",
                padding: "10px",
                minWidth: "min(100%, 220px)",
              }}
            >
              <strong>Distances</strong>
              {Object.entries(step.dist).map(([n, d]) => (
                <div
                  key={n}
                  style={{ marginTop: "6px", fontFamily: "monospace" }}
                >
                  {n}: {Number.isFinite(d) ? d : "∞"}
                </div>
              ))}
            </div>
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "10px",
                minWidth: "min(100%, 220px)",
              }}
            >
              <strong>Priority Queue</strong>
              {(step.pq.length
                ? [...step.pq].sort((a, b) => a.d - b.d)
                : []
              ).map((x, i) => (
                <div
                  key={`${x.node}-${i}`}
                  style={{ marginTop: "6px", fontFamily: "monospace" }}
                >
                  ({x.node}, {x.d})
                </div>
              ))}
              {step.pq.length === 0 && (
                <div style={{ marginTop: "6px" }}>(empty)</div>
              )}
            </div>
          </div>
        </AlgoVisualizer>

        <CodeBlock>
          {`function dijkstra(graph, src) {
  const dist = Object.fromEntries(Object.keys(graph).map((n) => [n, Infinity]));
  dist[src] = 0;
  const pq = [{ node: src, d: 0 }];
  while (pq.length) {
    pq.sort((a, b) => a.d - b.d);
    const { node, d } = pq.shift();
    if (d > dist[node]) continue;
    for (const { to, w } of graph[node]) {
      const nd = d + w;
      if (nd < dist[to]) {
        dist[to] = nd;
        pq.push({ node: to, d: nd });
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

export default DijkstraPriorityQueueAlgo;
