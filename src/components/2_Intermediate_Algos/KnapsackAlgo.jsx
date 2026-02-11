import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock,
  Para
} from "../Styled Components/styledComponents";

const items = [
  { name: "A", weight: 2, value: 3 },
  { name: "B", weight: 3, value: 4 },
  { name: "C", weight: 4, value: 5 },
  { name: "D", weight: 5, value: 8 }
];

const capacity = 8;

const hexToRgb = (hex) => {
  const cleanHex = hex.replace("#", "");
  const expandedHex =
    cleanHex.length === 3
      ? cleanHex
          .split("")
          .map((char) => char + char)
          .join("")
      : cleanHex;
  const intValue = Number.parseInt(expandedHex, 16);
  return {
    r: (intValue >> 16) & 255,
    g: (intValue >> 8) & 255,
    b: intValue & 255
  };
};

const getTextColorForBackground = (hexColor) => {
  const { r, g, b } = hexToRgb(hexColor);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? "#1f2937" : "#ffffff";
};

const cloneDp = (dp) => dp.map((row) => [...row]);

const generateKnapsackSteps = (inputItems, maxCapacity) => {
  const n = inputItems.length;
  const dp = Array.from({ length: n + 1 }, () => Array(maxCapacity + 1).fill(0));
  const steps = [
    {
      phase: "fill",
      i: 0,
      w: 0,
      dp: cloneDp(dp),
      selectedIndices: [],
      message: "Initialize DP table with 0s."
    }
  ];

  for (let i = 1; i <= n; i += 1) {
    const item = inputItems[i - 1];
    for (let w = 0; w <= maxCapacity; w += 1) {
      if (item.weight > w) {
        dp[i][w] = dp[i - 1][w];
        steps.push({
          phase: "fill",
          i,
          w,
          dp: cloneDp(dp),
          selectedIndices: [],
          message: `Item ${item.name} (w=${item.weight}) does not fit capacity ${w}; carry over ${dp[i][w]}.`
        });
      } else {
        const exclude = dp[i - 1][w];
        const include = item.value + dp[i - 1][w - item.weight];
        dp[i][w] = Math.max(include, exclude);
        const decision = include > exclude ? "include" : "exclude";
        steps.push({
          phase: "fill",
          i,
          w,
          dp: cloneDp(dp),
          selectedIndices: [],
          message: `At (i=${i}, w=${w}), include=${include}, exclude=${exclude}; choose ${decision} => ${dp[i][w]}.`
        });
      }
    }
  }

  let w = maxCapacity;
  const selectedIndices = [];
  for (let i = n; i > 0; i -= 1) {
    const item = inputItems[i - 1];
    if (dp[i][w] !== dp[i - 1][w]) {
      selectedIndices.unshift(i - 1);
      steps.push({
        phase: "backtrack",
        i,
        w,
        dp: cloneDp(dp),
        selectedIndices: [...selectedIndices],
        message: `Take item ${item.name}; move from (i=${i}, w=${w}) to (i=${i - 1}, w=${w - item.weight}).`
      });
      w -= item.weight;
    } else {
      steps.push({
        phase: "backtrack",
        i,
        w,
        dp: cloneDp(dp),
        selectedIndices: [...selectedIndices],
        message: `Skip item ${item.name}; value unchanged from row above.`
      });
    }
  }

  steps.push({
    phase: "done",
    i: 0,
    w,
    dp: cloneDp(dp),
    selectedIndices: [...selectedIndices],
    message: `Done. Best value is ${dp[n][maxCapacity]} at capacity ${maxCapacity}.`
  });

  return steps;
};

