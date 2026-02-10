import React, { useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../Styled Components/styledComponents";

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

const FermatsTheoremAlgo = () => {
  const [a, setA] = useState(2);
  const [p, setP] = useState(13);
  const value = useMemo(() => modPow(a, p - 1, p), [a, p]);

  return (
    <Container>
      <CardContainer>
        <Title>Fermat&apos;s Little Theorem</Title>
        <Para>If p is prime and gcd(a,p)=1, then a^(p-1) ≡ 1 (mod p).</Para>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <input type="number" min="2" value={a} onChange={(e) => setA(Math.max(2, Number(e.target.value)))} style={{ width: "120px" }} />
          <input type="number" min="3" value={p} onChange={(e) => setP(Math.max(3, Number(e.target.value)))} style={{ width: "120px" }} />
        </div>

        <Para>
          a={a}, p={p} {"->"} a^(p-1) mod p = <strong>{value}</strong>
        </Para>

        <AlgoVisualizer>
          <div style={{ width: "100%", maxWidth: "700px", margin: "0 auto", background: "#eef2ff", borderRadius: "12px", padding: "12px" }}>
            <div style={{ fontFamily: "monospace" }}>{a}^{p - 1} mod {p} = {value}</div>
            <div style={{ marginTop: "6px" }}>
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
