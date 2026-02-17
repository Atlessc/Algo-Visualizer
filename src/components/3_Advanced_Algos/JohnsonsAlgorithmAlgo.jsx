import React, { useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

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

const JohnsonsAlgorithmAlgo = ({ compact = false }) => {
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
        <div className="mb-1 flex flex-wrap items-center justify-center gap-2.5">
          <Button
            type="button"
            size={compact ? "sm" : "default"}
            variant={view === "table" ? "default" : "outline"}
            className={cn(view === "table" ? "" : "opacity-80")}
            onClick={() => setView("table")}
          >
            Distance Table
          </Button>
          <Button
            type="button"
            size={compact ? "sm" : "default"}
            variant={view === "reweight" ? "default" : "outline"}
            className={cn(view === "reweight" ? "" : "opacity-80")}
            onClick={() => setView("reweight")}
          >
            Reweighted Edges
          </Button>
        </div>

        <AlgoVisualizer>
          {view === "reweight" ? (
            <div className="mx-auto w-full max-w-190 rounded-xl bg-indigo-100 p-3">
              <div className={cn("mb-2 font-mono", compact ? "text-xs" : "text-sm")}>
                Potentials h: {NODES.map((n) => `${n}:${h[n]}`).join("  ")}
              </div>
              {reweighted.map((e, i) => (
                <div key={i} className={cn("mt-1.5 font-mono", compact ? "text-xs" : "text-sm")}>
                  {e.u}→{e.v}: w={e.w}, w&apos;={e.wp}
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full overflow-x-auto">
              <table
                className={cn("mx-auto border-collapse", compact ? "text-xs" : "text-sm")}
                style={{ minWidth: "360px" }}
              >
                <thead>
                  <tr>
                    <th className={cn("border border-slate-300", compact ? "px-1.5 py-1" : "px-2 py-1.5")}>src\dst</th>
                    {NODES.map((n) => (
                      <th
                        key={n}
                        className={cn("border border-slate-300", compact ? "px-1.5 py-1" : "px-2 py-1.5")}
                      >
                        {n}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {NODES.map((s) => (
                    <tr key={s}>
                      <th
                        className={cn(
                          "border border-slate-300 bg-slate-100",
                          compact ? "px-1.5 py-1" : "px-2 py-1.5"
                        )}
                      >
                        {s}
                      </th>
                      {NODES.map((t) => (
                        <td
                          key={t}
                          className={cn(
                            "border border-slate-300 text-center font-mono",
                            compact ? "px-1.5 py-1" : "px-2 py-1.5"
                          )}
                        >
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
