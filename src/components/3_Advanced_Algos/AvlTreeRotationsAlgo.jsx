import React, { useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../Styled Components/styledComponents";

const SCENARIOS = [
  {
    name: "LL Rotation",
    before: [{ v: 30, x: 180, y: 40 }, { v: 20, x: 120, y: 120 }, { v: 10, x: 70, y: 200 }],
    edgesB: [[30, 20], [20, 10]],
    after: [{ v: 20, x: 180, y: 40 }, { v: 10, x: 120, y: 120 }, { v: 30, x: 240, y: 120 }],
    edgesA: [[20, 10], [20, 30]],
    note: "Right rotate at 30.",
  },
  {
    name: "RR Rotation",
    before: [{ v: 10, x: 180, y: 40 }, { v: 20, x: 240, y: 120 }, { v: 30, x: 290, y: 200 }],
    edgesB: [[10, 20], [20, 30]],
    after: [{ v: 20, x: 180, y: 40 }, { v: 10, x: 120, y: 120 }, { v: 30, x: 240, y: 120 }],
    edgesA: [[20, 10], [20, 30]],
    note: "Left rotate at 10.",
  },
];

const drawTree = (nodes, edges, offsetY = 0) => {
  const byV = Object.fromEntries(nodes.map((n) => [n.v, n]));
  return (
    <>
      {edges.map(([u, v]) => (
        <line key={`${u}-${v}-${offsetY}`} x1={byV[u].x} y1={byV[u].y + offsetY} x2={byV[v].x} y2={byV[v].y + offsetY} stroke="#94a3b8" strokeWidth="2" />
      ))}
      {nodes.map((n) => (
        <g key={`${n.v}-${offsetY}`}>
          <circle cx={n.x} cy={n.y + offsetY} r="18" fill="#334155" />
          <text x={n.x} y={n.y + offsetY + 4} textAnchor="middle" fill="#fff" fontWeight="700">{n.v}</text>
        </g>
      ))}
    </>
  );
};

const AvlTreeRotationsAlgo = () => {
  const [idx, setIdx] = useState(0);
  const s = SCENARIOS[idx];

  return (
    <Container>
      <CardContainer>
        <Title>AVL Tree Rotations</Title>
        <Para>AVL rebalances BST by rotations when balance factor becomes -1/0/+1 violated.</Para>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          {SCENARIOS.map((sc, i) => (
            <button key={sc.name} type="button" onClick={() => setIdx(i)} style={{ opacity: idx === i ? 1 : 0.8 }}>
              {sc.name}
            </button>
          ))}
        </div>
        <Para>{s.note}</Para>

        <AlgoVisualizer>
          <svg width="100%" viewBox="0 0 360 520" preserveAspectRatio="xMidYMid meet" style={{ maxWidth: "500px", height: "auto" }}>
            <text x="18" y="20" fill="#0f172a" fontWeight="700">Before</text>
            {drawTree(s.before, s.edgesB, 20)}
            <line x1="20" y1="250" x2="340" y2="250" stroke="#cbd5e1" strokeDasharray="4 4" />
            <text x="18" y="278" fill="#0f172a" fontWeight="700">After</text>
            {drawTree(s.after, s.edgesA, 280)}
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function insert(node, key) {
  if (!node) return { key, left: null, right: null, h: 1 };
  if (key < node.key) node.left = insert(node.left, key);
  else if (key > node.key) node.right = insert(node.right, key);
  else return node;

  node.h = 1 + Math.max(height(node.left), height(node.right));
  const balance = height(node.left) - height(node.right);

  if (balance > 1 && key < node.left.key) return rightRotate(node); // LL
  if (balance < -1 && key > node.right.key) return leftRotate(node); // RR
  if (balance > 1 && key > node.left.key) {
    node.left = leftRotate(node.left); // LR
    return rightRotate(node);
  }
  if (balance < -1 && key < node.right.key) {
    node.right = rightRotate(node.right); // RL
    return leftRotate(node);
  }
  return node;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default AvlTreeRotationsAlgo;
