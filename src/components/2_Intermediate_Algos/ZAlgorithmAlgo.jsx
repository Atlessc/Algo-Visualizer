import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";

const TEXT = "aabcaabxaaaz";

const buildSteps = () => {
  const n = TEXT.length;
  const z = Array(n).fill(0);
  let l = 0;
  let r = 0;
  const steps = [{ i: 0, l, r, z: [...z], message: "Initialize Z-array." }];

  for (let i = 1; i < n; i++) {
    if (i <= r) z[i] = Math.min(r - i + 1, z[i - l]);

    while (i + z[i] < n && TEXT[z[i]] === TEXT[i + z[i]]) {
      z[i]++;
      steps.push({ i, l, r, z: [...z], message: `Extend match at i=${i}, Z[${i}] now ${z[i]}.` });
    }

    if (i + z[i] - 1 > r) {
      l = i;
      r = i + z[i] - 1;
    }

    steps.push({ i, l, r, z: [...z], message: `Set Z[${i}] = ${z[i]}, window [L,R] = [${l},${r}].` });
  }

  steps.push({ i: n - 1, l, r, z: [...z], message: "Z-array construction complete." });
  return steps;
};

const ZAlgorithmAlgo = ({ autoPlay = true, compact = false }) => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const step = steps[stepIndex];
  const cellW = 34;
  const chartW = TEXT.length * (cellW + 4);

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 450);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>Z Algorithm</Title>
        <Para>
          The Z Algorithm preprocesses a string so Z[i] tells how many characters from position i
          match the prefix. It enables linear-time pattern matching by reusing previously matched
          ranges.
        </Para>
        <Para>{step.message}</Para>
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
        <Para>String: <strong>{TEXT}</strong></Para>

        <AlgoVisualizer>
          <div className="w-full overflow-x-auto">
            <svg
              width="100%"
              viewBox={`0 0 ${chartW + 10} 170`}
              preserveAspectRatio="xMidYMid meet"
              className="mx-auto h-auto w-full max-w-215"
            >
              {TEXT.split("").map((ch, i) => {
                const x = 6 + i * (cellW + 4);
                const inWindow = i >= step.l && i <= step.r;
                const isI = i === step.i;
                return (
                  <g key={`ch-${i}`}>
                    <rect x={x} y={14} width={cellW} height={30} rx="7" fill={isI ? "#ef4444" : inWindow ? "#0ea5e9" : "#64748b"} />
                    <text x={x + cellW / 2} y={34} textAnchor="middle" fill="#fff" fontWeight="700">{ch}</text>
                    <rect x={x} y={68} width={cellW} height={30} rx="7" fill={i === step.i ? "#f59e0b" : "#e2e8f0"} />
                    <text x={x + cellW / 2} y={88} textAnchor="middle" fill="#0f172a" fontWeight="700">{step.z[i]}</text>
                    <text x={x + cellW / 2} y={116} textAnchor="middle" fill="#475569" fontSize="11">{i}</text>
                  </g>
                );
              })}
              <text x="8" y="12" fontSize="11" fill="#475569">chars</text>
              <text x="8" y="66" fontSize="11" fill="#475569">Z</text>
            </svg>
          </div>
        </AlgoVisualizer>

        <CodeBlock>
          {`function zAlgorithm(s) {
  const z = Array(s.length).fill(0);
  let L = 0, R = 0;
  for (let i = 1; i < s.length; i++) {
    if (i <= R) z[i] = Math.min(R - i + 1, z[i - L]);
    while (i + z[i] < s.length && s[z[i]] === s[i + z[i]]) z[i]++;
    if (i + z[i] - 1 > R) { L = i; R = i + z[i] - 1; }
  }
  return z;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default ZAlgorithmAlgo;
