import React, { useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { cn } from "../../lib/utils";

const modPow = (a, e, m) => {
  let res = 1n;
  let base = BigInt(a) % BigInt(m);
  let exp = BigInt(e);
  const mod = BigInt(m);
  while (exp > 0n) {
    if (exp & 1n) res = (res * base) % mod;
    base = (base * base) % mod;
    exp >>= 1n;
  }
  return Number(res);
};

const FermatsTheoremAlgo = ({ compact = false }) => {
  const [a, setA] = useState(2);
  const [p, setP] = useState(13);
  const value = useMemo(() => modPow(a, p - 1, p), [a, p]);

  return (
    <Container>
      <CardContainer>
        <Title>Fermat&apos;s Little Theorem</Title>
        <Para>If p is prime and gcd(a,p)=1, then a^(p-1) ≡ 1 (mod p).</Para>
        <div className="mb-1 flex flex-wrap items-center justify-center gap-2.5">
          <input
            type="number"
            min="2"
            value={a}
            onChange={(e) => setA(Math.max(2, Number(e.target.value)))}
            className={cn(
              "h-9 rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none ring-sky-300 transition focus:ring-2",
              compact ? "w-full min-w-0 text-sm" : "w-[120px] text-sm"
            )}
            aria-label="Base a"
          />
          <input
            type="number"
            min="3"
            value={p}
            onChange={(e) => setP(Math.max(3, Number(e.target.value)))}
            className={cn(
              "h-9 rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none ring-sky-300 transition focus:ring-2",
              compact ? "w-full min-w-0 text-sm" : "w-[120px] text-sm"
            )}
            aria-label="Prime candidate p"
          />
        </div>

        <Para>
          a={a}, p={p} {"->"} a^(p-1) mod p = <strong>{value}</strong>
        </Para>

        <AlgoVisualizer>
          <div className={cn("mx-auto w-full max-w-[700px] rounded-xl bg-indigo-100 p-3", compact ? "text-xs" : "text-sm")}>
            <div className="font-mono">{a}^{p - 1} mod {p} = {value}</div>
            <div className="mt-1.5">
              {value === 1 ? "Passes Fermat check (prime or Carmichael)." : "Fails Fermat check (composite)."}
            </div>
          </div>
        </AlgoVisualizer>

        <CodeBlock>
          {`function fermatCheck(a, p) {
  // if p is prime and gcd(a, p) = 1, result must be 1
  return modPow(a, p - 1, p) === 1;
}

function modPow(a, e, m) {
  let r = 1, b = a % m;
  while (e > 0) {
    if (e & 1) r = (r * b) % m;
    b = (b * b) % m;
    e >>= 1;
  }
  return r;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default FermatsTheoremAlgo;
