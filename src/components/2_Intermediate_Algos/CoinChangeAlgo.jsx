import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock,
  Para,
} from "../ui/algo-primitives";

const COINS = [1, 3, 4];
const INF = Number.POSITIVE_INFINITY;

const buildSteps = (target) => {
  const dp = Array(target + 1).fill(INF);
  dp[0] = 0;
  const steps = [
    {
      amount: 0,
      coin: null,
      updated: false,
      dp: [...dp],
      message: "Initialize dp[0]=0 and others=∞.",
    },
  ];

  for (let amount = 1; amount <= target; amount++) {
    for (const coin of COINS) {
      if (coin <= amount && dp[amount - coin] !== INF) {
        const candidate = dp[amount - coin] + 1;
        const updated = candidate < dp[amount];
        if (updated) dp[amount] = candidate;
        steps.push({
          amount,
          coin,
          updated,
          dp: [...dp],
          message: updated
            ? `dp[${amount}] updated using coin ${coin}.`
            : `Try coin ${coin} for amount ${amount}; no improvement.`,
        });
      }
    }
  }

  steps.push({
    amount: target,
    coin: null,
    updated: false,
    dp: [...dp],
    message: `Done. Minimum coins for ${target} = ${Number.isFinite(dp[target]) ? dp[target] : "not possible"}.`,
  });
  return steps;
};

const CoinChangeAlgo = () => {
  const [target, setTarget] = useState(10);
  const steps = useMemo(() => buildSteps(target), [target]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const step = steps[stepIndex];

  useEffect(() => {
    setStepIndex(0);
    setIsPlaying(true);
  }, [target]);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => {
      setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    }, 600);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  const maxDp = Math.max(...step.dp.filter(Number.isFinite), 1);
  const barW = 48;
  const gap = 8;
  const chartW = step.dp.length * (barW + gap) + gap;
  const chartH = 270;
  const floorY = 210;

  return (
    <Container>
      <CardContainer>
        <Title>Coin Change Problem</Title>
        <Para>
          Dynamic programming computes minimum coins for each amount from 0..target.
        </Para>
        <Para>{step.message}</Para>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
          <label htmlFor="coin-target" style={{ fontWeight: 600, color: "#334155" }}>
            Target:
          </label>
          <input
            id="coin-target"
            type="range"
            min="6"
            max="18"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
          />
          <strong>{target}</strong>
          <button type="button" onClick={() => setIsPlaying((prev) => !prev)}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            onClick={() => {
              setStepIndex(0);
              setIsPlaying(true);
            }}
          >
            Reset
          </button>
        </div>

        <AlgoVisualizer>
          <svg
            width="100%"
            viewBox={`0 0 ${chartW} ${chartH}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ maxWidth: "980px", height: "auto" }}
          >
            {step.dp.map((value, amount) => {
              const x = gap + amount * (barW + gap);
              const isInf = !Number.isFinite(value);
              const scaled = isInf ? 0 : value / maxDp;
              const h = isInf ? 12 : 32 + scaled * 130;
              const y = floorY - h;
              let fill = "#64748b";
              if (amount === step.amount) fill = step.updated ? "#16a34a" : "#f59e0b";
              if (isInf) fill = "#cbd5e1";

              return (
                <g key={`amount-${amount}`}>
                  <rect x={x} y={y} width={barW} height={h} rx="8" fill={fill} />
                  <text x={x + barW / 2} y={y - 8} textAnchor="middle" fontSize="12" fill="#0f172a">
                    {isInf ? "∞" : value}
                  </text>
                  <text x={x + barW / 2} y={floorY + 14} textAnchor="middle" fontSize="11" fill="#334155">
                    {amount}
                  </text>
                </g>
              );
            })}
          </svg>
        </AlgoVisualizer>

        <CodeBlock>
          {`function coinChange(coins, target) {
  const dp = Array(target + 1).fill(Infinity);
  dp[0] = 0;
  for (let amount = 1; amount <= target; amount++) {
    for (const coin of coins) {
      if (coin <= amount) {
        dp[amount] = Math.min(dp[amount], dp[amount - coin] + 1);
      }
    }
  }
  return dp[target];
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default CoinChangeAlgo;
