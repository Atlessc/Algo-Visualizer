import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

const X = "AGGTAB";
const Y = "GXTXAYB";

const buildSteps = () => {
  const m = X.length;
  const n = Y.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  const steps = [{ i: 0, j: 0, dp: dp.map((r) => [...r]), message: "Initialize table to zero." }];

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (X[i - 1] === Y[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      steps.push({ i, j, dp: dp.map((r) => [...r]), message: `Fill dp[${i}][${j}].` });
    }
  }

  let i = m;
  let j = n;
  const chars = [];
  while (i > 0 && j > 0) {
    if (X[i - 1] === Y[j - 1]) {
      chars.push(X[i - 1]);
      i -= 1;
      j -= 1;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i -= 1;
    } else {
      j -= 1;
    }
  }
  const lcs = chars.reverse().join("");
  steps.push({ i: m, j: n, dp: dp.map((r) => [...r]), message: `LCS = "${lcs}" (length ${lcs.length}).` });
  return { steps, lcs };
};

const LongestCommonSubsequenceAlgo = ({ autoPlay = true, compact = false }) => {
  const { steps, lcs } = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const step = steps[stepIndex];

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 220);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  return (
    <Container>
      <CardContainer>
        <Title>Longest Common Subsequence</Title>
        <Para>Find the longest sequence appearing in both strings in the same order (not necessarily contiguous).</Para>
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
        <Para>X = "{X}", Y = "{Y}", LCS = <strong>{lcs}</strong></Para>

        <AlgoVisualizer>
          <div className="w-full overflow-x-auto">
            <table
              className={cn("mx-auto border-collapse", compact ? "text-xs" : "text-sm")}
              style={{ minWidth: "560px" }}
            >
              <thead>
                <tr>
                  <th className={cn("border border-slate-300", compact ? "px-1.5 py-1" : "px-2 py-1.5")}> </th>
                  <th className={cn("border border-slate-300", compact ? "px-1.5 py-1" : "px-2 py-1.5")}>∅</th>
                  {Y.split("").map((ch, j) => (
                    <th
                      key={j}
                      className={cn("border border-slate-300", compact ? "px-1.5 py-1" : "px-2 py-1.5")}
                    >
                      {ch}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {step.dp.map((row, i) => (
                  <tr key={i}>
                    <th
                      className={cn(
                        "border border-slate-300 bg-slate-100",
                        compact ? "px-1.5 py-1" : "px-2 py-1.5"
                      )}
                    >
                      {i === 0 ? "∅" : X[i - 1]}
                    </th>
                    {row.map((val, j) => {
                      const active = i === step.i && j === step.j;
                      return (
                        <td
                          key={j}
                          className={cn(
                            "border border-slate-300 text-center font-bold",
                            compact ? "px-1.5 py-1" : "px-2 py-1.5",
                            active ? "bg-sky-500 text-white" : "bg-white text-slate-900"
                          )}
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
          {`function lcs(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[a.length][b.length];
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default LongestCommonSubsequenceAlgo;
