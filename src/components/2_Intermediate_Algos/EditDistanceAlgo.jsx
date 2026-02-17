import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";

const A = "kitten";
const B = "sitting";

const buildSteps = () => {
  const m = A.length;
  const n = B.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  const steps = [];

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  steps.push({ i: 0, j: 0, dp: dp.map((r) => [...r]), message: "Initialize first row/column." });

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (A[i - 1] === B[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
      steps.push({
        i,
        j,
        dp: dp.map((r) => [...r]),
        message: `Compute dp[${i}][${j}] using chars "${A[i - 1]}" and "${B[j - 1]}".`,
      });
    }
  }

  steps.push({ i: m, j: n, dp: dp.map((r) => [...r]), message: `Done. Edit distance = ${dp[m][n]}.` });
  return steps;
};

const EditDistanceAlgo = ({ autoPlay = true, compact = false }) => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const step = steps[stepIndex];

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 300);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  return (
    <Container>
      <CardContainer>
        <Title>Edit Distance (Levenshtein)</Title>
        <Para>
          Edit Distance measures how many single-character edits are needed to convert one string
          into another. The DP table compares prefixes so each cell reuses previous
          insert/delete/replace decisions.
        </Para>
        <Para>{step.message}</Para>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <Button size={compact ? "sm" : "default"} variant="secondary" onClick={() => setIsPlaying((p) => !p)}>
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button
            size={compact ? "sm" : "default"}
            variant="outline"
            onClick={() => {
              setStepIndex(0);
              setIsPlaying(autoPlay);
            }}
          >
            Reset
          </Button>
        </div>

        <AlgoVisualizer>
          <div className="w-full overflow-x-auto">
            <table className="mx-auto border-collapse" style={{ minWidth: compact ? "420px" : "520px" }}>
              <thead>
                <tr>
                  <th className="border border-slate-300 p-1.5"> </th>
                  <th className="border border-slate-300 p-1.5">∅</th>
                  {B.split("").map((ch, j) => (
                    <th key={j} className="border border-slate-300 p-1.5">{ch}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {step.dp.map((row, i) => (
                  <tr key={i}>
                    <th className="border border-slate-300 bg-slate-100 p-1.5">
                      {i === 0 ? "∅" : A[i - 1]}
                    </th>
                    {row.map((val, j) => {
                      const active = i === step.i && j === step.j;
                      return (
                        <td
                          key={j}
                          className="border border-slate-300 p-1.5 text-center font-bold"
                          style={{
                            minWidth: compact ? "28px" : "32px",
                            background: active ? "#0ea5e9" : "#fff",
                            color: active ? "#fff" : "#0f172a"
                          }}
                        >
                          {val}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AlgoVisualizer>

        <CodeBlock>
          {`function editDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[a.length][b.length];
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default EditDistanceAlgo;
