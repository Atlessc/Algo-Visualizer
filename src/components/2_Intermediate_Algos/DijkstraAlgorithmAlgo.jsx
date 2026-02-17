import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock,
  Para
} from "../ui/algo-primitives";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

const weightedGraphData = {
  nodes: [
    { id: "A", x: 90, y: 60 },
    { id: "B", x: 240, y: 40 },
    { id: "C", x: 400, y: 60 },
    { id: "D", x: 140, y: 180 },
    { id: "E", x: 300, y: 180 },
    { id: "F", x: 480, y: 170 }
  ],
  edges: [
    { from: "A", to: "B", weight: 4 },
    { from: "A", to: "D", weight: 2 },
    { from: "B", to: "C", weight: 3 },
    { from: "B", to: "E", weight: 7 },
    { from: "D", to: "E", weight: 1 },
    { from: "E", to: "C", weight: 2 },
    { from: "E", to: "F", weight: 5 },
    { from: "C", to: "F", weight: 4 }
  ]
};

const hexToRgb = (hex) => {
  const cleanHex = hex.replace("#", "");
  const expandedHex =
    cleanHex.length === 3
      ? cleanHex
          .split("")
          .map((char) => char + char)
          .join("")
      : cleanHex;
  const intValue = Number.parseInt(expandedHex, 16);
  return {
    r: (intValue >> 16) & 255,
    g: (intValue >> 8) & 255,
    b: intValue & 255
  };
};

const getTextColorForBackground = (hexColor) => {
  const { r, g, b } = hexToRgb(hexColor);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#1f2937" : "#ffffff";
};

const buildAdjacencyList = (edges) => {
  const adjacency = new Map();
  edges.forEach(({ from, to, weight }) => {
    if (!adjacency.has(from)) {
      adjacency.set(from, []);
    }
    if (!adjacency.has(to)) {
      adjacency.set(to, []);
    }
    adjacency.get(from).push({ to, weight });
    adjacency.get(to).push({ to: from, weight });
  });
  return adjacency;
};

const formatDistance = (value) => {
  return Number.isFinite(value) ? value : "∞";
};

const getEdgeKey = (from, to) => {
  return [from, to].sort().join("|");
};

const buildEdgeWeightMap = (edges) => {
  return edges.reduce((acc, edge) => {
    acc[getEdgeKey(edge.from, edge.to)] = edge.weight;
    return acc;
  }, {});
};

const buildPathNodes = (target, previous, startNode) => {
  if (target === startNode) {
    return [startNode];
  }

  const reversed = [target];
  const visited = new Set([target]);
  let cursor = target;

  while (cursor !== startNode) {
    const parent = previous[cursor];
    if (!parent || visited.has(parent)) {
      return null;
    }
    reversed.push(parent);
    visited.add(parent);
    cursor = parent;
  }

  return reversed.reverse();
};

const buildWeightedPathText = (pathNodes, edgeWeights) => {
  if (!pathNodes || pathNodes.length === 0) {
    return "(no path)";
  }
  if (pathNodes.length === 1) {
    return pathNodes[0];
  }

  const result = [pathNodes[0]];
  for (let i = 0; i < pathNodes.length - 1; i += 1) {
    const from = pathNodes[i];
    const to = pathNodes[i + 1];
    const weight = edgeWeights[getEdgeKey(from, to)];
    result.push(String(weight), to);
  }

  return result.join(" > ");
};

const getMinDistanceNode = (frontier, distances) => {
  let bestNode = null;
  let bestDistance = Infinity;

  frontier.forEach((nodeId) => {
    const distance = distances[nodeId];
    if (
      distance < bestDistance ||
      (distance === bestDistance && bestNode && nodeId < bestNode)
    ) {
      bestNode = nodeId;
      bestDistance = distance;
    }
  });

  return bestNode;
};

const generateDijkstraSteps = (graph, startNode) => {
  const adjacency = buildAdjacencyList(graph.edges);
  const distances = graph.nodes.reduce((acc, node) => {
    acc[node.id] = Infinity;
    return acc;
  }, {});
  distances[startNode] = 0;

  const previous = {};
  const frontier = new Set([startNode]);
  const settled = new Set();
  const settledOrder = [];
  const steps = [
    {
      currentNode: null,
      activeEdge: null,
      distances: { ...distances },
      frontier: [...frontier],
      settled: [...settled],
      settledOrder: [...settledOrder],
      previous: { ...previous },
      message: `Start at ${startNode}. Distance(${startNode}) = 0, all others are ∞.`
    }
  ];

  while (frontier.size > 0) {
    const current = getMinDistanceNode(frontier, distances);
    if (!current) {
      break;
    }

    frontier.delete(current);
    if (settled.has(current)) {
      continue;
    }

    settled.add(current);
    settledOrder.push(current);
    steps.push({
      currentNode: current,
      activeEdge: null,
      distances: { ...distances },
      frontier: [...frontier].sort((a, b) => distances[a] - distances[b]),
      settled: [...settled],
      settledOrder: [...settledOrder],
      previous: { ...previous },
      message: `Pick ${current} (smallest tentative distance ${formatDistance(
        distances[current]
      )}) and settle it.`
    });

    const neighbors = adjacency.get(current) ?? [];
    neighbors.forEach(({ to, weight }) => {
      if (settled.has(to)) {
        return;
      }

      const candidateDistance = distances[current] + weight;
      if (candidateDistance < distances[to]) {
        const oldDistance = distances[to];
        distances[to] = candidateDistance;
        previous[to] = current;
        frontier.add(to);

        steps.push({
          currentNode: current,
          activeEdge: { from: current, to },
          distances: { ...distances },
          frontier: [...frontier].sort((a, b) => distances[a] - distances[b]),
          settled: [...settled],
          settledOrder: [...settledOrder],
          previous: { ...previous },
          message: `Relax ${current} → ${to} (w=${weight}): ${formatDistance(
            oldDistance
          )} → ${candidateDistance}.`
        });
      }
    });
  }

  steps.push({
    currentNode: null,
    activeEdge: null,
    distances: { ...distances },
    frontier: [],
    settled: [...settled],
    settledOrder: [...settledOrder],
    previous: { ...previous },
    message: `Done. Final shortest-path distances from ${startNode} are set.`
  });

  return steps;
};

