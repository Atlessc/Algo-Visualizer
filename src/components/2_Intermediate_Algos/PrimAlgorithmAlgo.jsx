import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../Styled Components/styledComponents";

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

const buildPrimSteps = (start = "A") => {
  const visited = new Set([start]);
  const mst = [];
  const steps = [{ visited: [...visited], mst: [], active: null, message: `Start at ${start}.` }];

  while (visited.size < GRAPH.nodes.length) {
    let best = null;
    for (const e of GRAPH.edges) {
      const oneIn = visited.has(e.u) !== visited.has(e.v);
      if (!oneIn) continue;
      if (!best || e.w < best.w) best = e;
    }
    if (!best) break;
    steps.push({ visited: [...visited], mst: [...mst], active: `${best.u}|${best.v}`, message: `Pick min crossing edge ${best.u}-${best.v} (${best.w}).` });
    mst.push(`${best.u}|${best.v}`);
    visited.add(best.u);
    visited.add(best.v);
    steps.push({ visited: [...visited], mst: [...mst], active: `${best.u}|${best.v}`, message: `Add edge to MST.` });
  }

  steps.push({ visited: [...visited], mst: [...mst], active: null, message: "Prim complete." });
  return steps;
};

const edgeKey = (u, v) => (u < v ? `${u}|${v}` : `${v}|${u}`);

const PrimAlgorithmAlgo = () => {
  const steps = useMemo(() => buildPrimSteps("A"), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const step = steps[stepIndex];
  const byId = Object.fromEntries(GRAPH.nodes.map((n) => [n.id, n]));
  const mstSet = new Set(step.mst.map((k) => edgeKey(...k.split("|"))));
  const active = step.active ? edgeKey(...step.active.split("|")) : null;

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 950);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>Prim&apos;s Algorithm</Title>
        <Para>Grow MST from a start node by repeatedly adding the cheapest edge crossing the cut.</Para>
        <Para>{step.message}</Para>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <button type="button" onClick={() => setIsPlaying((p) => !p)}>{isPlaying ? "Pause" : "Play"}</button>
          <button type="button" onClick={() => { setStepIndex(0); setIsPlaying(true); }}>Reset</button>
        </div>

        <AlgoVisualizer>
          <svg width="100%" viewBox="0 0 520 280" preserveAspectRatio="xMidYMid meet" style={{ maxWidth: "740px", height: "auto" }}>
            {GRAPH.edges.map((e) => {
              const key = edgeKey(e.u, e.v);
              const inMst = mstSet.has(key);
              const isActive = active === key;
              const stroke = inMst ? "#16a34a" : isActive ? "#f59e0b" : "#94a3b8";
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
                <circle cx={n.x} cy={n.y} r="20" fill={step.visited.includes(n.id) ? "#0ea5e9" : "#64748b"} />
                <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">{n.id}</text>
              </g>
            ))}
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function primMST(graph, start) {
  const visited = new Set([start]);
  const mst = [];
  while (visited.size < graph.nodes.length) {
    const edge = cheapestEdgeCrossingCut(graph.edges, visited);
    mst.push(edge);
    visited.add(edge.u);
    visited.add(edge.v);
  }
  return mst;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default PrimAlgorithmAlgo;
