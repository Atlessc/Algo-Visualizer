import React, { useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../Styled Components/styledComponents";

const ARR = [2, 1, 5, 3, 4];

const buildTree = () => {
  const n = ARR.length;
  const tree = Array(4 * n).fill(0);
  const steps = [];
  const build = (node, l, r) => {
    if (l === r) {
      tree[node] = ARR[l];
      steps.push({ tree: [...tree], node, msg: `Set leaf node ${node} = arr[${l}] = ${ARR[l]}.` });
      return;
    }
    const mid = Math.floor((l + r) / 2);
    build(node * 2, l, mid);
    build(node * 2 + 1, mid + 1, r);
    tree[node] = tree[node * 2] + tree[node * 2 + 1];
    steps.push({ tree: [...tree], node, msg: `Set node ${node} = left + right = ${tree[node]}.` });
  };
  build(1, 0, n - 1);
  return steps;
};

const SegmentTreeAlgo = () => {
  const steps = useMemo(() => buildTree(), []);
  const [stepIndex, setStepIndex] = useState(steps.length - 1);
  const step = steps[stepIndex];
  const values = step.tree.slice(1, 16).filter((x, i) => i === 0 || x !== 0);

  return (
    <Container>
      <CardContainer>
        <Title>Segment Tree</Title>
        <Para>Hierarchical structure for range queries and point updates in O(log n).</Para>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <input
            type="range"
            min="0"
            max={steps.length - 1}
            value={stepIndex}
            onChange={(e) => setStepIndex(Number(e.target.value))}
          />
          <strong>{stepIndex + 1}/{steps.length}</strong>
        </div>
        <Para>{step.msg}</Para>

        <AlgoVisualizer>
          <div style={{ width: "100%", overflowX: "auto" }}>
            <div style={{ minWidth: "680px", display: "flex", gap: "8px", justifyContent: "center" }}>
              {values.map((v, i) => {
                const nodeIdx = i + 1;
                const active = nodeIdx === step.node;
                return (
                  <div key={nodeIdx} style={{ width: "54px", borderRadius: "8px", background: active ? "#0ea5e9" : "#e2e8f0", color: active ? "#fff" : "#0f172a", padding: "8px", textAlign: "center", fontFamily: "monospace" }}>
                    <div style={{ fontSize: "11px" }}>{nodeIdx}</div>
                    <div style={{ fontWeight: 700 }}>{v}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </AlgoVisualizer>

        <CodeBlock>
          {`function build(node, l, r) {
  if (l === r) { tree[node] = arr[l]; return; }
  const mid = (l + r) >> 1;
  build(node * 2, l, mid);
  build(node * 2 + 1, mid + 1, r);
  tree[node] = tree[node * 2] + tree[node * 2 + 1];
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default SegmentTreeAlgo;
