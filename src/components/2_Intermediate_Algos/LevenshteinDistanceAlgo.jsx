import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../Styled Components/styledComponents";

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

const LevenshteinDistanceAlgo = () => {
  const [a, setA] = useState("algorithm");
  const [b, setB] = useState("altruistic");
  const steps = useMemo(() => buildSteps(a, b), [a, b]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const step = steps[stepIndex];
  const distance = step.dp[a.length][b.length];

  useEffect(() => {
    setStepIndex(0);
    setIsPlaying(true);
  }, [a, b]);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 130);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>Levenshtein Distance</Title>
        <Para>Measures minimum insertions, deletions, and substitutions to transform one string into another.</Para>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <input type="text" value={a} onChange={(e) => setA(e.target.value || " ")} style={{ width: "170px" }} />
          <input type="text" value={b} onChange={(e) => setB(e.target.value || " ")} style={{ width: "170px" }} />
          <button type="button" onClick={() => setIsPlaying((p) => !p)}>{isPlaying ? "Pause" : "Play"}</button>
          <button type="button" onClick={() => { setStepIndex(0); setIsPlaying(true); }}>Reset</button>
        </div>
        <Para>{step.message} Current distance: <strong>{distance}</strong></Para>

        <AlgoVisualizer>
          <div style={{ overflowX: "auto", width: "100%" }}>
            <table style={{ borderCollapse: "collapse", minWidth: "560px", margin: "0 auto" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #cbd5e1", padding: "6px" }}> </th>
                  <th style={{ border: "1px solid #cbd5e1", padding: "6px" }}>∅</th>
                  {b.split("").map((ch, j) => (
                    <th key={j} style={{ border: "1px solid #cbd5e1", padding: "6px" }}>{ch}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {step.dp.map((row, i) => (
                  <tr key={i}>
                    <th style={{ border: "1px solid #cbd5e1", padding: "6px", background: "#f1f5f9" }}>{i === 0 ? "∅" : a[i - 1]}</th>
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
