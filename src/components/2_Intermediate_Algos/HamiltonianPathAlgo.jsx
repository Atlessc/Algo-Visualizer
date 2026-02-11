import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";

const GRAPH = {
  nodes: [
    { id: "A", x: 90, y: 120 },
    { id: "B", x: 210, y: 50 },
    { id: "C", x: 330, y: 50 },
    { id: "D", x: 450, y: 120 },
    { id: "E", x: 330, y: 200 },
    { id: "F", x: 210, y: 200 },
  ],
  edges: [
    ["A", "B"], ["A", "F"],
    ["B", "C"], ["B", "F"],
    ["C", "D"], ["C", "E"],
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

const buildSteps = () => {
  const adj = buildAdj();
  const n = GRAPH.nodes.length;
  const steps = [];
  let solution = null;

  const backtrack = (path, visited) => {
    const current = path[path.length - 1];
    steps.push({ path: [...path], current, message: `At ${current}, path: ${path.join(" → ")}` });

    if (path.length === n) {
      solution = [...path];
      steps.push({ path: [...path], current, message: "Hamiltonian path found." });
      return true;
    }

    for (const next of adj.get(current)) {
      if (visited.has(next)) continue;
      visited.add(next);
      path.push(next);
      steps.push({ path: [...path], current: next, message: `Try extending to ${next}.` });
      if (backtrack(path, visited)) return true;
      path.pop();
      visited.delete(next);
      steps.push({ path: [...path], current, message: `Backtrack from ${next}.` });
    }
    return false;
  };

  const start = "A";
  backtrack([start], new Set([start]));
  if (!solution) steps.push({ path: [], current: null, message: "No Hamiltonian path found." });
  return steps;
};

const edgeKey = (u, v) => (u < v ? `${u}|${v}` : `${v}|${u}`);

const HamiltonianPathAlgo = ({ autoPlay = true, compact = false }) => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const step = steps[stepIndex];
  const byId = Object.fromEntries(GRAPH.nodes.map((n) => [n.id, n]));
  const pathEdges = new Set();
  for (let i = 0; i < step.path.length - 1; i++) pathEdges.add(edgeKey(step.path[i], step.path[i + 1]));

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
        <Title>Hamiltonian Path</Title>
        <Para>Backtracking visits each vertex exactly once.</Para>
        <Para>{step.message}</Para>
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
            viewBox="0 0 540 260"
            preserveAspectRatio="xMidYMid meet"
            className="mx-auto h-auto w-full max-w-[760px]"
          >
            {GRAPH.edges.map(([u, v]) => {
              const key = edgeKey(u, v);
              const inPath = pathEdges.has(key);
              return (
                <line
                  key={key}
                  x1={byId[u].x}
                  y1={byId[u].y}
                  x2={byId[v].x}
                  y2={byId[v].y}
                  stroke={inPath ? "#16a34a" : "#94a3b8"}
                  strokeWidth={inPath ? 4 : 2}
                />
              );
            })}
            {GRAPH.nodes.map((n) => {
              let fill = "#64748b";
              if (step.path.includes(n.id)) fill = "#0ea5e9";
              if (step.current === n.id) fill = "#ef4444";
              return (
                <g key={n.id}>
                  <circle cx={n.x} cy={n.y} r="20" fill={fill} />
                  <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">{n.id}</text>
                </g>
              );
            })}
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function hamiltonianPath(graph, path, visited) {
  if (path.length === graph.size) return true;
  const current = path[path.length - 1];
  for (const next of graph[current]) {
    if (visited.has(next)) continue;
    visited.add(next);
    path.push(next);
    if (hamiltonianPath(graph, path, visited)) return true;
    path.pop();
    visited.delete(next);
  }
  return false;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default HamiltonianPathAlgo;
