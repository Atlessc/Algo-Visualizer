import React, { useMemo, useState } from "react";
import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock,
  Para,
} from "../ui/algo-primitives";

const gcd = (a, b) => {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const r = x % y;
    x = y;
    y = r;
  }
  return x;
};

const GcdLcmAlgo = ({ compact = false }) => {
  const [a, setA] = useState(24);
  const [b, setB] = useState(36);

  const { gcdValue, lcmValue, scaleMax } = useMemo(() => {
    const g = gcd(a, b);
    const safeLcm = g === 0 ? 0 : (Math.abs(a * b) / g);
    const max = Math.max(Math.abs(a), Math.abs(b), safeLcm, 1);
    return { gcdValue: g, lcmValue: safeLcm, scaleMax: max };
  }, [a, b]);

  const toWidth = (value) => Math.max((Math.abs(value) / scaleMax) * (compact ? 420 : 480), 20);

  return (
    <Container>
      <CardContainer>
        <Title>GCD and LCM</Title>
        <Para>
          GCD is the largest number that divides both inputs, while LCM is the smallest positive
          number both inputs divide into. They are connected by{" "}
          <strong>gcd(a,b) × lcm(a,b) = |a × b|</strong>.
        </Para>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <input
            type="number"
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            className="h-10 w-28 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          />
          <input
            type="number"
            value={b}
            onChange={(e) => setB(Number(e.target.value))}
            className="h-10 w-28 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          />
        </div>

        <Para>
          GCD({a}, {b}) = <strong>{gcdValue}</strong> | LCM({a}, {b}) = <strong>{lcmValue}</strong>
        </Para>

        <AlgoVisualizer>
          <svg
            width="100%"
            viewBox="0 0 560 240"
            preserveAspectRatio="xMidYMid meet"
            className="mx-auto h-auto w-full max-w-195"
          >
            <text x="24" y="30" fontSize="14" fill="#0f172a" fontWeight="700">
              Relative magnitudes
            </text>

            <rect x="24" y="56" width={toWidth(a)} height="24" rx="8" fill="#0ea5e9" />
            <text x="30" y="73" fill="#fff" fontSize="13" fontWeight="700">
              a = {a}
            </text>

            <rect x="24" y="96" width={toWidth(b)} height="24" rx="8" fill="#64748b" />
            <text x="30" y="113" fill="#fff" fontSize="13" fontWeight="700">
              b = {b}
            </text>

            <rect x="24" y="146" width={toWidth(gcdValue)} height="24" rx="8" fill="#16a34a" />
            <text x="30" y="163" fill="#fff" fontSize="13" fontWeight="700">
              gcd = {gcdValue}
            </text>

            <rect x="24" y="186" width={toWidth(lcmValue)} height="24" rx="8" fill="#f97316" />
            <text x="30" y="203" fill="#fff" fontSize="13" fontWeight="700">
              lcm = {lcmValue}
            </text>
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function lcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default GcdLcmAlgo;
