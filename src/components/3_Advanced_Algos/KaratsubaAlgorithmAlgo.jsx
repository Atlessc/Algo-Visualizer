import React, { useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { cn } from "../../lib/utils";

const splitNum = (n, m) => {
  const pow = 10 ** m;
  return [Math.floor(n / pow), n % pow];
};

const buildKaratsubaStep = (x, y) => {
  const n = Math.max(String(x).length, String(y).length);
  const m = Math.floor(n / 2);
  const [a, b] = splitNum(x, m);
  const [c, d] = splitNum(y, m);
  const z2 = a * c;
  const z0 = b * d;
  const z1 = (a + b) * (c + d) - z2 - z0;
  const result = z2 * 10 ** (2 * m) + z1 * 10 ** m + z0;
  return { a, b, c, d, z2, z1, z0, m, result };
};

const KaratsubaAlgorithmAlgo = ({ compact = false }) => {
  const [x, setX] = useState(1234);
  const [y, setY] = useState(5678);
  const k = useMemo(() => buildKaratsubaStep(x, y), [x, y]);

  return (
    <Container>
      <CardContainer>
        <Title>Karatsuba Multiplication</Title>
        <Para>
          Karatsuba multiplies large numbers faster than grade-school multiplication by reducing the
          number of multiplications from 4 to 3 per split. Its divide-and-conquer recurrence gives
          roughly O(n^1.585) time.
        </Para>
        <div className="mb-1 flex flex-wrap items-center justify-center gap-2.5">
          <input
            type="number"
            value={x}
            onChange={(e) => setX(Math.max(0, Number(e.target.value)))}
            className={cn(
              "h-9 rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none ring-sky-300 transition focus:ring-2",
              compact ? "w-full min-w-0 text-sm" : "w-[140px] text-sm"
            )}
            aria-label="First number"
          />
          <input
            type="number"
            value={y}
            onChange={(e) => setY(Math.max(0, Number(e.target.value)))}
            className={cn(
              "h-9 rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none ring-sky-300 transition focus:ring-2",
              compact ? "w-full min-w-0 text-sm" : "w-[140px] text-sm"
            )}
            aria-label="Second number"
          />
        </div>
        <Para>Using split m={k.m}: x={x}=({k.a},{k.b}), y={y}=({k.c},{k.d})</Para>

        <AlgoVisualizer>
          <div className={cn("mx-auto w-full max-w-[760px] rounded-xl bg-indigo-100 p-3 font-mono", compact ? "text-xs" : "text-sm")}>
            <div>z2 = a*c = {k.z2}</div>
            <div>z0 = b*d = {k.z0}</div>
            <div>z1 = (a+b)(c+d)-z2-z0 = {k.z1}</div>
            <div className="mt-2 font-bold">
              result = z2*10^(2m) + z1*10^m + z0 = {k.result}
            </div>
          </div>
        </AlgoVisualizer>

        <CodeBlock>
          {`function karatsuba(x, y) {
  if (x < 10 || y < 10) return x * y;
  const n = Math.max(String(x).length, String(y).length);
  const m = Math.floor(n / 2);
  const pow = 10 ** m;
  const a = Math.floor(x / pow), b = x % pow;
  const c = Math.floor(y / pow), d = y % pow;

  const z2 = karatsuba(a, c);
  const z0 = karatsuba(b, d);
  const z1 = karatsuba(a + b, c + d) - z2 - z0;
  return z2 * 10 ** (2 * m) + z1 * pow + z0;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default KaratsubaAlgorithmAlgo;
