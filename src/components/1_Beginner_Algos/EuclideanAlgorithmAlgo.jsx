import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock,
  Para,
} from "../ui/algo-primitives";

const getEuclideanSteps = (inputA, inputB) => {
  let a = Math.abs(inputA);
  let b = Math.abs(inputB);
  const steps = [];

  if (a === 0 && b === 0) return { steps, gcd: 0 };

  while (b !== 0) {
    const q = Math.floor(a / b);
    const remainder = a % b;
    steps.push({ a, b, q, remainder });
    a = b;
    b = remainder;
  }

  return { steps, gcd: a };
};

const EuclideanAlgorithmAlgo = ({ compact = false }) => {
  const [a, setA] = useState(252);
  const [b, setB] = useState(105);
  const [highlightedStep, setHighlightedStep] = useState(0);

  const { steps, gcd } = useMemo(() => getEuclideanSteps(a, b), [a, b]);
  useEffect(() => {
    if (steps.length === 0) {
      setHighlightedStep(0);
      return;
    }
    if (highlightedStep > steps.length - 1) {
      setHighlightedStep(steps.length - 1);
    }
  }, [steps, highlightedStep]);
  const maxValue = useMemo(() => {
    if (steps.length === 0) return 1;
    return Math.max(...steps.flatMap((step) => [step.a, step.b, step.remainder || 0]), 1);
  }, [steps]);

  const chartW = compact ? 780 : 880;
  const rowH = compact ? 62 : 66;
  const headerH = 42;
  const chartH = Math.max(steps.length * rowH + headerH + 20, 120);

  return (
    <Container>
      <CardContainer>
        <Title>Euclidean Algorithm</Title>
        <Para>
          Repeatedly divide: <strong>a = b × q + r</strong>. Replace <strong>(a, b)</strong> with
          <strong> (b, r)</strong> until remainder becomes 0. The final non-zero value is the GCD.
        </Para>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <input
            type="number"
            min="0"
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            className="h-10 w-28 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          />
          <input
            type="number"
            min="0"
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className="h-10 w-28 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          />
          <select
            value={highlightedStep}
            onChange={(e) => setHighlightedStep(Number(e.target.value))}
            disabled={steps.length === 0}
            className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-sky-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {steps.length === 0 ? (
              <option value={0}>No steps</option>
            ) : (
              steps.map((_, idx) => (
                <option key={idx} value={idx}>
                  Step {idx + 1}
                </option>
              ))
            )}
          </select>
        </div>

        <Para>
          {steps.length > 0
            ? `GCD(${Math.abs(a)}, ${Math.abs(b)}) = ${gcd}`
            : "Enter at least one non-zero number."}
        </Para>

        <AlgoVisualizer>
          <svg
            width="100%"
            viewBox={`0 0 ${chartW} ${chartH}`}
            preserveAspectRatio="xMidYMid meet"
            className="mx-auto h-auto w-full max-w-[980px]"
          >
            <text x="16" y="26" fontSize="14" fill="#0f172a" fontWeight="700">
              Step equation view (a, b, remainder)
            </text>

            {steps.map((step, idx) => {
              const y = headerH + idx * rowH;
              const widthA = Math.max((step.a / maxValue) * 220, 22);
              const widthB = Math.max((step.b / maxValue) * 220, 22);
              const widthR = Math.max(((step.remainder || 0) / maxValue) * 220, 22);
              const active = highlightedStep === idx;
              const bg = active ? "rgba(37, 99, 235, 0.08)" : "transparent";

              return (
                <motion.g key={`euclid-${idx}`} animate={{ opacity: active ? 1 : 0.85 }}>
                  <rect x="8" y={y - 22} width="864" height="58" rx="10" fill={bg} />

                  <rect x="16" y={y} width={widthA} height="10" rx="5" fill="#0ea5e9" />
                  <text x="244" y={y + 10} fontSize="13" fill="#0f172a">
                    a={step.a}
                  </text>

                  <rect x="310" y={y} width={widthB} height="10" rx="5" fill="#64748b" />
                  <text x="538" y={y + 10} fontSize="13" fill="#0f172a">
                    b={step.b}
                  </text>

                  <rect x="604" y={y} width={widthR} height="10" rx="5" fill="#16a34a" />
                  <text x="832" y={y + 10} textAnchor="end" fontSize="13" fill="#0f172a">
                    r={step.remainder}
                  </text>

                  <text x="16" y={y + 30} fontSize="13" fill="#334155">
                    Step {idx + 1}: {step.a} = {step.b} × {step.q} + {step.remainder}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function euclideanAlgorithm(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const remainder = a % b;
    a = b;
    b = remainder;
  }
  return a;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default EuclideanAlgorithmAlgo;
