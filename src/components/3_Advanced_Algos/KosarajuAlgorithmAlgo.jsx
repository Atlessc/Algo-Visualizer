import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../Styled Components/styledComponents";

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

const KosarajuAlgorithmAlgo = () => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const step = steps[stepIndex];

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
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <button type="button" onClick={() => setIsPlaying((p) => !p)}>{isPlaying ? "Pause" : "Play"}</button>
          <button type="button" onClick={() => { setStepIndex(0); setIsPlaying(true); }}>Reset</button>
        </div>
        <AlgoVisualizer>
          <div style={{ width: "100%", maxWidth: "780px", margin: "0 auto", display: "grid", gap: "10px" }}>
            <div style={{ background: "#eef2ff", borderRadius: "12px", padding: "10px" }}>
              <strong>Phase:</strong> {step.phase === "first" ? "Finish-time DFS" : "Transpose DFS"}
            </div>
            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "10px", fontFamily: "monospace" }}>
              Finish stack: [{step.order.join(", ")}]
            </div>
            <div style={{ background: "#f0fdf4", borderRadius: "12px", padding: "10px", fontFamily: "monospace" }}>
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
