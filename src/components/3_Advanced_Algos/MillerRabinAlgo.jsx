import React, { useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { cn } from "../../lib/utils";

const modPow = (a, d, n) => {
  let res = 1n;
  let base = BigInt(a) % BigInt(n);
  let exp = BigInt(d);
  const mod = BigInt(n);
  while (exp > 0n) {
    if (exp & 1n) res = (res * base) % mod;
    base = (base * base) % mod;
    exp >>= 1n;
  }
  return res;
};

const millerRabinDetail = (n, base) => {
  if (n % 2 === 0) return { composite: true, reason: "Even number." };
  let d = n - 1;
  let s = 0;
  while (d % 2 === 0) {
    d /= 2;
    s++;
  }
  let x = modPow(base, d, n);
  const trail = [x.toString()];
  if (x === 1n || x === BigInt(n - 1)) return { composite: false, s, d, trail };
  for (let r = 1; r < s; r++) {
    x = (x * x) % BigInt(n);
    trail.push(x.toString());
    if (x === BigInt(n - 1)) return { composite: false, s, d, trail };
  }
  return { composite: true, s, d, trail, reason: "Witness found." };
};

const MillerRabinAlgo = ({ compact = false }) => {
  const [n, setN] = useState(561);
  const [a, setA] = useState(2);
  const result = useMemo(() => millerRabinDetail(n, a), [n, a]);

  return (
    <Container>
      <CardContainer>
        <Title>Miller-Rabin Primality Test</Title>
        <Para>Probabilistic primality test using repeated squaring and witness bases.</Para>

        <div className="mb-1 flex flex-wrap items-center justify-center gap-2.5">
          <input
            type="number"
            min="3"
            value={n}
            onChange={(e) => setN(Math.max(3, Number(e.target.value) | 1))}
            className={cn(
              "h-9 rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none ring-sky-300 transition focus:ring-2",
              compact ? "w-full min-w-0 text-sm" : "w-[130px] text-sm"
            )}
            aria-label="Number n"
          />
          <input
            type="number"
            min="2"
            value={a}
            onChange={(e) => setA(Math.max(2, Number(e.target.value)))}
            className={cn(
              "h-9 rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none ring-sky-300 transition focus:ring-2",
              compact ? "w-full min-w-0 text-sm" : "w-[130px] text-sm"
            )}
            aria-label="Witness base a"
          />
        </div>

        <Para>
          Verdict for n={n} with base {a}:{" "}
          <strong>{result.composite ? "Composite (witness)" : "Probably prime for this base"}</strong>
        </Para>

        <AlgoVisualizer>
          <div className={cn("mx-auto w-full max-w-[760px] rounded-xl bg-indigo-100 p-2.5", compact ? "text-xs" : "text-sm")}>
            {"d" in result && <div className="font-mono">n-1 = 2^{result.s} * {result.d}</div>}
            <div className="mt-1.5 font-mono">
              x sequence: {result.trail ? result.trail.join(" → ") : "(none)"}
            </div>
            {result.reason && <div className="mt-1.5">{result.reason}</div>}
          </div>
        </AlgoVisualizer>

        <CodeBlock>
          {`function isProbablePrime(n, a) {
  let d = n - 1, s = 0;
  while (d % 2 === 0) { d /= 2; s++; }
  let x = modPow(a, d, n);
  if (x === 1 || x === n - 1) return true;
  for (let r = 1; r < s; r++) {
    x = (x * x) % n;
    if (x === n - 1) return true;
  }
  return false; // composite witness
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default MillerRabinAlgo;
