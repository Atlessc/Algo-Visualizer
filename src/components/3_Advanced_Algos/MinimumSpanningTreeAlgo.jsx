import React, { useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

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

const edgeKey = (u, v) => (u < v ? `${u}|${v}` : `${v}|${u}`);

const kruskal = () => {
  const parent = Object.fromEntries(GRAPH.nodes.map((n) => [n.id, n.id]));
  const find = (x) => {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  };
  const union = (a, b) => {
    const ra = find(a);
    const rb = find(b);
    if (ra === rb) return false;
    parent[rb] = ra;
    return true;
  };
  const mst = [];
  let total = 0;
  [...GRAPH.edges].sort((a, b) => a.w - b.w).forEach((e) => {
    if (union(e.u, e.v)) {
      mst.push(edgeKey(e.u, e.v));
      total += e.w;
    }
  });
  return { mst, total };
};

const prim = () => {
  const visited = new Set(["A"]);
  const mst = [];
  let total = 0;
  while (visited.size < GRAPH.nodes.length) {
    let best = null;
    GRAPH.edges.forEach((e) => {
      if (visited.has(e.u) === visited.has(e.v)) return;
      if (!best || e.w < best.w) best = e;
    });
    if (!best) break;
    visited.add(best.u);
    visited.add(best.v);
    mst.push(edgeKey(best.u, best.v));
    total += best.w;
  }
  return { mst, total };
};

const MinimumSpanningTreeAlgo = () => {
  const [method, setMethod] = useState("kruskal");
  const result = useMemo(() => (method === "kruskal" ? kruskal() : prim()), [method]);
  const mstSet = new Set(result.mst);
  const byId = Object.fromEntries(GRAPH.nodes.map((n) => [n.id, n]));

  return (
    <Container>
      <CardContainer>
        <Title>Minimum Spanning Tree (MST)</Title>
        <Para>
          A Minimum Spanning Tree connects all vertices with the smallest possible total edge weight
          and no cycles. It is used to design low-cost networks like roads, cables, or pipelines.
        </Para>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <Button
            onClick={() => setMethod("kruskal")}
            variant={method === "kruskal" ? "default" : "secondary"}
            className={cn("min-w-27", method !== "kruskal" && "opacity-80")}
          >
            Kruskal
          </Button>
          <Button
            onClick={() => setMethod("prim")}
            variant={method === "prim" ? "default" : "secondary"}
            className={cn("min-w-27", method !== "prim" && "opacity-80")}
          >
            Prim
          </Button>
        </div>
        <Para>Method: <strong>{method}</strong> | Total MST weight: <strong>{result.total}</strong></Para>

        <AlgoVisualizer>
          <svg width="100%" viewBox="0 0 520 280" preserveAspectRatio="xMidYMid meet" className="mx-auto h-auto w-full max-w-175">
            {GRAPH.edges.map((e) => {
              const key = edgeKey(e.u, e.v);
              const inMst = mstSet.has(key);
              const midX = (byId[e.u].x + byId[e.v].x) / 2;
              const midY = (byId[e.u].y + byId[e.v].y) / 2;
              return (
                <g key={key}>
                  <line x1={byId[e.u].x} y1={byId[e.u].y} x2={byId[e.v].x} y2={byId[e.v].y} stroke={inMst ? "#16a34a" : "#94a3b8"} strokeWidth={inMst ? 4 : 2} />
                  <text x={midX} y={midY - 4} fontSize="12" fill="#0f172a" fontWeight="700">{e.w}</text>
                </g>
              );
            })}
            {GRAPH.nodes.map((n) => (
              <g key={n.id}>
                <circle cx={n.x} cy={n.y} r="20" fill="#334155" />
                <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#fff" fontWeight="700">{n.id}</text>
              </g>
            ))}
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function primMST(nodes, edges, start) {
  const visited = new Set([start]);
  const mst = [];
  while (visited.size < nodes.length) {
    let best = null;
    for (const e of edges) {
      const crossing = visited.has(e.u) !== visited.has(e.v);
      if (!crossing) continue;
      if (!best || e.w < best.w) best = e;
    }
    if (!best) break;
    visited.add(best.u);
    visited.add(best.v);
    mst.push(best);
  }
  return mst;
}

function kruskalMST(nodes, edges) {
  const parent = Object.fromEntries(nodes.map((n) => [n, n]));
  const find = (x) => (parent[x] === x ? x : (parent[x] = find(parent[x])));
  const union = (a, b) => {
    const ra = find(a), rb = find(b);
    if (ra === rb) return false;
    parent[rb] = ra;
    return true;
  };
  const mst = [];
  for (const e of [...edges].sort((a, b) => a.w - b.w)) {
    if (union(e.u, e.v)) mst.push(e);
  }
  return mst;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default MinimumSpanningTreeAlgo;