const KnapsackAlgo = () => {
  const steps = useMemo(() => generateKnapsackSteps(items, capacity), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentStep = steps[stepIndex];
  const selectedItems = currentStep.selectedIndices.map((index) => items[index]);
  const selectedWeight = selectedItems.reduce((sum, item) => sum + item.weight, 0);
  const selectedValue = selectedItems.reduce((sum, item) => sum + item.value, 0);
  const bestValue = steps[steps.length - 1].dp[items.length][capacity];

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    }, 900);

    return () => clearInterval(intervalId);
  }, [isPlaying, stepIndex, steps.length]);

  const getCellStyle = (row, col) => {
    let bg = "#f3f4f6";
    if (currentStep.phase === "fill" && row === currentStep.i && col === currentStep.w) {
      bg = "#ef4444";
    } else if (
      (currentStep.phase === "backtrack" || currentStep.phase === "done") &&
      row === currentStep.i &&
      col === currentStep.w
    ) {
      bg = "#3b82f6";
    } else if (row > 0 && currentStep.selectedIndices.includes(row - 1)) {
      bg = "#10b981";
    }

    return {
      background: bg,
      color: getTextColorForBackground(bg)
    };
  };

  return (
    <Container>
      <CardContainer>
        <Title>0/1 Knapsack Problem</Title>
        <Para>
          The DP table stores the best value using the first i items and
          capacity w. After filling the table, backtracking reveals which items
          were chosen for the optimal value.
        </Para>

        <AlgoVisualizer>
          <div className="algo-split">
            <div className="algo-pane-main-wide" style={{ overflowX: "auto" }}>
              <table style={{ borderCollapse: "collapse", minWidth: "min(100%, 520px)" }}>
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #cbd5e1", padding: "6px", color: "#1f2937", fontSize: "13px" }}>
                      i / w
                    </th>
                    {Array.from({ length: capacity + 1 }, (_, w) => (
                      <th
                        key={`head-${w}`}
                        style={{ border: "1px solid #cbd5e1", padding: "6px", color: "#1f2937", fontSize: "13px" }}
                      >
                        {w}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: items.length + 1 }, (_, row) => (
                    <tr key={`row-${row}`}>
                      <td
                        style={{
                          border: "1px solid #cbd5e1",
                          padding: "6px",
                          fontWeight: "700",
                          color: "#1f2937",
                          background: row === 0 ? "#e2e8f0" : "#e5e7eb",
                          fontSize: "13px"
                        }}
                      >
                        {row === 0 ? "0 items" : `${row} (${items[row - 1].name})`}
                      </td>
                      {Array.from({ length: capacity + 1 }, (_, col) => {
                        const cellStyle = getCellStyle(row, col);
                        return (
                          <td
                            key={`cell-${row}-${col}`}
                            style={{
                              border: "1px solid #cbd5e1",
                              padding: "6px",
                              minWidth: "min(100%, 34px)",
                              textAlign: "center",
                              fontWeight: "700",
                              background: cellStyle.background,
                              color: cellStyle.color,
                              fontSize: "13px"
                            }}
                          >
                            {currentStep.dp[row][col]}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="algo-pane-side">
              <div style={{ marginBottom: "12px" }}>
                <strong style={{ color: "#4b5563" }}>Items:</strong>
                <div
                  style={{
                    marginTop: "8px",
                    padding: "10px",
                    background: "#ecf0f1",
                    borderRadius: "6px",
                    color: "#1f2937",
                    lineHeight: 1.6
                  }}
                >
                  {items.map((item) => (
                    <div key={`item-${item.name}`}>
                      {item.name}: weight {item.weight}, value {item.value}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <strong style={{ color: "#1f7a3f" }}>Chosen items:</strong>
                <div
                  style={{
                    marginTop: "8px",
                    padding: "10px",
                    background: "#ecf0f1",
                    borderRadius: "6px",
                    minHeight: "44px",
                    color: "#1f7a3f"
                  }}
                >
                  {selectedItems.length > 0
                    ? selectedItems.map((item) => item.name).join(" • ")
                    : "(none yet)"}
                </div>
                <div style={{ marginTop: "6px", color: "#1f2937" }}>
                  Weight: {selectedWeight} / {capacity}
                </div>
                <div style={{ color: "#1f2937" }}>
                  Value so far: {selectedValue} (best possible: {bestValue})
                </div>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <strong style={{ color: "#1f5f8b" }}>Phase:</strong>
                <div style={{ marginTop: "8px", color: "#1f5f8b" }}>
                  {currentStep.phase === "fill"
                    ? "Fill DP table"
                    : currentStep.phase === "backtrack"
                      ? "Backtrack choices"
                      : "Complete"}
                </div>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <strong style={{ color: "#1f5f8b" }}>Step:</strong>
                <div style={{ marginTop: "8px", color: "#1f5f8b" }}>{currentStep.message}</div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsPlaying((prev) => !prev)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "6px",
                    border: "1px solid #bdc3c7",
                    background: "#ffffff",
                    cursor: "pointer",
                    color: "#c0392b"
                  }}
                >
                  {isPlaying ? "Pause" : "Play"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStepIndex(0);
                    setIsPlaying(true);
                  }}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "6px",
                    border: "1px solid #bdc3c7",
                    background: "#ffffff",
                    cursor: "pointer",
                    color: "#c0392b"
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </AlgoVisualizer>

        <CodeBlock>
{`function knapsack(items, capacity) {
  const n = items.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (items[i - 1].weight > w) dp[i][w] = dp[i - 1][w];
      else {
        const include = items[i - 1].value + dp[i - 1][w - items[i - 1].weight];
        const exclude = dp[i - 1][w];
        dp[i][w] = Math.max(include, exclude);
      }
    }
  }

  return dp[n][capacity];
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default KnapsackAlgo;
