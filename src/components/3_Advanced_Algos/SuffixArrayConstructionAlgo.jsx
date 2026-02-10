import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../Styled Components/styledComponents";

const WORD = "banana$";

const buildSteps = () => {
  const steps = [];
  const suffixes = [];
  for (let i = 0; i < WORD.length; i++) {
    suffixes.push({ index: i, suffix: WORD.slice(i) });
    steps.push({
      suffixes: [...suffixes],
      sorted: [],
      message: `Collect suffix starting at index ${i}: "${WORD.slice(i)}".`,
    });
  }
  const sorted = [...suffixes].sort((a, b) => a.suffix.localeCompare(b.suffix));
  steps.push({ suffixes: [...suffixes], sorted, message: "Sort suffixes lexicographically to build suffix array." });
  return steps;
};

const SuffixArrayConstructionAlgo = () => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const step = steps[stepIndex];

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 1000);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>Suffix Array Construction</Title>
        <Para>Suffix array stores starting indices of all suffixes in lexicographic order.</Para>
        <Para>String: <strong>{WORD}</strong></Para>
        <Para>{step.message}</Para>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <button type="button" onClick={() => setIsPlaying((p) => !p)}>{isPlaying ? "Pause" : "Play"}</button>
          <button type="button" onClick={() => { setStepIndex(0); setIsPlaying(true); }}>Reset</button>
        </div>

        <AlgoVisualizer>
          <div style={{ width: "100%", display: "grid", gap: "12px", maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ background: "#eef2ff", borderRadius: "12px", padding: "10px" }}>
              <strong>Collected suffixes</strong>
              {step.suffixes.map((s) => (
                <div key={s.index} style={{ fontFamily: "monospace", marginTop: "6px" }}>
                  [{s.index}] {s.suffix}
                </div>
              ))}
            </div>
            {step.sorted.length > 0 && (
              <div style={{ background: "#f0fdf4", borderRadius: "12px", padding: "10px" }}>
                <strong>Sorted suffixes (Suffix Array)</strong>
                {step.sorted.map((s) => (
                  <div key={`sorted-${s.index}`} style={{ fontFamily: "monospace", marginTop: "6px" }}>
                    SA includes index {s.index} because suffix = {s.suffix}
                  </div>
                ))}
              </div>
            )}
          </div>
        </AlgoVisualizer>

        <CodeBlock>
          {`function buildSuffixArray(s) {
  const suffixes = [];
  for (let i = 0; i < s.length; i++) {
    suffixes.push({ index: i, suffix: s.slice(i) });
  }
  suffixes.sort((a, b) => a.suffix.localeCompare(b.suffix));
  return suffixes.map((x) => x.index);
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default SuffixArrayConstructionAlgo;
