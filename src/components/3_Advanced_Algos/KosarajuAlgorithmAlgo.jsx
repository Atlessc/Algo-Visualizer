import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

const V = ["A", "B", "C", "D", "E", "F"];
const E = [
  ["A", "B"], ["B", "C"], ["C", "A"],
  ["B", "D"], ["D", "E"], ["E", "F"], ["F", "D"],
];

const buildAdj = (edges) => {
  const m = Object.fromEntries(V.map((x) => [x, []]));
  edges.forEach(([u, v]) => m[u].push(v));
  return m;
};

const reverseEdges = (edges) => edges.map(([u, v]) => [v, u]);

const buildSteps = () => {
  const adj = buildAdj(E);
  const rev = buildAdj(reverseEdges(E));
  const seen = new Set();
  const order = [];
  const steps = [];

  const dfs1 = (u) => {
    seen.add(u);
    steps.push({ phase: "first", current: u, order: [...order], sccs: [], msg: `DFS1 visit ${u}.` });
    for (const v of adj[u]) if (!seen.has(v)) dfs1(v);
    order.push(u);
    steps.push({ phase: "first", current: u, order: [...order], sccs: [], msg: `Push ${u} to finish stack.` });
  };
  V.forEach((u) => { if (!seen.has(u)) dfs1(u); });

  const seen2 = new Set();
  const sccs = [];
  const dfs2 = (u, comp) => {
    seen2.add(u);
    comp.push(u);
    steps.push({ phase: "second", current: u, order: [...order], sccs: [...sccs, [...comp]], msg: `DFS2 on transpose add ${u}.` });
    for (const v of rev[u]) if (!seen2.has(v)) dfs2(v, comp);
  };

  for (let i = order.length - 1; i >= 0; i--) {
    const u = order[i];
    if (seen2.has(u)) continue;
    const comp = [];
    dfs2(u, comp);
    sccs.push(comp);
    steps.push({ phase: "second", current: u, order: [...order], sccs: [...sccs], msg: `SCC found: {${comp.join(", ")}}` });
  }
  return steps;
};

const KosarajuAlgorithmAlgo = ({ autoPlay = true, compact = false }) => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const step = steps[stepIndex];

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 800);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>Kosaraju&apos;s Algorithm (SCC)</Title>
        <Para>
          Kosaraju finds strongly connected components in a directed graph using two DFS passes:
          one pass records finish order, and a second pass on the transposed graph extracts SCCs.
          Time complexity is O(V+E).
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
          <div className="mx-auto grid w-full max-w-195 gap-2.5">
            <div className={cn("rounded-xl bg-indigo-100 p-2.5", compact ? "text-xs" : "text-sm")}>
              <strong>Phase:</strong> {step.phase === "first" ? "Finish-time DFS" : "Transpose DFS"}
            </div>
            <div className={cn("rounded-xl border border-slate-200 bg-slate-50 p-2.5 font-mono", compact ? "text-xs" : "text-sm")}>
              Finish stack: [{step.order.join(", ")}]
            </div>
            <div className={cn("rounded-xl bg-emerald-50 p-2.5 font-mono", compact ? "text-xs" : "text-sm")}>
              SCCs: {step.sccs.map((c) => `{${c.join(", ")}}`).join(" ")}
            </div>
          </div>
        </AlgoVisualizer>
        <CodeBlock>
          {`function kosaraju(adj) {
  const order = [];
  const seen = new Set();
  const dfs1 = (u) => {
    seen.add(u);
    for (const v of adj[u]) if (!seen.has(v)) dfs1(v);
    order.push(u);
  };
  Object.keys(adj).forEach((u) => { if (!seen.has(u)) dfs1(u); });

  const rev = transpose(adj);
  const seen2 = new Set();
  const sccs = [];
  const dfs2 = (u, comp) => {
    seen2.add(u); comp.push(u);
    for (const v of rev[u]) if (!seen2.has(v)) dfs2(v, comp);
  };
  for (let i = order.length - 1; i >= 0; i--) {
    const u = order[i];
    if (!seen2.has(u)) { const comp = []; dfs2(u, comp); sccs.push(comp); }
  }
  return sccs;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default KosarajuAlgorithmAlgo;
