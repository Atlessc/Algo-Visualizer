import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

const G = {
  A: ["B"],
  B: ["C", "D"],
  C: ["A"],
  D: ["E"],
  E: ["F"],
  F: ["D"],
};

const buildSteps = () => {
  let idx = 0;
  const index = {};
  const low = {};
  const stack = [];
  const onStack = new Set();
  const sccs = [];
  const steps = [];

  const dfs = (u) => {
    index[u] = idx;
    low[u] = idx;
    idx++;
    stack.push(u);
    onStack.add(u);
    steps.push({ current: u, index: { ...index }, low: { ...low }, stack: [...stack], sccs: [...sccs], msg: `Visit ${u}, set index/low.` });

    for (const v of G[u]) {
      if (index[v] === undefined) {
        dfs(v);
        low[u] = Math.min(low[u], low[v]);
      } else if (onStack.has(v)) {
        low[u] = Math.min(low[u], index[v]);
      }
      steps.push({ current: u, index: { ...index }, low: { ...low }, stack: [...stack], sccs: [...sccs], msg: `Process edge ${u}→${v}.` });
    }

    if (low[u] === index[u]) {
      const comp = [];
      while (true) {
        const w = stack.pop();
        onStack.delete(w);
        comp.push(w);
        if (w === u) break;
      }
      sccs.push(comp);
      steps.push({ current: u, index: { ...index }, low: { ...low }, stack: [...stack], sccs: [...sccs], msg: `Root ${u} found SCC {${comp.join(", ")}}.` });
    }
  };

  Object.keys(G).forEach((u) => {
    if (index[u] === undefined) dfs(u);
  });
  return steps;
};

const TarjanAlgorithmAlgo = ({ autoPlay = true, compact = false }) => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const step = steps[stepIndex];

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 750);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>Tarjan&apos;s Algorithm (SCC)</Title>
        <Para>
          Tarjan finds SCCs in one DFS pass using discovery indices and low-link values. Nodes are
          pushed onto a stack; when low[u] equals index[u], u is the root of an SCC popped from the
          stack. Time complexity is O(V+E).
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
            <div className={cn("rounded-xl bg-indigo-100 p-2.5 font-mono", compact ? "text-xs" : "text-sm")}>
              Stack: [{step.stack.join(", ")}]
            </div>
            <div className={cn("rounded-xl border border-slate-200 bg-slate-50 p-2.5 font-mono", compact ? "text-xs" : "text-sm")}>
              {Object.keys(G).map((u) => (
                <div key={u}>{u}: index={step.index[u] ?? "-"}, low={step.low[u] ?? "-"}</div>
              ))}
            </div>
            <div className={cn("rounded-xl bg-emerald-50 p-2.5 font-mono", compact ? "text-xs" : "text-sm")}>
              SCCs: {step.sccs.map((c) => `{${c.join(", ")}}`).join(" ")}
            </div>
          </div>
        </AlgoVisualizer>
        <CodeBlock>
          {`function tarjan(adj) {
  let idx = 0;
  const index = {}, low = {};
  const st = [], inSt = new Set(), sccs = [];
  const dfs = (u) => {
    index[u] = low[u] = idx++;
    st.push(u); inSt.add(u);
    for (const v of adj[u]) {
      if (index[v] === undefined) { dfs(v); low[u] = Math.min(low[u], low[v]); }
      else if (inSt.has(v)) low[u] = Math.min(low[u], index[v]);
    }
    if (low[u] === index[u]) {
      const comp = [];
      while (true) { const w = st.pop(); inSt.delete(w); comp.push(w); if (w === u) break; }
      sccs.push(comp);
    }
  };
  Object.keys(adj).forEach((u) => index[u] === undefined && dfs(u));
  return sccs;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default TarjanAlgorithmAlgo;
