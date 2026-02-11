import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

const buildSteps = (base, exp, mod) => {
  let b = ((base % mod) + mod) % mod;
  let e = exp;
  let result = 1;
  const steps = [{ b, e, result, bit: e & 1, message: "Initialize result=1." }];

  while (e > 0) {
    if (e & 1) {
      result = (result * b) % mod;
      steps.push({ b, e, result, bit: 1, message: "Bit is 1: multiply result by base." });
    } else {
      steps.push({ b, e, result, bit: 0, message: "Bit is 0: skip multiply." });
    }
    b = (b * b) % mod;
    e = Math.floor(e / 2);
    steps.push({ b, e, result, bit: e & 1, message: "Square base and shift exponent right." });
  }

  steps.push({ b, e, result, bit: 0, message: `Done. Answer = ${result}.` });
  return steps;
};

const ModularExponentiationAlgo = ({ autoPlay = true, compact = false }) => {
  const [base, setBase] = useState(7);
  const [exp, setExp] = useState(13);
  const [mod, setMod] = useState(11);
  const steps = useMemo(() => buildSteps(base, exp, mod), [base, exp, mod]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const step = steps[stepIndex];

  useEffect(() => {
    setStepIndex(0);
    setIsPlaying(autoPlay);
  }, [base, exp, mod, autoPlay]);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 900);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  return (
    <Container>
      <CardContainer>
        <Title>Modular Exponentiation</Title>
        <Para>Fast power computes base^exp mod m in O(log exp) using binary exponentiation.</Para>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <input
            type="number"
            value={base}
            onChange={(e) => setBase(Number(e.target.value))}
            className="h-10 w-24 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          />
          <input
            type="number"
            value={exp}
            onChange={(e) => setExp(Math.max(0, Number(e.target.value)))}
            className="h-10 w-24 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          />
          <input
            type="number"
            value={mod}
            onChange={(e) => setMod(Math.max(2, Number(e.target.value)))}
            className="h-10 w-24 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          />
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
        <Para>{step.message}</Para>

        <AlgoVisualizer>
          <div className={cn("mx-auto grid w-full max-w-[760px]", compact ? "gap-2" : "gap-2.5")}>
            <div
              className={cn(
                "grid rounded-xl bg-slate-200 text-center",
                compact ? "gap-2 p-2" : "gap-2.5 p-3"
              )}
              style={{ gridTemplateColumns: "repeat(4, minmax(0,1fr))" }}
            >
              <div><strong>base</strong><div>{step.b}</div></div>
              <div><strong>exp</strong><div>{step.e}</div></div>
              <div><strong>bit</strong><div>{step.bit}</div></div>
              <div><strong>result</strong><div>{step.result}</div></div>
            </div>
            <Para>Expression: {base}<sup>{exp}</sup> mod {mod} = <strong>{steps[steps.length - 1].result}</strong></Para>
          </div>
        </AlgoVisualizer>

        <CodeBlock>
          {`function modPow(base, exp, mod) {
  let result = 1;
  base %= mod;
  while (exp > 0) {
    if (exp & 1) result = (result * base) % mod;
    base = (base * base) % mod;
    exp >>= 1;
  }
  return result;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default ModularExponentiationAlgo;
