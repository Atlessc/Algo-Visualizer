import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

const buildSteps = (a, b) => {
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  const steps = [];
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  steps.push({ i: 0, j: 0, dp: dp.map((r) => [...r]), message: "Initialize DP borders." });

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      steps.push({ i, j, dp: dp.map((r) => [...r]), message: `Fill cell (${i}, ${j}).` });
    }
  }
  steps.push({ i: m, j: n, dp: dp.map((r) => [...r]), message: `Distance = ${dp[m][n]}.` });
  return steps;
};

const LevenshteinDistanceAlgo = ({ autoPlay = true, compact = false }) => {
  const [a, setA] = useState("algorithm");
  const [b, setB] = useState("altruistic");
  const steps = useMemo(() => buildSteps(a, b), [a, b]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const step = steps[stepIndex];
  const distance = step.dp[a.length][b.length];

  useEffect(() => {
    setStepIndex(0);
    setIsPlaying(autoPlay);
  }, [a, b, autoPlay]);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 130);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  return (
    <Container>
      <CardContainer>
        <Title>Levenshtein Distance</Title>
        <Para>
          Levenshtein Distance is the minimum number of insertions, deletions, and substitutions
          needed to transform one word into another. It is widely used in spell-check and fuzzy
          matching.
        </Para>
        <div className="mb-1 flex flex-wrap items-center justify-center gap-2.5">
          <input
            type="text"
            value={a}
            onChange={(e) => setA(e.target.value || " ")}
            className={cn(
              "h-9 rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none ring-sky-300 transition focus:ring-2",
              compact ? "w-full min-w-0 text-sm" : "w-42.5 text-sm"
            )}
            aria-label="First string"
          />
          <input
            type="text"
            value={b}
            onChange={(e) => setB(e.target.value || " ")}
            className={cn(
              "h-9 rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none ring-sky-300 transition focus:ring-2",
              compact ? "w-full min-w-0 text-sm" : "w-42.5 text-sm"
            )}
            aria-label="Second string"
          />
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
        <Para>{step.message} Current distance: <strong>{distance}</strong></Para>

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
                  {b.split("").map((ch, j) => (
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
                      {i === 0 ? "∅" : a[i - 1]}
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
          {`function levenshtein(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
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

export default LevenshteinDistanceAlgo;
