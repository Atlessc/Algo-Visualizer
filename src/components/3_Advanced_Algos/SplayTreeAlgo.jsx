import React, { useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../Styled Components/styledComponents";

const STATES = [
  {
    name: "Before Access(25)",
    nodes: [
      { v: 40, x: 230, y: 40 },
      { v: 20, x: 150, y: 120 },
      { v: 60, x: 310, y: 120 },
      { v: 10, x: 110, y: 200 },
      { v: 25, x: 190, y: 200 },
    ],
    edges: [[40, 20], [40, 60], [20, 10], [20, 25]],
    highlight: 25,
    note: "Access node 25 (deep in left subtree).",
  },
  {
    name: "After Zig-Zag + Zig",
    nodes: [
      { v: 25, x: 230, y: 40 },
      { v: 20, x: 150, y: 120 },
      { v: 40, x: 310, y: 120 },
      { v: 10, x: 110, y: 200 },
      { v: 60, x: 350, y: 200 },
    ],
    edges: [[25, 20], [25, 40], [20, 10], [40, 60]],
    highlight: 25,
    note: "Splay rotates accessed node to root for faster future access.",
  },
];

const SplayTreeAlgo = () => {
  const [idx, setIdx] = useState(0);
  const s = STATES[idx];
  const byV = Object.fromEntries(s.nodes.map((n) => [n.v, n]));

  return (
    <Container>
      <CardContainer>
        <Title>Splay Tree Operations</Title>
        <Para>
          A splay tree is a self-adjusting binary search tree. After every access/insert/delete,
          the touched node is rotated to the root (splaying). This gives good amortized performance
          and keeps frequently accessed keys near the top.
        </Para>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          {STATES.map((st, i) => (
            <button key={st.name} type="button" onClick={() => setIdx(i)} style={{ opacity: idx === i ? 1 : 0.8 }}>
              {st.name}
            </button>
          ))}
        </div>
        <Para>{s.note}</Para>

        <AlgoVisualizer>
          <svg width="100%" viewBox="0 0 460 260" preserveAspectRatio="xMidYMid meet" style={{ maxWidth: "700px", height: "auto" }}>
            {s.edges.map(([u, v]) => (
              <line key={`${u}-${v}`} x1={byV[u].x} y1={byV[u].y} x2={byV[v].x} y2={byV[v].y} stroke="#94a3b8" strokeWidth="2" />
            ))}
            {s.nodes.map((n) => (
              <g key={n.v}>
                <circle cx={n.x} cy={n.y} r="18" fill={n.v === s.highlight ? "#0ea5e9" : "#334155"} />
                <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#fff" fontWeight="700">{n.v}</text>
              </g>
            ))}
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function splay(root, key) {
  if (!root || root.key === key) return root;
  if (key < root.key) {
    if (!root.left) return root;
    if (key < root.left.key) {          // zig-zig
      root.left.left = splay(root.left.left, key);
      root = rotateRight(root);
    } else if (key > root.left.key) {   // zig-zag
      root.left.right = splay(root.left.right, key);
      if (root.left.right) root.left = rotateLeft(root.left);
    }
    return root.left ? rotateRight(root) : root;
  } else {
    // symmetric zag-zag / zag-zig cases
    // ...
    return root;
  }
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default SplayTreeAlgo;
