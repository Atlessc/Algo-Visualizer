import React, { useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../Styled Components/styledComponents";

const NODES = ["A", "B", "C", "D"];
const EDGES = [
  { u: "A", v: "B", w: 1 },
  { u: "A", v: "C", w: 4 },
  { u: "B", v: "C", w: -2 },
  { u: "B", v: "D", w: 2 },
  { u: "C", v: "D", w: 3 },
];

const bellmanFordPotential = () => {
  const h = Object.fromEntries(NODES.map((n) => [n, 0]));
  for (let i = 0; i < NODES.length - 1; i++) {
    EDGES.forEach((e) => {
      if (h[e.u] + e.w < h[e.v]) h[e.v] = h[e.u] + e.w;
    });
  }
  return h;
};

const dijkstra = (src, adj) => {
  const dist = Object.fromEntries(NODES.map((n) => [n, Infinity]));
  dist[src] = 0;
  const pq = [{ n: src, d: 0 }];
  while (pq.length) {
    pq.sort((a, b) => a.d - b.d);
    const { n, d } = pq.shift();
    if (d > dist[n]) continue;
    for (const e of adj[n]) {
      const nd = d + e.w;
      if (nd < dist[e.to]) {
        dist[e.to] = nd;
        pq.push({ n: e.to, d: nd });
      }
    }
  }
  return dist;
};

const runJohnson = () => {
  const h = bellmanFordPotential();
  const reweighted = EDGES.map((e) => ({ ...e, wp: e.w + h[e.u] - h[e.v] }));
  const adj = Object.fromEntries(NODES.map((n) => [n, []]));
  reweighted.forEach((e) => adj[e.u].push({ to: e.v, w: e.wp }));

  const table = {};
  NODES.forEach((s) => {
    const dPrime = dijkstra(s, adj);
    table[s] = {};
    NODES.forEach((t) => {
      table[s][t] = Number.isFinite(dPrime[t]) ? dPrime[t] - h[s] + h[t] : Infinity;
    });
  });
  return { h, reweighted, table };
};

const JohnsonsAlgorithmAlgo = () => {
  const { h, reweighted, table } = useMemo(() => runJohnson(), []);
  const [view, setView] = useState("table");

  return (
    <Container>
      <CardContainer>
        <Title>Johnson&apos;s Algorithm</Title>
        <Para>
          Johnson computes all-pairs shortest paths on sparse graphs with possible negative edges
          (but no negative cycles). It uses Bellman-Ford to get vertex potentials h(v), reweights
          edges to non-negative values, then runs Dijkstra from each source.
        </Para>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <button type="button" onClick={() => setView("table")} style={{ opacity: view === "table" ? 1 : 0.8 }}>Distance Table</button>
          <button type="button" onClick={() => setView("reweight")} style={{ opacity: view === "reweight" ? 1 : 0.8 }}>Reweighted Edges</button>
        </div>

        <AlgoVisualizer>
          {view === "reweight" ? (
            <div style={{ width: "100%", maxWidth: "760px", margin: "0 auto", background: "#eef2ff", borderRadius: "12px", padding: "12px" }}>
              <div style={{ fontFamily: "monospace", marginBottom: "8px" }}>
                Potentials h: {NODES.map((n) => `${n}:${h[n]}`).join("  ")}
              </div>
              {reweighted.map((e, i) => (
                <div key={i} style={{ fontFamily: "monospace", marginTop: "6px" }}>
                  {e.u}→{e.v}: w={e.w}, w&apos;={e.wp}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ overflowX: "auto", width: "100%" }}>
              <table style={{ borderCollapse: "collapse", margin: "0 auto", minWidth: "360px" }}>
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #cbd5e1", padding: "6px" }}>src\dst</th>
                    {NODES.map((n) => (
                      <th key={n} style={{ border: "1px solid #cbd5e1", padding: "6px" }}>{n}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {NODES.map((s) => (
                    <tr key={s}>
                      <th style={{ border: "1px solid #cbd5e1", padding: "6px", background: "#f1f5f9" }}>{s}</th>
                      {NODES.map((t) => (
                        <td key={t} style={{ border: "1px solid #cbd5e1", padding: "6px", textAlign: "center", fontFamily: "monospace" }}>
                          {Number.isFinite(table[s][t]) ? table[s][t] : "∞"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </AlgoVisualizer>

        <CodeBlock>
          {`function johnson(graph) {
  const h = bellmanFordOnSuperSource(graph); // potentials
  const gPrime = reweightEdges(graph, h);    // w'(u,v)=w(u,v)+h(u)-h(v)
  const dist = {};
  for (const s of graph.vertices) {
    const dPrime = dijkstra(gPrime, s);
    dist[s] = {};
    for (const t of graph.vertices) {
      dist[s][t] = dPrime[t] - h[s] + h[t];
    }
  }
  return dist;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default JohnsonsAlgorithmAlgo;
