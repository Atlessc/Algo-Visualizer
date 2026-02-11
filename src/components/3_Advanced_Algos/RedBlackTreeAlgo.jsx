import React from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";

const nodes = [
  { v: 20, x: 220, y: 50, c: "black" },
  { v: 10, x: 140, y: 130, c: "red" },
  { v: 30, x: 300, y: 130, c: "black" },
  { v: 5, x: 90, y: 210, c: "black" },
  { v: 15, x: 190, y: 210, c: "black" },
  { v: 25, x: 260, y: 210, c: "red" },
  { v: 35, x: 340, y: 210, c: "red" },
];
const edges = [[20, 10], [20, 30], [10, 5], [10, 15], [30, 25], [30, 35]];

const RedBlackTreeAlgo = ({ compact = false }) => {
  const byV = Object.fromEntries(nodes.map((n) => [n.v, n]));
  return (
    <Container>
      <CardContainer>
        <Title>Red-Black Tree Operations</Title>
        <Para>Red-Black trees maintain near-balanced height using node colors and rotations.</Para>
        <Para>
          Rules: root black, red nodes can&apos;t have red children, every root-to-leaf path has same black-height.
        </Para>

        <AlgoVisualizer>
          <svg
            width="100%"
            viewBox="0 0 430 270"
            preserveAspectRatio="xMidYMid meet"
            className="mx-auto h-auto w-full max-w-[620px]"
          >
            {edges.map(([u, v]) => (
              <line key={`${u}-${v}`} x1={byV[u].x} y1={byV[u].y} x2={byV[v].x} y2={byV[v].y} stroke="#94a3b8" strokeWidth="2" />
            ))}
            {nodes.map((n) => (
              <g key={n.v}>
                <circle cx={n.x} cy={n.y} r="18" fill={n.c === "red" ? "#ef4444" : "#111827"} />
                <text x={n.x} y={n.y + 4} textAnchor="middle" fill="#fff" fontWeight="700">{n.v}</text>
              </g>
            ))}
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function insertFixup(z, root) {
  while (z.parent && z.parent.color === "RED") {
    const gp = z.parent.parent;
    if (z.parent === gp.left) {
      const y = gp.right; // uncle
      if (y && y.color === "RED") {
        z.parent.color = "BLACK";
        y.color = "BLACK";
        gp.color = "RED";
        z = gp;
      } else {
        if (z === z.parent.right) {
          z = z.parent;
          leftRotate(z);
        }
        z.parent.color = "BLACK";
        gp.color = "RED";
        rightRotate(gp);
      }
    } else {
      // symmetric cases with left/right swapped
      // ...
      break;
    }
  }
  root.color = "BLACK";
  return root;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default RedBlackTreeAlgo;
