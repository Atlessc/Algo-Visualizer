import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  AlgoVisualizerScroll,
  CodeBlock,
  Para
} from "../ui/algo-primitives";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

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

const KnapsackAlgo = ({ autoPlay = true, compact = false }) => {
  const steps = useMemo(() => generateKnapsackSteps(items, capacity), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const currentStep = steps[stepIndex];
  const selectedItems = currentStep.selectedIndices.map((index) => items[index]);
  const selectedWeight = selectedItems.reduce((sum, item) => sum + item.weight, 0);
  const selectedValue = selectedItems.reduce((sum, item) => sum + item.value, 0);
  const bestValue = steps[steps.length - 1].dp[items.length][capacity];
  const tableMinWidth = compact ? 420 : 520;
  const cellPadding = compact ? "4px" : "6px";
  const cellMinWidth = compact ? "28px" : "34px";
  const cellFontSize = compact ? "11px" : "13px";

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    }, 900);

    return () => clearInterval(intervalId);
  }, [isPlaying, stepIndex, steps.length]);

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

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
            <AlgoVisualizerScroll className="algo-pane-main-wide">
              <table className="border-collapse" style={{ minWidth: `${tableMinWidth}px` }}>
                <thead>
                  <tr>
                    <th
                      className="border border-slate-300 px-1 text-slate-800"
                      style={{ padding: cellPadding, fontSize: cellFontSize }}
                    >
                      {compact ? "i/w" : "i / w"}
                    </th>
                    {Array.from({ length: capacity + 1 }, (_, w) => (
                      <th
                        key={`head-${w}`}
                        className="border border-slate-300 px-1 text-slate-800"
                        style={{ padding: cellPadding, fontSize: cellFontSize }}
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
                        className="border border-slate-300 font-bold text-slate-800"
                        style={{
                          padding: cellPadding,
                          background: row === 0 ? "#e2e8f0" : "#e5e7eb",
                          fontSize: cellFontSize,
                          whiteSpace: compact ? "nowrap" : "normal"
                        }}
                      >
                        {row === 0
                          ? (compact ? "0" : "0 items")
                          : (compact ? `${row}/${items[row - 1].name}` : `${row} (${items[row - 1].name})`)}
                      </td>
                      {Array.from({ length: capacity + 1 }, (_, col) => {
                        const cellStyle = getCellStyle(row, col);
                        return (
                          <td
                            key={`cell-${row}-${col}`}
                            className="border border-slate-300 text-center font-bold"
                            style={{
                              padding: cellPadding,
                              minWidth: cellMinWidth,
                              background: cellStyle.background,
                              color: cellStyle.color,
                              fontSize: cellFontSize
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
            </AlgoVisualizerScroll>

            <div className="algo-pane-side">
              <div className="mb-3">
                <strong className="text-slate-600">Items:</strong>
                <div
                  className={cn("mt-2 rounded-md bg-slate-100 text-slate-800", compact ? "p-2 text-sm" : "p-2.5 text-base")}
                  style={{ lineHeight: compact ? 1.45 : 1.6 }}
                >
                  {items.map((item) => (
                    <div key={`item-${item.name}`}>
                      {item.name}: weight {item.weight}, value {item.value}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <strong className="text-emerald-700">Chosen items:</strong>
                <div
                  className={cn(
                    "mt-2 min-h-11 rounded-md bg-slate-100 text-emerald-700",
                    compact ? "p-2 text-sm" : "p-2.5 text-base"
                  )}
                >
                  {selectedItems.length > 0
                    ? selectedItems.map((item) => item.name).join(" • ")
                    : "(none yet)"}
                </div>
                <div className="mt-1.5 text-slate-800">
                  Weight: {selectedWeight} / {capacity}
                </div>
                <div className="text-slate-800">
                  Value so far: {selectedValue} (best possible: {bestValue})
                </div>
              </div>

              <div className="mb-3">
                <strong className="text-sky-800">Phase:</strong>
                <div className="mt-2 text-sky-800">
                  {currentStep.phase === "fill"
                    ? "Fill DP table"
                    : currentStep.phase === "backtrack"
                      ? "Backtrack choices"
                      : "Complete"}
                </div>
              </div>

              <div className="mb-3">
                <strong className="text-sky-800">Step:</strong>
                <div className={cn("mt-2 text-sky-800", compact ? "text-sm" : "text-base")}>
                  {currentStep.message}
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <Button
                  size={compact ? "sm" : "default"}
                  variant="secondary"
                  onClick={() => setIsPlaying((prev) => !prev)}
                >
                  {isPlaying ? "Pause" : "Play"}
                </Button>

                <Button
                  size={compact ? "sm" : "default"}
                  variant="outline"
                  onClick={() => {
                    setStepIndex(0);
                    setIsPlaying(autoPlay);
                  }}
                >
                  Reset
                </Button>
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
