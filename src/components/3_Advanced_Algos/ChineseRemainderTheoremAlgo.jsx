import React, { useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { cn } from "../../lib/utils";

const egcd = (a, b) => {
  if (b === 0) return [a, 1, 0];
  const [g, x1, y1] = egcd(b, a % b);
  return [g, y1, x1 - Math.floor(a / b) * y1];
};

const modInv = (a, m) => {
  const [g, x] = egcd(a, m);
  if (g !== 1) return null;
  return ((x % m) + m) % m;
};

const solveCRT = (residues, moduli) => {
  const M = moduli.reduce((p, x) => p * x, 1);
  let x = 0;
  const details = [];
  for (let i = 0; i < moduli.length; i++) {
    const mi = moduli[i];
    const ai = residues[i];
    const Mi = M / mi;
    const inv = modInv(Mi, mi);
    if (inv === null) return { ok: false, message: "Moduli are not pairwise coprime.", details: [] };
    const term = ai * Mi * inv;
    x += term;
    details.push({ ai, mi, Mi, inv, term });
  }
  x = ((x % M) + M) % M;
  return { ok: true, x, M, details };
};

const ChineseRemainderTheoremAlgo = ({ compact = false }) => {
  const [residues, setResidues] = useState([2, 3, 2]);
  const [moduli, setModuli] = useState([3, 5, 7]);
  const result = useMemo(() => solveCRT(residues, moduli), [residues, moduli]);

  const update = (setter, idx, val) => {
    setter((arr) => arr.map((x, i) => (i === idx ? Number(val) : x)));
  };

  return (
    <Container>
      <CardContainer>
        <Title>Chinese Remainder Theorem</Title>
        <Para>
          The Chinese Remainder Theorem combines several remainder rules into one answer. If the
          moduli are pairwise coprime, there is one unique solution modulo the product of all
          moduli.
        </Para>

        <div className="mx-auto grid w-full max-w-[560px] gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-wrap items-center justify-center gap-2.5">
              <span>x ≡</span>
              <input
                type="number"
                value={residues[i]}
                onChange={(e) => update(setResidues, i, e.target.value)}
                className={cn(
                  "h-9 rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none ring-sky-300 transition focus:ring-2",
                  compact ? "w-[72px] text-xs" : "w-[90px] text-sm"
                )}
              />
              <span>(mod</span>
              <input
                type="number"
                min="2"
                value={moduli[i]}
                onChange={(e) => update(setModuli, i, e.target.value)}
                className={cn(
                  "h-9 rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none ring-sky-300 transition focus:ring-2",
                  compact ? "w-[72px] text-xs" : "w-[90px] text-sm"
                )}
              />
              <span>)</span>
            </div>
          ))}
        </div>

        <Para>
          {result.ok ? (
            <>Solution: <strong>x ≡ {result.x} (mod {result.M})</strong></>
          ) : (
            <strong>{result.message}</strong>
          )}
        </Para>

        <AlgoVisualizer>
          {result.ok && (
            <div className="mx-auto w-full max-w-[760px] rounded-xl bg-indigo-100 p-2.5">
              {result.details.map((d, i) => (
                <div key={i} className={cn("mt-1.5 font-mono", compact ? "text-xs" : "text-[13px]")}>
                  term{i + 1}: a={d.ai}, m={d.mi}, Mᵢ={d.Mi}, inv={d.inv}, contribution={d.term}
                </div>
              ))}
            </div>
          )}
        </AlgoVisualizer>

        <CodeBlock>
          {`function chineseRemainder(a, m) {
  const M = m.reduce((p, x) => p * x, 1);
  let x = 0;
  for (let i = 0; i < m.length; i++) {
    const Mi = M / m[i];
    const inv = modInverse(Mi, m[i]); // Mi * inv ≡ 1 (mod m[i])
    x += a[i] * Mi * inv;
  }
  return ((x % M) + M) % M;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default ChineseRemainderTheoremAlgo;
