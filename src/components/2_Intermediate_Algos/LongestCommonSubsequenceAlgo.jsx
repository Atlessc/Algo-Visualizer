import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../Styled Components/styledComponents";

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

const LongestCommonSubsequenceAlgo = () => {
  const { steps, lcs } = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const step = steps[stepIndex];

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 220);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>Longest Common Subsequence</Title>
        <Para>Find the longest sequence appearing in both strings in the same order (not necessarily contiguous).</Para>
        <Para>{step.message}</Para>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <button type="button" onClick={() => setIsPlaying((p) => !p)}>{isPlaying ? "Pause" : "Play"}</button>
          <button type="button" onClick={() => { setStepIndex(0); setIsPlaying(true); }}>Reset</button>
        </div>
        <Para>X = "{X}", Y = "{Y}", LCS = <strong>{lcs}</strong></Para>

        <AlgoVisualizer>
          <div style={{ overflowX: "auto", width: "100%" }}>
            <table style={{ borderCollapse: "collapse", minWidth: "min(100%, 560px)", margin: "0 auto" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #cbd5e1", padding: "6px" }}> </th>
                  <th style={{ border: "1px solid #cbd5e1", padding: "6px" }}>∅</th>
                  {Y.split("").map((ch, j) => (
                    <th key={j} style={{ border: "1px solid #cbd5e1", padding: "6px" }}>{ch}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {step.dp.map((row, i) => (
                  <tr key={i}>
                    <th style={{ border: "1px solid #cbd5e1", padding: "6px", background: "#f1f5f9" }}>{i === 0 ? "∅" : X[i - 1]}</th>
                    {row.map((val, j) => {
                      const active = i === step.i && j === step.j;
                      return (
                        <td
                          key={j}
                          style={{
                            border: "1px solid #cbd5e1",
                            padding: "6px",
                            textAlign: "center",
                            fontWeight: 700,
                            background: active ? "#0ea5e9" : "#fff",
                            color: active ? "#fff" : "#0f172a",
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
