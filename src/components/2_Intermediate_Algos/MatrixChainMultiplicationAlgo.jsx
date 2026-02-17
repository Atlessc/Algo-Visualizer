import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";

const DIMS = [40, 20, 30, 10, 30]; // A1=40x20, A2=20x30, A3=30x10, A4=10x30

const buildSteps = () => {
  const n = DIMS.length - 1;
  const m = Array.from({ length: n }, () => Array(n).fill(0));
  const steps = [{ l: 1, i: 0, j: 0, m: m.map((r) => [...r]), message: "Initialize diagonal to 0." }];

  for (let l = 2; l <= n; l++) {
    for (let i = 0; i <= n - l; i++) {
      const j = i + l - 1;
      m[i][j] = Number.POSITIVE_INFINITY;
      for (let k = i; k < j; k++) {
        const q = m[i][k] + m[k + 1][j] + DIMS[i] * DIMS[k + 1] * DIMS[j + 1];
        if (q < m[i][j]) m[i][j] = q;
      }
      steps.push({ l, i, j, m: m.map((r) => [...r]), message: `Best cost for chain A${i + 1}..A${j + 1}.` });
    }
  }
  steps.push({ l: n, i: 0, j: n - 1, m: m.map((r) => [...r]), message: `Optimal cost = ${m[0][n - 1]}.` });
  return steps;
};

const MatrixChainMultiplicationAlgo = ({ autoPlay = true, compact = false }) => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const step = steps[stepIndex];
  const n = DIMS.length - 1;

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 700);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  return (
    <Container>
      <CardContainer>
        <Title>Matrix Chain Multiplication</Title>
        <Para>
          Matrix Chain Multiplication chooses the best parenthesization order to minimize total
          scalar multiplications. The matrix result is the same either way, but computation cost can
          change dramatically.
        </Para>
        <Para>Matrices: A1(40×20), A2(20×30), A3(30×10), A4(10×30)</Para>
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
            <table className="mx-auto border-collapse" style={{ minWidth: compact ? "360px" : "420px" }}>
              <thead>
                <tr>
                  <th className="border border-slate-300 p-1.5">i\j</th>
                  {Array.from({ length: n }, (_, j) => (
                    <th key={j} className="border border-slate-300 p-1.5">{j + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: n }, (_, i) => (
                  <tr key={i}>
                    <th className="border border-slate-300 bg-slate-100 p-1.5">{i + 1}</th>
                    {Array.from({ length: n }, (_, j) => {
                      const active = i === step.i && j === step.j;
                      const val = step.m[i][j];
                      return (
                        <td
                          key={`${i}-${j}`}
                          className="border border-slate-300 p-1.5 text-center font-bold"
                          style={{
                            minWidth: compact ? "34px" : "40px",
                            background: active ? "#0ea5e9" : "#fff",
                            color: active ? "#fff" : "#0f172a"
                          }}
                        >
                          {j < i ? "-" : Number.isFinite(val) ? val : "∞"}
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
          {`function matrixChainOrder(p) {
  const n = p.length - 1;
  const m = Array.from({ length: n }, () => Array(n).fill(0));
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      m[i][j] = Infinity;
      for (let k = i; k < j; k++) {
        m[i][j] = Math.min(m[i][j], m[i][k] + m[k + 1][j] + p[i] * p[k + 1] * p[j + 1]);
      }
    }
  }
  return m[0][n - 1];
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default MatrixChainMultiplicationAlgo;
