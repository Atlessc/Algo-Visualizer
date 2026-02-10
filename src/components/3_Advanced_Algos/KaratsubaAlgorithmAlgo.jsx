import React, { useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../Styled Components/styledComponents";

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

const KaratsubaAlgorithmAlgo = () => {
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
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <input type="number" value={x} onChange={(e) => setX(Math.max(0, Number(e.target.value)))} style={{ width: "140px" }} />
          <input type="number" value={y} onChange={(e) => setY(Math.max(0, Number(e.target.value)))} style={{ width: "140px" }} />
        </div>
        <Para>Using split m={k.m}: x={x}=({k.a},{k.b}), y={y}=({k.c},{k.d})</Para>

        <AlgoVisualizer>
          <div style={{ width: "100%", maxWidth: "760px", margin: "0 auto", background: "#eef2ff", borderRadius: "12px", padding: "12px", fontFamily: "monospace" }}>
            <div>z2 = a*c = {k.z2}</div>
            <div>z0 = b*d = {k.z0}</div>
            <div>z1 = (a+b)(c+d)-z2-z0 = {k.z1}</div>
            <div style={{ marginTop: "8px", fontWeight: 700 }}>
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
