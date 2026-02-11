import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";

const RAW = "abacdfgdcaba";
const T = `^#${RAW.split("").join("#")}#$`;

const buildSteps = () => {
  const p = Array(T.length).fill(0);
  let center = 0;
  let right = 0;
  const steps = [];

  for (let i = 1; i < T.length - 1; i++) {
    const mirror = 2 * center - i;
    if (i < right) p[i] = Math.min(right - i, p[mirror]);
    while (T[i + 1 + p[i]] === T[i - 1 - p[i]]) p[i]++;
    if (i + p[i] > right) {
      center = i;
      right = i + p[i];
    }
    steps.push({ i, p: [...p], center, right, msg: `Center at ${i}, radius ${p[i]}.` });
  }

  let maxLen = 0;
  let centerIndex = 0;
  for (let i = 1; i < p.length - 1; i++) {
    if (p[i] > maxLen) {
      maxLen = p[i];
      centerIndex = i;
    }
  }
  const start = Math.floor((centerIndex - maxLen) / 2);
  const longest = RAW.slice(start, start + maxLen);
  steps.push({ i: centerIndex, p: [...p], center, right, longest, msg: `Longest palindrome "${longest}" (len=${maxLen}).` });
  return steps;
};

const ManachersAlgorithmAlgo = ({ autoPlay = true, compact = false }) => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const step = steps[stepIndex];
  const maxP = Math.max(...step.p, 1);

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 220);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>Manacher&apos;s Algorithm</Title>
        <Para>
          Manacher finds the longest palindromic substring in linear time O(n) by reusing palindrome
          radii around mirrored centers in a transformed string.
        </Para>
        <Para>Input: <strong>{RAW}</strong></Para>
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
            viewBox={`0 0 ${T.length * 22 + 20} 200`}
            preserveAspectRatio="xMidYMid meet"
            className="mx-auto h-auto w-full max-w-[980px]"
          >
            {T.split("").map((ch, i) => {
              const x = 10 + i * 22;
              const h = 22 + (step.p[i] / maxP) * 90;
              const y = 150 - h;
              return (
                <g key={i}>
                  <text x={x + 8} y="20" textAnchor="middle" fill={i === step.i ? "#ef4444" : "#334155"} fontSize="11">{ch}</text>
                  <rect x={x} y={y} width="16" height={h} rx="4" fill={i === step.i ? "#0ea5e9" : "#94a3b8"} />
                  <text x={x + 8} y={y - 4} textAnchor="middle" fontSize="9" fill="#0f172a">{step.p[i]}</text>
                </g>
              );
            })}
          </svg>
          {step.longest && <Para>Longest palindrome: <strong>{step.longest}</strong></Para>}
        </AlgoVisualizer>
        <CodeBlock>
          {`function manacher(s) {
  const t = "^#" + s.split("").join("#") + "#$";
  const p = Array(t.length).fill(0);
  let C = 0, R = 0;
  for (let i = 1; i < t.length - 1; i++) {
    const mir = 2 * C - i;
    if (i < R) p[i] = Math.min(R - i, p[mir]);
    while (t[i + 1 + p[i]] === t[i - 1 - p[i]]) p[i]++;
    if (i + p[i] > R) { C = i; R = i + p[i]; }
  }
  return p;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default ManachersAlgorithmAlgo;
