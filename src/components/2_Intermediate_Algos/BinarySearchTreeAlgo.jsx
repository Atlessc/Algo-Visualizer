import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock,
  Para,
} from "../ui/algo-primitives";

const VALUES = [50, 30, 70, 20, 40, 60, 80];

const insert = (root, value) => {
  if (!root) return { value, left: null, right: null };
  if (value < root.value) root.left = insert(root.left, value);
  else if (value > root.value) root.right = insert(root.right, value);
  return root;
};

const buildFrames = () => {
  let root = null;
  const frames = [{ root: null, inserted: null, message: "Start with empty BST." }];
  VALUES.forEach((value) => {
    root = insert(structuredClone(root), value);
    frames.push({
      root,
      inserted: value,
      message: `Insert ${value} by going left/right based on BST ordering.`,
    });
  });
  frames.push({
    root,
    inserted: null,
    message: "Done. In-order traversal is sorted.",
  });
  return frames;
};

const placeNodes = (node, depth = 0, minX = 30, maxX = 730, out = []) => {
  if (!node) return out;
  const x = (minX + maxX) / 2;
  const y = 45 + depth * 72;
  out.push({ ...node, x, y });
  if (node.left) {
    out.push({ edgeFrom: { x, y }, edgeTo: { x: (minX + x) / 2, y: y + 72 } });
    placeNodes(node.left, depth + 1, minX, x, out);
  }
  if (node.right) {
    out.push({ edgeFrom: { x, y }, edgeTo: { x: (x + maxX) / 2, y: y + 72 } });
    placeNodes(node.right, depth + 1, x, maxX, out);
  }
  return out;
};

const inorder = (node, out = []) => {
  if (!node) return out;
  inorder(node.left, out);
  out.push(node.value);
  inorder(node.right, out);
  return out;
};

const BinarySearchTreeAlgo = () => {
  const frames = useMemo(() => buildFrames(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const frame = frames[stepIndex];
  const nodesAndEdges = frame.root ? placeNodes(frame.root) : [];
  const traversal = frame.root ? inorder(frame.root).join(" → ") : "(empty)";

  useEffect(() => {
    if (!isPlaying || stepIndex >= frames.length - 1) return undefined;
    const id = setInterval(() => {
      setStepIndex((prev) => Math.min(prev + 1, frames.length - 1));
    }, 1050);
    return () => clearInterval(id);
  }, [frames.length, isPlaying, stepIndex]);

  return (
    <Container>
      <CardContainer>
        <Title>Binary Search Tree Operations</Title>
        <Para>
          A Binary Search Tree keeps values ordered by rule: smaller goes left, larger goes right.
          This structure allows efficient search, insert, and delete when the tree stays reasonably
          balanced.
        </Para>
        <Para>{frame.message}</Para>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <button type="button" onClick={() => setIsPlaying((prev) => !prev)}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            onClick={() => {
              setStepIndex(0);
              setIsPlaying(true);
            }}
          >
            Reset
          </button>
        </div>

        <AlgoVisualizer>
          <svg
            width="100%"
            viewBox="0 0 760 320"
            preserveAspectRatio="xMidYMid meet"
            style={{ maxWidth: "920px", height: "auto" }}
          >
            {nodesAndEdges
              .filter((x) => x.edgeFrom)
              .map((line, idx) => (
                <line
                  key={`edge-${idx}`}
                  x1={line.edgeFrom.x}
                  y1={line.edgeFrom.y}
                  x2={line.edgeTo.x}
                  y2={line.edgeTo.y}
                  stroke="#94a3b8"
                  strokeWidth="2"
                />
              ))}
            {nodesAndEdges
              .filter((x) => !x.edgeFrom)
              .map((node) => (
                <g key={`node-${node.value}`}>
                  <circle cx={node.x} cy={node.y} r="20" fill={frame.inserted === node.value ? "#0ea5e9" : "#334155"} />
                  <text x={node.x} y={node.y + 5} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">
                    {node.value}
                  </text>
                </g>
              ))}
          </svg>
        </AlgoVisualizer>

        <Para>
          In-order traversal: <strong>{traversal}</strong>
        </Para>

        <CodeBlock>
          {`function insert(root, value) {
  if (!root) return new Node(value);
  if (value < root.value) root.left = insert(root.left, value);
  else if (value > root.value) root.right = insert(root.right, value);
  return root;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default BinarySearchTreeAlgo;