const DijkstraAlgorithmAlgo = ({ autoPlay = true, compact = false }) => {
  const startNode = "A";
  const steps = useMemo(() => generateDijkstraSteps(weightedGraphData, startNode), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [hoveredTarget, setHoveredTarget] = useState(null);

  const edgeWeights = useMemo(
    () => buildEdgeWeightMap(weightedGraphData.edges),
    []
  );

  const nodesById = useMemo(() => {
    return weightedGraphData.nodes.reduce((acc, node) => {
      acc[node.id] = node;
      return acc;
    }, {});
  }, []);

  const currentStep = steps[stepIndex];
  const finalStep = steps[steps.length - 1];

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    }, 1200);

    return () => clearInterval(intervalId);
  }, [isPlaying, stepIndex, steps.length]);

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  const getNodeStyle = (nodeId) => {
    if (hoveredTarget) {
      const hoveredPathNodes = buildPathNodes(hoveredTarget, finalStep.previous, startNode);
      if (hoveredPathNodes?.includes(nodeId)) {
        const fill = "#f39c12";
        return { fill, text: getTextColorForBackground(fill) };
      }
    }
    if (currentStep.currentNode === nodeId) {
      const fill = "#e74c3c";
      return { fill, text: getTextColorForBackground(fill) };
    }
    if (currentStep.settled.includes(nodeId)) {
      const fill = "#2ecc71";
      return { fill, text: getTextColorForBackground(fill) };
    }
    if (currentStep.frontier.includes(nodeId)) {
      const fill = "#3498db";
      return { fill, text: getTextColorForBackground(fill) };
    }
    const fill = "#95a5a6";
    return { fill, text: getTextColorForBackground(fill) };
  };

  const sortedNodes = useMemo(
    () => [...weightedGraphData.nodes].sort((a, b) => a.id.localeCompare(b.id)),
    []
  );

  const hoveredPathNodes = useMemo(() => {
    if (!hoveredTarget) {
      return null;
    }
    return buildPathNodes(hoveredTarget, finalStep.previous, startNode);
  }, [finalStep.previous, hoveredTarget, startNode]);

  const hoveredPathEdgeKeys = useMemo(() => {
    if (!hoveredPathNodes || hoveredPathNodes.length < 2) {
      return new Set();
    }

    const keys = new Set();
    for (let i = 0; i < hoveredPathNodes.length - 1; i += 1) {
      keys.add(getEdgeKey(hoveredPathNodes[i], hoveredPathNodes[i + 1]));
    }
    return keys;
  }, [hoveredPathNodes]);

  return (
    <Container>
      <CardContainer>
        <Title>Dijkstra&apos;s Algorithm</Title>
        <Para>
          Dijkstra finds the shortest path from a start node to every other
          node in a weighted graph with non-negative edge weights by repeatedly
          settling the node with the smallest tentative distance.
        </Para>

        <AlgoVisualizer>
          <div className="algo-split">
            <div className="algo-pane-main">
              <svg
                width="100%"
                viewBox="0 0 620 260"
                preserveAspectRatio="xMidYMid meet"
                className="mx-auto h-auto w-full max-w-190"
              >
                {weightedGraphData.edges.map((edge) => {
                  const from = nodesById[edge.from];
                  const to = nodesById[edge.to];
                  const edgeKey = getEdgeKey(edge.from, edge.to);
                  const isHoveredPathEdge = hoveredPathEdgeKeys.has(edgeKey);
                  const isActive =
                    currentStep.activeEdge &&
                    ((currentStep.activeEdge.from === edge.from &&
                      currentStep.activeEdge.to === edge.to) ||
                      (currentStep.activeEdge.from === edge.to &&
                        currentStep.activeEdge.to === edge.from));
                  const midX = (from.x + to.x) / 2;
                  const midY = (from.y + to.y) / 2;

                  return (
                    <g key={`${edge.from}-${edge.to}`}>
                      <line
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        stroke={isHoveredPathEdge ? "#0ea5e9" : isActive ? "#e67e22" : "#bdc3c7"}
                        strokeWidth={isHoveredPathEdge ? 5 : isActive ? 4 : 2}
                      />
                      <rect
                        x={midX - 10}
                        y={midY - 10}
                        width={20}
                        height={20}
                        fill="#ffffff"
                        stroke="#d0d7de"
                        rx={4}
                      />
                      <text
                        x={midX}
                        y={midY + 4}
                        textAnchor="middle"
                        fontSize="11px"
                        fill="#1f2937"
                        fontWeight="600"
                      >
                        {edge.weight}
                      </text>
                    </g>
                  );
                })}

                {weightedGraphData.nodes.map((node) => {
                  const style = getNodeStyle(node.id);
                  return (
                    <g key={node.id}>
                      <circle cx={node.x} cy={node.y} r={24} fill={style.fill} />
                      <text
                        x={node.x}
                        y={node.y + 5}
                        textAnchor="middle"
                        fontSize="16px"
                        fill={style.text}
                        fontWeight="bold"
                      >
                        {node.id}
                      </text>
                    </g>
                  );
                })}
              </svg>
              <div className="algo-legend-row">
                <span className="rounded-full bg-red-500 px-2 py-1 text-xs text-white">current</span>
                <span className="rounded-full bg-sky-500 px-2 py-1 text-xs text-white">frontier</span>
                <span className="rounded-full bg-emerald-500 px-2 py-1 text-xs text-white">settled</span>
                <span className="rounded-full bg-cyan-500 px-2 py-1 text-xs text-white">hover path</span>
              </div>
            </div>

            <div className="algo-pane-side">
              <div className="mb-3">
                <strong className="text-sky-800">Frontier:</strong>
                <div
                  className={cn(
                    "mt-2 min-h-10 rounded-md bg-slate-100 text-sky-800",
                    compact ? "p-2 text-sm" : "p-2.5 text-base"
                  )}
                >
                  {currentStep.frontier.length > 0
                    ? currentStep.frontier
                        .map((nodeId) => `${nodeId} (${formatDistance(currentStep.distances[nodeId])})`)
                        .join(" • ")
                    : "(empty)"}
                </div>
              </div>

              <div className="mb-3">
                <strong className="text-emerald-700">Settled order:</strong>
                <div
                  className={cn(
                    "mt-2 min-h-10 rounded-md bg-slate-100 text-emerald-700",
                    compact ? "p-2 text-sm" : "p-2.5 text-base"
                  )}
                >
                  {currentStep.settledOrder.length > 0
                    ? currentStep.settledOrder.join(" → ")
                    : "(none yet)"}
                </div>
              </div>

              <div className="mb-3">
                <strong className="text-slate-600">
                  Shortest paths from {startNode} (hover destination):
                </strong>
                <div
                  className={cn(
                    "mt-2 rounded-md bg-slate-100 text-slate-800",
                    compact ? "p-2 text-sm leading-6" : "p-2.5 text-base leading-6"
                  )}
                >
                  {sortedNodes.map((node) => {
                    const pathNodes = buildPathNodes(node.id, finalStep.previous, startNode);
                    const pathText = buildWeightedPathText(pathNodes, edgeWeights);
                    return (
                      <div key={`path-${node.id}`}>
                        <strong
                          className="cursor-pointer underline focus-visible:outline-none"
                          style={{ color: hoveredTarget === node.id ? "#0b5c81" : "#1f2937" }}
                          onMouseEnter={() => setHoveredTarget(node.id)}
                          onMouseLeave={() => setHoveredTarget(null)}
                          onFocus={() => setHoveredTarget(node.id)}
                          onBlur={() => setHoveredTarget(null)}
                          tabIndex={0}
                          role="button"
                        >
                          {node.id}
                        </strong>
                        : {pathText} (total: {formatDistance(finalStep.distances[node.id])})
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mb-3">
                <strong className="text-sky-800">Step:</strong>
                <div className={cn("mt-2 text-sky-800", compact ? "text-sm" : "text-base")}>
                  {currentStep.message}
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <Button
                  size={compact ? "sm" : "default"}
                  variant="secondary"
                  onClick={() => setIsPlaying((prev) => !prev)}
                >
                  {isPlaying ? "Pause" : "Play"}
                </Button>

                <Button
                  size={compact ? "sm" : "default"}
                  variant="outline"
                  onClick={() => {
                    setStepIndex(0);
                    setIsPlaying(autoPlay);
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </AlgoVisualizer>

        <CodeBlock>
{`function dijkstra(graph, start) {
  const dist = {};
  const visited = new Set();
  const pq = new MinPriorityQueue();

  for (const node of graph.nodes) dist[node] = Infinity;
  dist[start] = 0;
  pq.push({ node: start, priority: 0 });

  while (!pq.isEmpty()) {
    const { node } = pq.pop();
    if (visited.has(node)) continue;
    visited.add(node);

    for (const { to, weight } of graph[node]) {
      const next = dist[node] + weight;
      if (next < dist[to]) {
        dist[to] = next;
        pq.push({ node: to, priority: next });
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

export default DijkstraAlgorithmAlgo;
