import React, { useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { cn } from "../../lib/utils";

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

const FftAlgo = ({ compact = false }) => {
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
        <div className="mb-1 flex flex-wrap items-center justify-center gap-2.5">
          <input
            type="range"
            min="0"
            max={stages.length - 1}
            value={idx}
            onChange={(e) => setIdx(Number(e.target.value))}
            className={cn("w-full", compact ? "max-w-[260px]" : "max-w-[340px]")}
          />
          <strong className={cn(compact ? "text-sm" : "text-base")}>{idx + 1}/{stages.length}</strong>
        </div>
        <Para>Stage: {s.label} (depth {s.depth}/{maxDepth})</Para>

        <AlgoVisualizer>
          <div className="mx-auto w-full max-w-[860px] rounded-xl bg-indigo-100 p-3">
            <div className="flex flex-wrap justify-center gap-2">
              {s.values.map((v, i) => (
                <div
                  key={i}
                  className={cn(
                    "min-w-[46px] rounded-lg bg-sky-500 px-2.5 py-2 text-center font-bold text-white",
                    compact ? "text-xs" : "text-sm"
                  )}
                >
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
