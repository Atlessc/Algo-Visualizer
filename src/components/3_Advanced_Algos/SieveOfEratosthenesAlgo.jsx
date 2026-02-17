import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

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

const SieveOfEratosthenesAlgo = ({ autoPlay = true, compact = false }) => {
  const [n, setN] = useState(50);
  const steps = useMemo(() => buildSteps(n), [n]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const step = steps[stepIndex];

  useEffect(() => {
    setStepIndex(0);
    setIsPlaying(autoPlay);
  }, [n, autoPlay]);

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

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
        <Para>
          Instead of testing each number separately for primality, the Sieve marks multiples of each
          prime and removes them in bulk. What remains unmarked are all primes up to n, making this
          much faster for generating many primes.
        </Para>
        <div className="mb-1 flex flex-wrap items-center justify-center gap-2.5">
          <input
            type="range"
            min="20"
            max="1000"
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className={cn("w-full", compact ? "max-w-65" : "max-w-85")}
          />
          <strong className={cn(compact ? "text-sm" : "text-base")}>n={n}</strong>
          <Button
            type="button"
            size={compact ? "sm" : "default"}
            onClick={() => setIsPlaying((p) => !p)}
          >
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button
            type="button"
            size={compact ? "sm" : "default"}
            variant="secondary"
            onClick={() => { setStepIndex(0); setIsPlaying(true); }}
          >
            Reset
          </Button>
        </div>
        <Para>{step.msg}</Para>

        <AlgoVisualizer>
          <div className={cn("mx-auto grid w-full max-w-175 gap-1.5", compact ? "grid-cols-[repeat(auto-fit,minmax(26px,1fr))]" : "grid-cols-[repeat(auto-fit,minmax(34px,1fr))]")}>
            {Array.from({ length: n + 1 }, (_, i) => {
              const isMarked = step.marked.includes(i);
              let bg = "#e2e8f0";
              if (step.prime[i]) bg = "#16a34a";
              if (isMarked) bg = "#ef4444";
              if (i < 2) bg = "#94a3b8";
              return (
                <div
                  key={i}
                  className={cn(
                    "rounded-md py-1 text-center font-bold text-white",
                    compact ? "text-[10px]" : "text-xs"
                  )}
                  style={{ background: bg }}
                >
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
