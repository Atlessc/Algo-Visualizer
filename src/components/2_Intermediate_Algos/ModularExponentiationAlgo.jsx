import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../Styled Components/styledComponents";

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

const ModularExponentiationAlgo = () => {
  const [base, setBase] = useState(7);
  const [exp, setExp] = useState(13);
  const [mod, setMod] = useState(11);
  const steps = useMemo(() => buildSteps(base, exp, mod), [base, exp, mod]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const step = steps[stepIndex];

  useEffect(() => {
    setStepIndex(0);
    setIsPlaying(true);
  }, [base, exp, mod]);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 900);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>Modular Exponentiation</Title>
        <Para>Fast power computes base^exp mod m in O(log exp) using binary exponentiation.</Para>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <input type="number" value={base} onChange={(e) => setBase(Number(e.target.value))} style={{ width: "110px" }} />
          <input type="number" value={exp} onChange={(e) => setExp(Math.max(0, Number(e.target.value)))} style={{ width: "110px" }} />
          <input type="number" value={mod} onChange={(e) => setMod(Math.max(2, Number(e.target.value)))} style={{ width: "110px" }} />
          <button type="button" onClick={() => setIsPlaying((p) => !p)}>{isPlaying ? "Pause" : "Play"}</button>
          <button type="button" onClick={() => { setStepIndex(0); setIsPlaying(true); }}>Reset</button>
        </div>
        <Para>{step.message}</Para>

        <AlgoVisualizer>
          <div style={{ width: "100%", display: "grid", gap: "10px", maxWidth: "760px", margin: "0 auto" }}>
            <div style={{ background: "#e2e8f0", borderRadius: "12px", padding: "12px", display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: "10px", textAlign: "center" }}>
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
