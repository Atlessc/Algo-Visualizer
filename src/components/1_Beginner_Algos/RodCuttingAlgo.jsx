import React, { useMemo, useState } from "react";
import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock,
  Para,
} from "../Styled Components/styledComponents";

const PRICES = [1, 5, 8, 9, 10, 17, 17, 20];

const solveRodCutting = (rodLength) => {
  const dp = Array(rodLength + 1).fill(0);
  const firstCut = Array(rodLength + 1).fill(0);

  for (let len = 1; len <= rodLength; len++) {
    let best = -Infinity;
    let bestCut = 0;
    for (let cut = 1; cut <= len; cut++) {
      const candidate = PRICES[cut - 1] + dp[len - cut];
      if (candidate > best) {
        best = candidate;
        bestCut = cut;
      }
    }
    dp[len] = best;
    firstCut[len] = bestCut;
  }

  const cuts = [];
  let remaining = rodLength;
  while (remaining > 0) {
    cuts.push(firstCut[remaining]);
    remaining -= firstCut[remaining];
  }

  return { dp, firstCut, cuts };
};

const RodCuttingAlgo = () => {
  const [rodLength, setRodLength] = useState(8);
  const { dp, cuts } = useMemo(() => solveRodCutting(rodLength), [rodLength]);
  const bestValue = dp[rodLength];
  const maxDp = Math.max(...dp, 1);

  const barW = 54;
  const gap = 10;
  const chartW = (rodLength + 1) * (barW + gap) + gap;
  const chartH = 290;
  const floorY = 220;

  return (
    <Container>
      <CardContainer>
        <Title>Rod Cutting Problem</Title>
        <Para>
          Choose cuts to maximize total price. Dynamic programming computes the best revenue for
          each rod length from 1..n.
        </Para>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
          <label htmlFor="rod-length" style={{ fontWeight: 600, color: "#334155" }}>
            Rod length:
          </label>
          <input
            id="rod-length"
            type="range"
            min="1"
            max="8"
            value={rodLength}
            onChange={(e) => setRodLength(Number(e.target.value))}
          />
          <strong>{rodLength}</strong>
        </div>

        <Para>
          Best revenue: <strong>{bestValue}</strong> | Optimal cuts:{" "}
          <strong>{cuts.join(" + ")}</strong>
        </Para>

        <AlgoVisualizer>
          <svg
            width="100%"
            viewBox={`0 0 ${chartW} ${chartH}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ maxWidth: "940px", height: "auto" }}
          >
            {dp.map((value, len) => {
              const x = gap + len * (barW + gap);
              const h = 26 + (value / maxDp) * 144;
              const y = floorY - h;
              const fill = len === rodLength ? "#0ea5e9" : "#64748b";

              return (
                <g key={`dp-${len}`}>
                  <rect x={x} y={y} width={barW} height={h} rx="10" fill={fill} />
                  <text x={x + barW / 2} y={y - 8} textAnchor="middle" fill="#0f172a" fontSize="13">
                    {value}
                  </text>
                  <text x={x + barW / 2} y={floorY + 16} textAnchor="middle" fill="#334155" fontSize="11">
                    L{len}
                  </text>
                </g>
              );
            })}
            <text x="12" y="20" fill="#0f172a" fontSize="13" fontWeight="700">
              DP revenue by length
            </text>
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function rodCutting(prices, n) {
  const dp = Array(n + 1).fill(0);
  for (let len = 1; len <= n; len++) {
    let best = -Infinity;
    for (let cut = 1; cut <= len; cut++) {
      best = Math.max(best, prices[cut - 1] + dp[len - cut]);
    }
    dp[len] = best;
  }
  return dp[n];
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default RodCuttingAlgo;
