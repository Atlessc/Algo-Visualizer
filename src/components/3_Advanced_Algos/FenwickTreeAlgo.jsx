import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../Styled Components/styledComponents";

const ARR = [3, 2, -1, 6, 5, 4, -3, 3, 7, 2, 3];

const buildSteps = () => {
  const n = ARR.length;
  const bit = Array(n + 1).fill(0);
  const steps = [{ bit: [...bit], idx: 0, msg: "Initialize BIT with zeros." }];

  const add = (i, delta) => {
    while (i <= n) {
      bit[i] += delta;
      steps.push({ bit: [...bit], idx: i, msg: `Update BIT[${i}] += ${delta}.` });
      i += i & -i;
    }
  };

  for (let i = 1; i <= n; i++) add(i, ARR[i - 1]);
  return steps;
};

const FenwickTreeAlgo = () => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const step = steps[stepIndex];

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 350);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>Fenwick Tree (Binary Indexed Tree)</Title>
        <Para>Supports prefix sums and point updates in O(log n).</Para>
        <Para>{step.msg}</Para>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <button type="button" onClick={() => setIsPlaying((p) => !p)}>{isPlaying ? "Pause" : "Play"}</button>
          <button type="button" onClick={() => { setStepIndex(0); setIsPlaying(true); }}>Reset</button>
        </div>

        <AlgoVisualizer>
          <div style={{ width: "100%", overflowX: "auto" }}>
            <div style={{ minWidth: "640px", display: "flex", gap: "8px", justifyContent: "center" }}>
              {step.bit.slice(1).map((v, i) => {
                const idx = i + 1;
                const active = idx === step.idx;
                return (
                  <div key={idx} style={{ width: "50px", borderRadius: "8px", background: active ? "#0ea5e9" : "#e2e8f0", color: active ? "#fff" : "#0f172a", padding: "8px", textAlign: "center", fontFamily: "monospace" }}>
                    <div style={{ fontSize: "11px" }}>{idx}</div>
                    <div style={{ fontWeight: 700 }}>{v}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </AlgoVisualizer>

        <CodeBlock>
          {`class Fenwick {
  constructor(n) { this.n = n; this.bit = Array(n + 1).fill(0); }
  add(i, delta) {
    while (i <= this.n) { this.bit[i] += delta; i += i & -i; }
  }
  sum(i) {
    let s = 0;
    while (i > 0) { s += this.bit[i]; i -= i & -i; }
    return s;
  }
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default FenwickTreeAlgo;
