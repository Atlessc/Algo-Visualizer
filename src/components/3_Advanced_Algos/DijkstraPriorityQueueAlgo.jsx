import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock,
  Para,
} from "../ui/algo-primitives";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

const GRAPH = {
  A: [
    { to: "B", w: 2 },
    { to: "C", w: 5 },
  ],
  B: [
    { to: "C", w: 1 },
    { to: "D", w: 4 },
  ],
  C: [{ to: "D", w: 1 }],
  D: [],
};

const buildSteps = () => {
  const dist = { A: 0, B: Infinity, C: Infinity, D: Infinity };
  const pq = [{ node: "A", d: 0 }];
  const steps = [
    { dist: { ...dist }, pq: [...pq], msg: "Initialize with source A." },
  ];

  while (pq.length) {
    pq.sort((a, b) => a.d - b.d);
    const cur = pq.shift();
    if (cur.d > dist[cur.node]) continue;
    steps.push({
      dist: { ...dist },
      pq: [...pq],
      current: cur.node,
      msg: `Pop ${cur.node} (${cur.d}) from priority queue.`,
    });

    for (const e of GRAPH[cur.node]) {
      const nd = dist[cur.node] + e.w;
      if (nd < dist[e.to]) {
        dist[e.to] = nd;
        pq.push({ node: e.to, d: nd });
        steps.push({
          dist: { ...dist },
          pq: [...pq],
          current: cur.node,
          msg: `Relax ${cur.node}→${e.to}, update to ${nd}.`,
        });
      }
    }
  }
  return steps;
};

const DijkstraPriorityQueueAlgo = ({ autoPlay = true, compact = false }) => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const step = steps[stepIndex];

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(
      () => setStepIndex((p) => Math.min(p + 1, steps.length - 1)),
      850,
    );
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>Dijkstra (Priority Queue)</Title>
        <Para>
          This Dijkstra variant uses a min-priority queue to always process the next closest
          unsettled node first. That data structure makes shortest-path updates efficient on sparse
          graphs with non-negative edge weights.
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
            onClick={() => {
              setStepIndex(0);
              setIsPlaying(true);
            }}
          >
            Reset
          </Button>
        </div>

        <AlgoVisualizer>
          <div className="flex w-full flex-wrap justify-center gap-3">
            <div className="min-w-55 flex-1 rounded-xl bg-indigo-100 p-2.5">
              <strong>Distances</strong>
              {Object.entries(step.dist).map(([n, d]) => (
                <div
                  key={n}
                  className={cn("mt-1.5 font-mono", compact ? "text-xs" : "text-sm")}
                >
                  {n}: {Number.isFinite(d) ? d : "∞"}
                </div>
              ))}
            </div>
            <div className="min-w-55 flex-1 rounded-xl border border-slate-200 bg-slate-50 p-2.5">
              <strong>Priority Queue</strong>
              {(step.pq.length
                ? [...step.pq].sort((a, b) => a.d - b.d)
                : []
              ).map((x, i) => (
                <div
                  key={`${x.node}-${i}`}
                  className={cn("mt-1.5 font-mono", compact ? "text-xs" : "text-sm")}
                >
                  ({x.node}, {x.d})
                </div>
              ))}
              {step.pq.length === 0 && <div className="mt-1.5">(empty)</div>}
            </div>
          </div>
        </AlgoVisualizer>

        <CodeBlock>
          {`function dijkstra(graph, src) {
  const dist = Object.fromEntries(Object.keys(graph).map((n) => [n, Infinity]));
  dist[src] = 0;
  const pq = [{ node: src, d: 0 }];
  while (pq.length) {
    pq.sort((a, b) => a.d - b.d);
    const { node, d } = pq.shift();
    if (d > dist[node]) continue;
    for (const { to, w } of graph[node]) {
      const nd = d + w;
      if (nd < dist[to]) {
        dist[to] = nd;
        pq.push({ node: to, d: nd });
      }
    }
  }
  return dist;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default DijkstraPriorityQueueAlgo;
