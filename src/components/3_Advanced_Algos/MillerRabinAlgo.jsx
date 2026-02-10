import React, { useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../Styled Components/styledComponents";

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

const MillerRabinAlgo = () => {
  const [n, setN] = useState(561);
  const [a, setA] = useState(2);
  const result = useMemo(() => millerRabinDetail(n, a), [n, a]);

  return (
    <Container>
      <CardContainer>
        <Title>Miller-Rabin Primality Test</Title>
        <Para>Probabilistic primality test using repeated squaring and witness bases.</Para>

        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <input type="number" min="3" value={n} onChange={(e) => setN(Math.max(3, Number(e.target.value) | 1))} style={{ width: "130px" }} />
          <input type="number" min="2" value={a} onChange={(e) => setA(Math.max(2, Number(e.target.value)))} style={{ width: "130px" }} />
        </div>

        <Para>
          Verdict for n={n} with base {a}:{" "}
          <strong>{result.composite ? "Composite (witness)" : "Probably prime for this base"}</strong>
        </Para>

        <AlgoVisualizer>
          <div style={{ width: "100%", maxWidth: "760px", margin: "0 auto", background: "#eef2ff", borderRadius: "12px", padding: "10px" }}>
            {"d" in result && <div style={{ fontFamily: "monospace" }}>n-1 = 2^{result.s} * {result.d}</div>}
            <div style={{ marginTop: "6px", fontFamily: "monospace" }}>
              x sequence: {result.trail ? result.trail.join(" → ") : "(none)"}
            </div>
            {result.reason && <div style={{ marginTop: "6px" }}>{result.reason}</div>}
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
