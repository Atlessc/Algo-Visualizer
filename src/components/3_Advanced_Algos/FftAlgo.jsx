import React, { useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../Styled Components/styledComponents";

const INPUT = [3, 1, 0, 4, 8, 6, 2, 5];

const splitStages = (arr) => {
  const stages = [];
  const rec = (a, depth = 0, label = "x") => {
    stages.push({ depth, label, values: [...a] });
    if (a.length <= 1) return;
    const even = a.filter((_, i) => i % 2 === 0);
    const odd = a.filter((_, i) => i % 2 === 1);
    rec(even, depth + 1, `${label}_even`);
    rec(odd, depth + 1, `${label}_odd`);
  };
  rec(arr);
  return stages;
};

const FftAlgo = () => {
  const stages = useMemo(() => splitStages(INPUT), []);
  const [idx, setIdx] = useState(0);
  const s = stages[idx];
  const maxDepth = Math.max(...stages.map((x) => x.depth));

  return (
    <Container>
      <CardContainer>
        <Title>FFT (Fast Fourier Transform)</Title>
        <Para>
          FFT computes the discrete Fourier transform in O(n log n) instead of O(n^2) by repeatedly
          splitting the sequence into even and odd indices, then combining results via butterfly
          operations. It is foundational in signal processing, polynomial multiplication, and
          convolution.
        </Para>
        <Para>Input sequence: [{INPUT.join(", ")}]</Para>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <input type="range" min="0" max={stages.length - 1} value={idx} onChange={(e) => setIdx(Number(e.target.value))} />
          <strong>{idx + 1}/{stages.length}</strong>
        </div>
        <Para>Stage: {s.label} (depth {s.depth}/{maxDepth})</Para>

        <AlgoVisualizer>
          <div style={{ width: "100%", maxWidth: "860px", margin: "0 auto", background: "#eef2ff", borderRadius: "12px", padding: "12px" }}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center" }}>
              {s.values.map((v, i) => (
                <div key={i} style={{ minWidth: "46px", padding: "8px 10px", borderRadius: "8px", background: "#0ea5e9", color: "#fff", textAlign: "center", fontWeight: 700 }}>
                  {v}
                </div>
              ))}
            </div>
          </div>
        </AlgoVisualizer>

        <CodeBlock>
          {`function fft(a) {
  const n = a.length;
  if (n === 1) return [a[0]];
  const even = fft(a.filter((_, i) => i % 2 === 0));
  const odd = fft(a.filter((_, i) => i % 2 === 1));
  const out = Array(n);
  for (let k = 0; k < n / 2; k++) {
    const w = expComplex(-2 * Math.PI * k / n); // twiddle
    out[k] = even[k] + w * odd[k];
    out[k + n / 2] = even[k] - w * odd[k];
  }
  return out;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default FftAlgo;
