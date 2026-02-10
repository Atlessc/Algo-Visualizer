import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../Styled Components/styledComponents";

const TEXT = "ABCCDDAEFG";
const PATTERN = "CDD";
const MOD = 101;
const BASE = 256;

const hashString = (s) => s.split("").reduce((h, ch) => (h * BASE + ch.charCodeAt(0)) % MOD, 0);

const buildSteps = () => {
  const m = PATTERN.length;
  const n = TEXT.length;
  const steps = [];
  const pHash = hashString(PATTERN);
  let tHash = hashString(TEXT.slice(0, m));
  let h = 1;
  for (let i = 0; i < m - 1; i++) h = (h * BASE) % MOD;

  for (let i = 0; i <= n - m; i++) {
    const window = TEXT.slice(i, i + m);
    const equalHash = pHash === tHash;
    const exactMatch = equalHash && window === PATTERN;
    steps.push({
      i,
      window,
      tHash,
      pHash,
      equalHash,
      exactMatch,
      message: exactMatch ? `Match at index ${i}.` : equalHash ? `Hash match at ${i}, verify characters.` : `Hash mismatch at ${i}.`,
    });
    if (i < n - m) {
      tHash = (BASE * (tHash - TEXT.charCodeAt(i) * h) + TEXT.charCodeAt(i + m)) % MOD;
      if (tHash < 0) tHash += MOD;
    }
  }
  return steps;
};

const RabinKarpAlgorithmAlgo = () => {
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
        <Title>Rabin-Karp Algorithm</Title>
        <Para>Compares rolling hash of each text window with pattern hash, then verifies if needed.</Para>
        <Para>{step.message}</Para>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <button type="button" onClick={() => setIsPlaying((p) => !p)}>{isPlaying ? "Pause" : "Play"}</button>
          <button type="button" onClick={() => { setStepIndex(0); setIsPlaying(true); }}>Reset</button>
        </div>
        <Para>Pattern: "{PATTERN}" | Pattern hash: {step.pHash} | Window hash: {step.tHash}</Para>

        <AlgoVisualizer>
          <div style={{ overflowX: "auto", width: "100%" }}>
            <div style={{ minWidth: `${TEXT.length * 38}px`, width: "fit-content", margin: "0 auto" }}>
              <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
                {TEXT.split("").map((ch, idx) => {
                  const inWindow = idx >= step.i && idx < step.i + PATTERN.length;
                  const matchCell = inWindow && PATTERN[idx - step.i] === ch && step.equalHash;
                  const bg = inWindow ? (matchCell ? "#16a34a" : "#f59e0b") : "#d1d5db";
                  return (
                    <div key={idx} style={{ width: "32px", height: "32px", borderRadius: "6px", background: bg, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                      {ch}
                    </div>
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                {TEXT.split("").map((_, idx) => {
                  const rel = idx - step.i;
                  const show = rel >= 0 && rel < PATTERN.length;
                  return (
                    <div key={`p-${idx}`} style={{ width: "32px", height: "32px", borderRadius: "6px", background: show ? "#0ea5e9" : "transparent", color: show ? "#fff" : "transparent", border: show ? "1px solid #93c5fd" : "1px solid transparent", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                      {show ? PATTERN[rel] : "_"}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </AlgoVisualizer>

        <CodeBlock>
          {`function rabinKarp(text, pattern) {
  const pHash = hash(pattern);
  let wHash = hash(text.slice(0, pattern.length));
  for (let i = 0; i <= text.length - pattern.length; i++) {
    if (pHash === wHash && text.slice(i, i + pattern.length) === pattern) return i;
    wHash = rollHash(wHash, text[i], text[i + pattern.length]);
  }
  return -1;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default RabinKarpAlgorithmAlgo;
