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
    { id: "A", x: 100, y: 70 },
    { id: "B", x: 250, y: 50 },
    { id: "C", x: 400, y: 70 },
    { id: "D", x: 150, y: 180 },
    { id: "E", x: 300, y: 180 },
    { id: "F", x: 450, y: 180 },
  ],
  edges: [
    ["A", "B"],
    ["A", "D"],
    ["B", "C"],
    ["B", "E"],
    ["C", "F"],
    ["D", "E"],
    ["E", "F"],
  ],
};

const buildAdj = () => {
  const map = new Map();
  GRAPH.nodes.forEach((n) => map.set(n.id, []));
  GRAPH.edges.forEach(([u, v]) => {
    map.get(u).push(v);
    map.get(v).push(u);
  });
  map.forEach((arr) => arr.sort());
  return map;
};

const buildSteps = (start = "A") => {
  const adj = buildAdj();
  const visited = new Set();
  const stack = [start];
  const order = [];
  const steps = [
    { stack: [...stack], visited: [], order: [], current: null, message: `Push ${start}.` },
  ];

  while (stack.length) {
    const node = stack.pop();
    if (visited.has(node)) continue;
    visited.add(node);
    order.push(node);
    steps.push({
      stack: [...stack],
      visited: [...visited],
      order: [...order],
      current: node,
      message: `Visit ${node}.`,
    });

    const neighbors = [...adj.get(node)].reverse();
    for (const nb of neighbors) {
      if (!visited.has(nb)) {
        stack.push(nb);
        steps.push({
          stack: [...stack],
          visited: [...visited],
          order: [...order],
          current: node,
          message: `Push neighbor ${nb}.`,
        });
      }
    }
  }

  steps.push({ stack: [], visited: [...visited], order: [...order], current: null, message: "DFS complete." });
  return steps;
};

const DfsAlgo = () => {
  const steps = useMemo(() => buildSteps("A"), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const step = steps[stepIndex];
  const byId = Object.fromEntries(GRAPH.nodes.map((n) => [n.id, n]));

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((prev) => Math.min(prev + 1, steps.length - 1)), 900);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>DFS (Depth-First Search)</Title>
        <Para>DFS explores one branch as deep as possible using a stack.</Para>
        <Para>{step.message}</Para>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
          <button type="button" onClick={() => setIsPlaying((p) => !p)}>{isPlaying ? "Pause" : "Play"}</button>
          <button type="button" onClick={() => { setStepIndex(0); setIsPlaying(true); }}>Reset</button>
        </div>

        <AlgoVisualizer>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", width: "100%" }}>
            <svg width="100%" viewBox="0 0 560 260" preserveAspectRatio="xMidYMid meet" style={{ maxWidth: "700px", height: "auto", flex: "2 1 380px" }}>
              {GRAPH.edges.map(([u, v]) => (
                <line key={`${u}-${v}`} x1={byId[u].x} y1={byId[u].y} x2={byId[v].x} y2={byId[v].y} stroke="#94a3b8" strokeWidth="2" />
              ))}
              {GRAPH.nodes.map((n) => {
                let fill = "#64748b";
                if (step.visited.includes(n.id)) fill = "#16a34a";
                if (step.stack.includes(n.id)) fill = "#f59e0b";
                if (step.current === n.id) fill = "#ef4444";
                return (
                  <g key={n.id}>
                    <circle cx={n.x} cy={n.y} r="20" fill={fill} />
                    <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">{n.id}</text>
                  </g>
                );
              })}
            </svg>
            <div style={{ flex: "1 1 220px", minWidth: "min(100%, 180px)" }}>
              <div style={{ marginBottom: "8px" }}><strong>Stack:</strong> {step.stack.length ? step.stack.join(" → ") : "(empty)"}</div>
              <div style={{ marginBottom: "8px" }}><strong>Visited:</strong> {step.visited.join(" → ")}</div>
              <div><strong>Traversal:</strong> {step.order.join(" → ")}</div>
            </div>
          </div>
        </AlgoVisualizer>

        <CodeBlock>
          {`function dfs(graph, start) {
  const stack = [start];
  const visited = new Set();
  const order = [];
  while (stack.length) {
    const node = stack.pop();
    if (visited.has(node)) continue;
    visited.add(node);
    order.push(node);
    for (const n of graph[node].reverse()) {
      if (!visited.has(n)) stack.push(n);
    }
  }
  return order;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default DfsAlgo;
