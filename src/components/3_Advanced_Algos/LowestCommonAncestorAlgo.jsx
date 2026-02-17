import React, { useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { cn } from "../../lib/utils";

const TREE = {
  A: ["B", "C"],
  B: ["D", "E"],
  C: ["F", "G"],
  D: [],
  E: [],
  F: [],
  G: [],
};

const POS = {
  A: [220, 40],
  B: [140, 120],
  C: [300, 120],
  D: [100, 200],
  E: [180, 200],
  F: [260, 200],
  G: [340, 200],
};

const parentMap = (() => {
  const p = { A: null };
  Object.entries(TREE).forEach(([u, kids]) => kids.forEach((v) => { p[v] = u; }));
  return p;
})();

const pathToRoot = (u) => {
  const path = [];
  let cur = u;
  while (cur) {
    path.push(cur);
    cur = parentMap[cur];
  }
  return path;
};

const findLCA = (u, v) => {
  const pu = pathToRoot(u);
  const pv = new Set(pathToRoot(v));
  return pu.find((x) => pv.has(x));
};

const LowestCommonAncestorAlgo = ({ compact = false }) => {
  const [u, setU] = useState("D");
  const [v, setV] = useState("G");
  const lca = useMemo(() => findLCA(u, v), [u, v]);
  const pu = pathToRoot(u);
  const pv = pathToRoot(v);

  return (
    <Container>
      <CardContainer>
        <Title>Lowest Common Ancestor (LCA)</Title>
        <Para>
          The LCA of two nodes is their deepest shared ancestor in a rooted tree. It is a core
          operation in tree queries, hierarchy analysis, and path-related problems.
        </Para>
        <div className="mb-1 flex flex-wrap items-center justify-center gap-2.5">
          <select
            value={u}
            onChange={(e) => setU(e.target.value)}
            className={cn(
              "h-9 rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none ring-sky-300 transition focus:ring-2",
              compact ? "w-full min-w-0 text-sm" : "w-27.5 text-sm"
            )}
          >
            {Object.keys(TREE).map((x) => <option key={x}>{x}</option>)}
          </select>
          <select
            value={v}
            onChange={(e) => setV(e.target.value)}
            className={cn(
              "h-9 rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none ring-sky-300 transition focus:ring-2",
              compact ? "w-full min-w-0 text-sm" : "w-27.5 text-sm"
            )}
          >
            {Object.keys(TREE).map((x) => <option key={x}>{x}</option>)}
          </select>
        </div>
        <Para>LCA({u}, {v}) = <strong>{lca}</strong></Para>

        <AlgoVisualizer>
          <svg
            width="100%"
            viewBox="0 0 440 250"
            preserveAspectRatio="xMidYMid meet"
            className="mx-auto h-auto w-full max-w-175"
          >
            {Object.entries(TREE).flatMap(([p, kids]) => kids.map((c) => (
              <line key={`${p}-${c}`} x1={POS[p][0]} y1={POS[p][1]} x2={POS[c][0]} y2={POS[c][1]} stroke="#94a3b8" strokeWidth="2" />
            )))}
            {Object.keys(TREE).map((n) => {
              let fill = "#64748b";
              if (pu.includes(n) || pv.includes(n)) fill = "#0ea5e9";
              if (n === lca) fill = "#16a34a";
              return (
                <g key={n}>
                  <circle cx={POS[n][0]} cy={POS[n][1]} r="18" fill={fill} />
                  <text x={POS[n][0]} y={POS[n][1] + 4} textAnchor="middle" fill="#fff" fontWeight="700">{n}</text>
                </g>
              );
            })}
          </svg>
          <Para>Path {u}→root: {pu.join(" → ")} | Path {v}→root: {pv.join(" → ")}</Para>
        </AlgoVisualizer>

        <CodeBlock>
          {`function lca(parent, u, v) {
  const seen = new Set();
  while (u !== null) { seen.add(u); u = parent[u]; }
  while (v !== null) {
    if (seen.has(v)) return v;
    v = parent[v];
  }
  return null;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default LowestCommonAncestorAlgo;
