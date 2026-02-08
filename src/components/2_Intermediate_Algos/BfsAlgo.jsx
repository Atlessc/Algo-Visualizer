import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock,
  Para
} from "../Styled Components/styledComponents";

const graphData = {
  nodes: [
    { id: "A", x: 100, y: 60 },
    { id: "B", x: 250, y: 40 },
    { id: "C", x: 400, y: 60 },
    { id: "D", x: 150, y: 160 },
    { id: "E", x: 300, y: 170 },
    { id: "F", x: 450, y: 160 }
  ],
  edges: [
    { from: "A", to: "B" },
    { from: "A", to: "D" },
    { from: "B", to: "C" },
    { from: "B", to: "E" },
    { from: "C", to: "F" },
    { from: "D", to: "E" },
    { from: "E", to: "F" }
  ]
};

const buildAdjacencyList = (edges) => {
  const adjacency = new Map();
  edges.forEach(({ from, to }) => {
    if (!adjacency.has(from)) {
      adjacency.set(from, []);
    }
    if (!adjacency.has(to)) {
      adjacency.set(to, []);
    }
    adjacency.get(from).push(to);
    adjacency.get(to).push(from);
  });
  return adjacency;
};

const generateBfsSteps = (graph, startNode) => {
  const adjacency = buildAdjacencyList(graph.edges);
  const visited = new Set();
  const queue = [startNode];
  const traversal = [];
  const steps = [
    {
      currentNode: null,
      queue: [...queue],
      visited: [],
      traversal: [],
      activeEdge: null,
      message: `Start at ${startNode}, enqueue it.`
    }
  ];

  while (queue.length > 0) {
    const current = queue.shift();
    if (visited.has(current)) {
      continue;
    }
    visited.add(current);
    traversal.push(current);
    steps.push({
      currentNode: current,
      queue: [...queue],
      visited: [...visited],
      traversal: [...traversal],
      activeEdge: null,
      message: `Dequeue ${current} and mark it visited.`
    });

    const neighbors = adjacency.get(current) ?? [];
    neighbors.forEach((neighbor) => {
      if (!visited.has(neighbor) && !queue.includes(neighbor)) {
        queue.push(neighbor);
        steps.push({
          currentNode: current,
          queue: [...queue],
          visited: [...visited],
          traversal: [...traversal],
          activeEdge: { from: current, to: neighbor },
          message: `Visit neighbor ${neighbor}, enqueue it.`
        });
      }
    });
  }

  steps.push({
    currentNode: null,
    queue: [],
    visited: [...visited],
    traversal: [...traversal],
    activeEdge: null,
    message: "Queue empty. BFS complete."
  });

  return steps;
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

const BfsAlgo = () => {
  const steps = useMemo(() => generateBfsSteps(graphData, "A"), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying, stepIndex, steps.length]);

  const currentStep = steps[stepIndex];
  const nodesById = useMemo(() => {
    return graphData.nodes.reduce((acc, node) => {
      acc[node.id] = node;
      return acc;
    }, {});
  }, []);

  const nodeStyle = (nodeId) => {
    if (currentStep.currentNode === nodeId) {
      const fill = "#e74c3c";
      return { fill, text: getTextColorForBackground(fill) };
    }
    if (currentStep.visited.includes(nodeId)) {
      const fill = "#2ecc71";
      return { fill, text: getTextColorForBackground(fill) };
    }
    if (currentStep.queue.includes(nodeId)) {
      const fill = "#f1c40f";
      return { fill, text: getTextColorForBackground(fill) };
    }
    const fill = "#95a5a6";
    return { fill, text: getTextColorForBackground(fill) };
  };

  return (
    <Container>
      <CardContainer>
        <Title>BFS (Breadth-First Search)</Title>
        <Para>
          Breadth-First Search explores a graph level by level using a queue. It
          visits all neighbors of the current node before moving deeper, making
          it ideal for shortest paths in unweighted graphs.
        </Para>
        <AlgoVisualizer>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "24px",
            width: "100%",
            flexWrap: "wrap"
          }}>
            <div style={{ flex: "2 1 420px" }}>
              <svg width="600" height="240" viewBox="0 0 600 240">
                {graphData.edges.map((edge) => {
                  const from = nodesById[edge.from];
                  const to = nodesById[edge.to];
                  const isActive =
                    currentStep.activeEdge &&
                    ((currentStep.activeEdge.from === edge.from &&
                      currentStep.activeEdge.to === edge.to) ||
                      (currentStep.activeEdge.from === edge.to &&
                        currentStep.activeEdge.to === edge.from));
                  return (
                    <line
                      key={`${edge.from}-${edge.to}`}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke={isActive ? "#e67e22" : "#bdc3c7"}
                      strokeWidth={isActive ? 4 : 2}
                    />
                  );
                })}
                {graphData.nodes.map((node) => {
                  const style = nodeStyle(node.id);
                  return (
                    <g key={node.id}>
                      <circle cx={node.x} cy={node.y} r={22} fill={style.fill} />
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
            </div>
            <div style={{ flex: "1 1 220px" }}>
              <div style={{ marginBottom: "12px" }}>
                <strong style={{ color: "#7a5b00" }}>Queue:</strong>
                <div
                  style={{
                    marginTop: "8px",
                    padding: "10px",
                    background: "#ecf0f1",
                    borderRadius: "6px",
                    minHeight: "40px",
                    color: "#7a5b00"
                  }}
                >
                  {currentStep.queue.length > 0
                    ? currentStep.queue.join(" → ")
                    : "(empty)"}
                </div>
              </div>
              <div style={{ marginBottom: "12px" }}>
                <strong style={{ color: "#1f7a3f" }}>Traversal order:</strong>
                <div
                  style={{
                    marginTop: "8px",
                    padding: "10px",
                    background: "#ecf0f1",
                    borderRadius: "6px",
                    minHeight: "40px",
                    color: "#1f7a3f"
                  }}
                >
                  {currentStep.traversal.length > 0
                    ? currentStep.traversal.join(" → ")
                    : "(none yet)"}
                </div>
              </div>
              <div style={{ marginBottom: "12px" }}>
                <strong style={{ color: "#1f5f8b" }}>Step:</strong>
                <div style={{ marginTop: "8px", color: "#1f5f8b" }}>{currentStep.message}</div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsPlaying((prev) => !prev)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "6px",
                    border: "1px solid #bdc3c7",
                    background: "#ffffff",
                    cursor: "pointer",
                    color: "#e74c3c"
                  }}
                >
                  {isPlaying ? "Pause" : "Play"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStepIndex(0);
                    setIsPlaying(true);
                  }}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "6px",
                    border: "1px solid #bdc3c7",
                    background: "#ffffff",
                    cursor: "pointer",
                    color: "#e74c3c"
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </AlgoVisualizer>
        <CodeBlock>
{`function bfs(graph, start) {
  const queue = [start];
  const visited = new Set();
  const order = [];

  while (queue.length > 0) {
    const node = queue.shift();
    if (visited.has(node)) continue;
    visited.add(node);
    order.push(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    }
  }

  return order;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default BfsAlgo;
