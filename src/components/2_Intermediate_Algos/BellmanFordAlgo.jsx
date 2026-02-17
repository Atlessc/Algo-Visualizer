import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock,
  Para,
} from "../ui/algo-primitives";

const GRAPH = {
  nodes: [
    { id: "A", x: 90, y: 80 },
    { id: "B", x: 260, y: 40 },
    { id: "C", x: 440, y: 70 },
    { id: "D", x: 210, y: 200 },
    { id: "E", x: 430, y: 200 },
  ],
  edges: [
    { from: "A", to: "B", w: 6 },
    { from: "A", to: "D", w: 7 },
    { from: "B", to: "C", w: 5 },
    { from: "B", to: "D", w: 8 },
    { from: "B", to: "E", w: -4 },
    { from: "C", to: "B", w: -2 },
    { from: "D", to: "C", w: -3 },
    { from: "D", to: "E", w: 9 },
    { from: "E", to: "A", w: 2 },
    { from: "E", to: "C", w: 7 },
  ],
};

const INF = Number.POSITIVE_INFINITY;

const buildSteps = (startNode = "A") => {
  const dist = Object.fromEntries(GRAPH.nodes.map((n) => [n.id, INF]));
  dist[startNode] = 0;
  const steps = [
    {
      iteration: 0,
      edgeIndex: -1,
      dist: { ...dist },
      updated: false,
      message: `Initialize distances from ${startNode}.`,
    },
  ];

  for (let i = 1; i <= GRAPH.nodes.length - 1; i += 1) {
    GRAPH.edges.forEach((edge, edgeIndex) => {
      const { from, to, w } = edge;
      let updated = false;
      if (dist[from] !== INF && dist[from] + w < dist[to]) {
        dist[to] = dist[from] + w;
        updated = true;
      }
      steps.push({
        iteration: i,
        edgeIndex,
        dist: { ...dist },
        updated,
        message: updated
          ? `Relax ${from}→${to} (w=${w}), distance[${to}] updated.`
          : `Check ${from}→${to} (w=${w}), no update.`,
      });
    });
  }

  steps.push({
    iteration: GRAPH.nodes.length,
    edgeIndex: -1,
    dist: { ...dist },
    updated: false,
    message: "Finished |V|-1 relaxation rounds.",
  });
  return steps;
};

const BellmanFordAlgo = () => {
  const steps = useMemo(() => buildSteps("A"), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const step = steps[stepIndex];
  const activeEdge = step.edgeIndex >= 0 ? GRAPH.edges[step.edgeIndex] : null;

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => {
      setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    }, 900);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  const byId = Object.fromEntries(GRAPH.nodes.map((n) => [n.id, n]));

  return (
    <Container>
      <CardContainer>
        <Title>Bellman-Ford Algorithm</Title>
        <Para>
          Bellman-Ford finds shortest paths from one source even when edges can be negative. It
          repeatedly relaxes all edges, and it can also detect negative cycles, which means shortest
          paths are not well-defined.
        </Para>
        <Para>{step.message}</Para>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <button type="button" onClick={() => setIsPlaying((prev) => !prev)}>
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
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", width: "100%" }}>
            <svg
              width="100%"
              viewBox="0 0 560 260"
              preserveAspectRatio="xMidYMid meet"
              style={{ maxWidth: "700px", height: "auto", flex: "2 1 380px" }}
            >
              {GRAPH.edges.map((edge, idx) => {
                const from = byId[edge.from];
                const to = byId[edge.to];
                const isActive = activeEdge && activeEdge.from === edge.from && activeEdge.to === edge.to;
                const stroke = isActive ? (step.updated ? "#16a34a" : "#f59e0b") : "#94a3b8";
                const midX = (from.x + to.x) / 2;
                const midY = (from.y + to.y) / 2;
                return (
                  <g key={`${edge.from}-${edge.to}-${idx}`}>
                    <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={stroke} strokeWidth={isActive ? 4 : 2} />
                    <text x={midX} y={midY - 4} fill="#0f172a" fontSize="12" fontWeight="700">
                      {edge.w}
                    </text>
                  </g>
                );
              })}
              {GRAPH.nodes.map((node) => (
                <g key={node.id}>
                  <circle cx={node.x} cy={node.y} r="20" fill="#334155" />
                  <text x={node.x} y={node.y + 4} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">
                    {node.id}
                  </text>
                </g>
              ))}
            </svg>

            <div style={{ flex: "1 1 200px", minWidth: "min(100%, 180px)" }}>
              <strong>Round {step.iteration}</strong>
              <div style={{ marginTop: "8px", background: "#eef2ff", borderRadius: "10px", padding: "10px" }}>
                {GRAPH.nodes.map((n) => (
                  <div key={`dist-${n.id}`} style={{ marginBottom: "6px", color: "#1e293b" }}>
                    {n.id}: {Number.isFinite(step.dist[n.id]) ? step.dist[n.id] : "∞"}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AlgoVisualizer>

        <CodeBlock>
          {`function bellmanFord(nodes, edges, start) {
  const dist = Object.fromEntries(nodes.map((n) => [n, Infinity]));
  dist[start] = 0;

  for (let i = 1; i < nodes.length; i++) {
    for (const { from, to, w } of edges) {
      if (dist[from] !== Infinity && dist[from] + w < dist[to]) {
        dist[to] = dist[from] + w;
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

export default BellmanFordAlgo;
