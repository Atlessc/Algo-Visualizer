import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../Styled Components/styledComponents";

const buildSteps = (n) => {
  const prime = Array(n + 1).fill(true);
  prime[0] = false;
  prime[1] = false;
  const steps = [{ current: null, marked: [], prime: [...prime], msg: "Initialize all as prime." }];
  for (let p = 2; p * p <= n; p++) {
    if (!prime[p]) continue;
    const marked = [];
    for (let x = p * p; x <= n; x += p) {
      if (prime[x]) {
        prime[x] = false;
        marked.push(x);
      }
    }
    steps.push({ current: p, marked, prime: [...prime], msg: `Mark multiples of ${p}.` });
  }
  steps.push({ current: null, marked: [], prime: [...prime], msg: "Sieve complete." });
  return steps;
};

const SieveOfEratosthenesAlgo = () => {
  const [n, setN] = useState(50);
  const steps = useMemo(() => buildSteps(n), [n]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const step = steps[stepIndex];

  useEffect(() => {
    setStepIndex(0);
    setIsPlaying(true);
  }, [n]);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 700);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  const primes = step.prime.map((ok, i) => (ok ? i : null)).filter((x) => x !== null);

  return (
    <Container>
      <CardContainer>
        <Title>Sieve of Eratosthenes</Title>
        <Para>Find all primes up to n by crossing out multiples of each prime.</Para>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <input type="range" min="20" max="1000" value={n} onChange={(e) => setN(Number(e.target.value))} />
          <strong>n={n}</strong>
          <button type="button" onClick={() => setIsPlaying((p) => !p)}>{isPlaying ? "Pause" : "Play"}</button>
          <button type="button" onClick={() => { setStepIndex(0); setIsPlaying(true); }}>Reset</button>
        </div>
        <Para>{step.msg}</Para>

        <AlgoVisualizer>
          <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(34px, 1fr))", gap: "6px" }}>
            {Array.from({ length: n + 1 }, (_, i) => {
              const isMarked = step.marked.includes(i);
              let bg = "#e2e8f0";
              if (step.prime[i]) bg = "#16a34a";
              if (isMarked) bg = "#ef4444";
              if (i < 2) bg = "#94a3b8";
              return (
                <div key={i} style={{ borderRadius: "6px", padding: "6px 0", textAlign: "center", color: "#fff", background: bg, fontSize: "12px", fontWeight: 700 }}>
                  {i}
                </div>
              );
            })}
          </div>
          <Para>Primes: {primes.join(", ")}</Para>
        </AlgoVisualizer>

        <CodeBlock>
          {`function sieve(n) {
  const prime = Array(n + 1).fill(true);
  prime[0] = prime[1] = false;
  for (let p = 2; p * p <= n; p++) {
    if (!prime[p]) continue;
    for (let x = p * p; x <= n; x += p) prime[x] = false;
  }
  return prime.map((ok, i) => (ok ? i : -1)).filter((x) => x !== -1);
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default SieveOfEratosthenesAlgo;
