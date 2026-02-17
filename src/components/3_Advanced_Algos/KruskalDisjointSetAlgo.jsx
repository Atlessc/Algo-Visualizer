import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

const NODES = ["A", "B", "C", "D", "E"];
const EDGES = [
  { u: "A", v: "B", w: 1 },
  { u: "B", v: "C", w: 2 },
  { u: "A", v: "C", w: 3 },
  { u: "C", v: "D", w: 4 },
  { u: "D", v: "E", w: 5 },
  { u: "B", v: "E", w: 6 },
];

const buildSteps = () => {
  const parent = Object.fromEntries(NODES.map((n) => [n, n]));
  const rank = Object.fromEntries(NODES.map((n) => [n, 0]));
  const sorted = [...EDGES].sort((a, b) => a.w - b.w);
  const mst = [];
  const steps = [{ idx: -1, parent: { ...parent }, mst: [], msg: "Initialize disjoint sets." }];

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

  sorted.forEach((e, idx) => {
    const ok = union(e.u, e.v);
    if (ok) mst.push(`${e.u}-${e.v}`);
    steps.push({
      idx,
      edge: e,
      parent: { ...parent },
      mst: [...mst],
      msg: ok ? `Union(${e.u}, ${e.v}) add edge.` : `Skip ${e.u}-${e.v}; same component.`,
    });
  });
  return steps;
};

const KruskalDisjointSetAlgo = ({ autoPlay = true, compact = false }) => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const step = steps[stepIndex];

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
        <Title>Kruskal (Disjoint Set)</Title>
        <Para>
          Kruskal with Disjoint Set builds an MST by adding the cheapest safe edge each step.
          Union-Find quickly checks whether an edge would create a cycle, keeping the process
          efficient.
        </Para>
        <Para>{step.msg}</Para>
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
          <div className="mx-auto grid w-full max-w-[820px] gap-2.5">
            <div className="rounded-xl bg-indigo-100 p-2.5">
              <strong>Sorted Edges</strong>
              {EDGES.sort((a, b) => a.w - b.w).map((e, i) => (
                <div
                  key={`${e.u}-${e.v}`}
                  className={cn("mt-1.5", compact ? "text-xs" : "text-sm", step.idx === i ? "font-bold" : "font-normal")}
                >
                  {e.u}-{e.v} (w={e.w})
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
              <strong>Parent Array</strong>
              {Object.entries(step.parent).map(([node, p]) => (
                <div key={node} className={cn("mt-1.5 font-mono", compact ? "text-xs" : "text-sm")}>
                  {node} {"->"} {p}
                </div>
              ))}
            </div>
            <Para>MST edges: <strong>{step.mst.join(", ") || "(none)"}</strong></Para>
          </div>
        </AlgoVisualizer>

        <CodeBlock>
          {`function kruskal(nodes, edges) {
  const parent = Object.fromEntries(nodes.map((n) => [n, n]));
  const rank = Object.fromEntries(nodes.map((n) => [n, 0]));
  const find = (x) => {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  };
  const union = (a, b) => {
    let ra = find(a), rb = find(b);
    if (ra === rb) return false;
    if (rank[ra] < rank[rb]) [ra, rb] = [rb, ra];
    parent[rb] = ra;
    if (rank[ra] === rank[rb]) rank[ra]++;
    return true;
  };

  const mst = [];
  for (const e of [...edges].sort((x, y) => x.w - y.w)) {
    if (union(e.u, e.v)) mst.push(e);
  }
  return mst;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default KruskalDisjointSetAlgo;
