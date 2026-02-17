import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";

const ARR = [10, 9, 2, 5, 3, 7, 101, 18];

const buildSteps = () => {
  const n = ARR.length;
  const dp = Array(n).fill(1);
  const parent = Array(n).fill(-1);
  const steps = [{ i: 0, dp: [...dp], parent: [...parent], msg: "Initialize LIS length at each index to 1." }];

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (ARR[j] < ARR[i] && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
        parent[i] = j;
      }
    }
    steps.push({ i, dp: [...dp], parent: [...parent], msg: `Compute LIS ending at index ${i}.` });
  }

  let best = 0;
  for (let i = 1; i < n; i++) if (dp[i] > dp[best]) best = i;
  const seq = [];
  for (let k = best; k !== -1; k = parent[k]) seq.push(ARR[k]);
  seq.reverse();
  steps.push({ i: n - 1, dp: [...dp], parent: [...parent], seq, msg: `LIS length ${dp[best]} sequence [${seq.join(", ")}].` });
  return steps;
};

const LongestIncreasingSubsequenceAlgo = ({ autoPlay = true, compact = false }) => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const step = steps[stepIndex];
  const maxDp = Math.max(...step.dp, 1);

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 850);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>Longest Increasing Subsequence (LIS)</Title>
        <Para>
          Longest Increasing Subsequence finds the longest strictly increasing order you can keep
          from an array without reordering elements. Dynamic programming tracks the best subsequence
          length ending at each index.
        </Para>
        <Para>Array: [{ARR.join(", ")}]</Para>
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
            onClick={() => { setStepIndex(0); setIsPlaying(true); }}
          >
            Reset
          </Button>
        </div>

        <AlgoVisualizer>
          <svg
            width="100%"
            viewBox="0 0 620 250"
            preserveAspectRatio="xMidYMid meet"
            className="mx-auto h-auto w-full max-w-[860px]"
          >
            {ARR.map((v, i) => {
              const x = 20 + i * 72;
              const h = 30 + (step.dp[i] / maxDp) * 120;
              const y = 200 - h;
              const fill = i === step.i ? "#0ea5e9" : "#64748b";
              return (
                <g key={i}>
                  <rect x={x} y={y} width="56" height={h} rx="10" fill={fill} />
                  <text x={x + 28} y={y - 8} textAnchor="middle" fill="#0f172a" fontSize="12">arr={v}</text>
                  <text x={x + 28} y={y + 18} textAnchor="middle" fill="#fff" fontWeight="700">{step.dp[i]}</text>
                </g>
              );
            })}
          </svg>
          {step.seq && <Para>LIS: <strong>[{step.seq.join(", ")}]</strong></Para>}
        </AlgoVisualizer>

        <CodeBlock>
          {`function lis(arr) {
  const n = arr.length;
  const dp = Array(n).fill(1);
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
  return Math.max(...dp);
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default LongestIncreasingSubsequenceAlgo;
