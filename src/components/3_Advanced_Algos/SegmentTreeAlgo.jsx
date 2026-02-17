import React, { useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { cn } from "../../lib/utils";

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

const SegmentTreeAlgo = ({ compact = false }) => {
  const steps = useMemo(() => buildTree(), []);
  const [stepIndex, setStepIndex] = useState(steps.length - 1);
  const step = steps[stepIndex];
  const values = step.tree.slice(1, 16).filter((x, i) => i === 0 || x !== 0);

  return (
    <Container>
      <CardContainer>
        <Title>Segment Tree</Title>
        <Para>
          A Segment Tree breaks an array into nested ranges, so each node summarizes a segment. This
          makes range queries and point updates efficient, even on large arrays.
        </Para>
        <div className="mb-1 flex flex-wrap items-center justify-center gap-2.5">
          <input
            type="range"
            min="0"
            max={steps.length - 1}
            value={stepIndex}
            onChange={(e) => setStepIndex(Number(e.target.value))}
            className={cn("w-full", compact ? "max-w-60" : "max-w-80")}
          />
          <strong className={cn(compact ? "text-sm" : "text-base")}>{stepIndex + 1}/{steps.length}</strong>
        </div>
        <Para>{step.msg}</Para>

        <AlgoVisualizer>
          <div className="w-full overflow-x-auto">
            <div className="mx-auto flex min-w-170 justify-center gap-2">
              {values.map((v, i) => {
                const nodeIdx = i + 1;
                const active = nodeIdx === step.node;
                return (
                  <div
                    key={nodeIdx}
                    className={cn(
                      "rounded-lg px-1 py-2 text-center font-mono",
                      compact ? "w-10" : "w-12",
                      active ? "bg-sky-500 text-white" : "bg-slate-200 text-slate-900"
                    )}
                  >
                    <div className={cn(compact ? "text-[10px]" : "text-[11px]")}>{nodeIdx}</div>
                    <div className="font-bold">{v}</div>
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
