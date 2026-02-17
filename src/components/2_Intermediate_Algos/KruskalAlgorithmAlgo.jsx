import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";

const GRAPH = {
  nodes: [
    { id: "A", x: 90, y: 80 },
    { id: "B", x: 250, y: 50 },
    { id: "C", x: 420, y: 80 },
    { id: "D", x: 140, y: 210 },
    { id: "E", x: 320, y: 210 },
  ],
  edges: [
    { u: "A", v: "B", w: 2 },
    { u: "A", v: "D", w: 6 },
    { u: "B", v: "C", w: 3 },
    { u: "B", v: "D", w: 8 },
    { u: "B", v: "E", w: 5 },
    { u: "C", v: "E", w: 7 },
    { u: "D", v: "E", w: 9 },
  ],
};

const keyOf = (u, v) => (u < v ? `${u}|${v}` : `${v}|${u}`);

const buildKruskalSteps = () => {
  const parent = Object.fromEntries(GRAPH.nodes.map((n) => [n.id, n.id]));
  const rank = Object.fromEntries(GRAPH.nodes.map((n) => [n.id, 0]));
  const find = (x) => {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  };
  const union = (a, b) => {
    let ra = find(a);
    let rb = find(b);
    if (ra === rb) return false;
    if (rank[ra] < rank[rb]) [ra, rb] = [rb, ra];
    parent[rb] = ra;
    if (rank[ra] === rank[rb]) rank[ra] += 1;
    return true;
  };

  const sorted = [...GRAPH.edges].sort((a, b) => a.w - b.w);
  const mst = [];
  const steps = [{ mst: [], active: null, skipped: [], message: "Sort edges by weight." }];

  sorted.forEach((e) => {
    const key = keyOf(e.u, e.v);
    const added = union(e.u, e.v);
    if (added) {
      mst.push(key);
      steps.push({ mst: [...mst], active: key, skipped: [], message: `Add edge ${e.u}-${e.v} (${e.w}).` });
    } else {
      steps.push({ mst: [...mst], active: key, skipped: [key], message: `Skip ${e.u}-${e.v}; it forms a cycle.` });
    }
  });

  steps.push({ mst: [...mst], active: null, skipped: [], message: "Kruskal complete." });
  return steps;
};

const KruskalAlgorithmAlgo = () => {
  const steps = useMemo(() => buildKruskalSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const step = steps[stepIndex];
  const byId = Object.fromEntries(GRAPH.nodes.map((n) => [n.id, n]));
  const mstSet = new Set(step.mst);
  const skippedSet = new Set(step.skipped);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 950);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>Kruskal&apos;s Algorithm</Title>
        <Para>
          Kruskal builds a minimum spanning tree by sorting edges from cheapest to most expensive.
          It adds an edge only if it does not form a cycle, until all vertices are connected.
        </Para>
        <Para>{step.message}</Para>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <button type="button" onClick={() => setIsPlaying((p) => !p)}>{isPlaying ? "Pause" : "Play"}</button>
          <button type="button" onClick={() => { setStepIndex(0); setIsPlaying(true); }}>Reset</button>
        </div>

        <AlgoVisualizer>
          <svg width="100%" viewBox="0 0 520 280" preserveAspectRatio="xMidYMid meet" style={{ maxWidth: "740px", height: "auto" }}>
            {GRAPH.edges.map((e) => {
              const key = keyOf(e.u, e.v);
              const inMst = mstSet.has(key);
              const isSkipped = skippedSet.has(key);
              const isActive = step.active === key;
              const stroke = inMst ? "#16a34a" : isSkipped ? "#ef4444" : isActive ? "#f59e0b" : "#94a3b8";
              const midX = (byId[e.u].x + byId[e.v].x) / 2;
              const midY = (byId[e.u].y + byId[e.v].y) / 2;
              return (
                <g key={key}>
                  <line x1={byId[e.u].x} y1={byId[e.u].y} x2={byId[e.v].x} y2={byId[e.v].y} stroke={stroke} strokeWidth={inMst || isActive ? 4 : 2} />
                  <text x={midX} y={midY - 4} fontSize="12" fill="#0f172a" fontWeight="700">{e.w}</text>
                </g>
              );
            })}
            {GRAPH.nodes.map((n) => (
              <g key={n.id}>
                <circle cx={n.x} cy={n.y} r="20" fill="#334155" />
                <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">{n.id}</text>
              </g>
            ))}
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function kruskalMST(nodes, edges) {
  edges.sort((a, b) => a.w - b.w);
  const dsu = new DisjointSet(nodes);
  const mst = [];
  for (const e of edges) {
    if (dsu.find(e.u) !== dsu.find(e.v)) {
      dsu.union(e.u, e.v);
      mst.push(e);
    }
  }
  return mst;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default KruskalAlgorithmAlgo;
