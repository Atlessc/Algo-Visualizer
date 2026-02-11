import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

const NUMS = [3, 34, 4, 12, 5, 2];
const TARGET = 9;

const buildSteps = () => {
  const n = NUMS.length;
  const dp = Array.from({ length: n + 1 }, () => Array(TARGET + 1).fill(false));
  for (let i = 0; i <= n; i++) dp[i][0] = true;
  const steps = [{ i: 0, s: 0, dp: dp.map((r) => [...r]), msg: "Initialize: sum 0 is always achievable." }];

  for (let i = 1; i <= n; i++) {
    for (let s = 1; s <= TARGET; s++) {
      dp[i][s] = dp[i - 1][s];
      if (s >= NUMS[i - 1]) dp[i][s] = dp[i][s] || dp[i - 1][s - NUMS[i - 1]];
      steps.push({
        i,
        s,
        dp: dp.map((r) => [...r]),
        msg: `Consider value ${NUMS[i - 1]} for target sum ${s}.`,
      });
    }
  }
  steps.push({ i: n, s: TARGET, dp: dp.map((r) => [...r]), msg: dp[n][TARGET] ? "Subset exists for target sum." : "No subset reaches target." });
  return steps;
};

const SubsetSumAlgo = ({ autoPlay = true, compact = false }) => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const step = steps[stepIndex];

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 130);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>Subset Sum</Title>
        <Para>
          Subset Sum asks whether any subset of numbers equals a target value. The dynamic
          programming approach builds a boolean table where dp[i][s] indicates whether sum s can be
          formed using the first i numbers. Time complexity is O(n*target).
        </Para>
        <Para>Numbers: [{NUMS.join(", ")}], Target: {TARGET}</Para>
        <Para>{step.msg}</Para>
        <div className="mb-1 flex flex-wrap items-center justify-center gap-2.5">
          <Button
            type="button"
            size={compact ? "sm" : "default"}
            onClick={() => setIsPlaying((p) => !p)}
          >
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button
            type="button"
            size={compact ? "sm" : "default"}
            variant="secondary"
            onClick={() => { setStepIndex(0); setIsPlaying(true); }}
          >
            Reset
          </Button>
        </div>

        <AlgoVisualizer>
          <div className="w-full overflow-x-auto">
            <table
              className={cn("mx-auto border-collapse", compact ? "text-xs" : "text-sm")}
              style={{ minWidth: "580px" }}
            >
              <thead>
                <tr>
                  <th className={cn("border border-slate-300", compact ? "px-1.5 py-1" : "px-2 py-1.5")}>i/s</th>
                  {Array.from({ length: TARGET + 1 }, (_, s) => (
                    <th
                      key={s}
                      className={cn("border border-slate-300", compact ? "px-1.5 py-1" : "px-2 py-1.5")}
                    >
                      {s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {step.dp.map((row, i) => (
                  <tr key={i}>
                    <th
                      className={cn(
                        "border border-slate-300 bg-slate-100",
                        compact ? "px-1.5 py-1" : "px-2 py-1.5"
                      )}
                    >
                      {i === 0 ? "0 items" : i}
                    </th>
                    {row.map((v, s) => {
                      const active = i === step.i && s === step.s;
                      return (
                        <td
                          key={`${i}-${s}`}
                          className={cn(
                            "border border-slate-300 text-center font-bold",
                            compact ? "px-1.5 py-1" : "px-2 py-1.5",
                            active
                              ? "bg-sky-500 text-white"
                              : v
                                ? "bg-emerald-100 text-slate-900"
                                : "bg-white text-slate-900"
                          )}
                        >
                          {v ? "T" : "F"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AlgoVisualizer>

        <CodeBlock>
          {`function subsetSum(nums, target) {
  const n = nums.length;
  const dp = Array.from({ length: n + 1 }, () => Array(target + 1).fill(false));
  for (let i = 0; i <= n; i++) dp[i][0] = true;
  for (let i = 1; i <= n; i++) {
    for (let s = 1; s <= target; s++) {
      dp[i][s] = dp[i - 1][s];
      if (s >= nums[i - 1]) dp[i][s] ||= dp[i - 1][s - nums[i - 1]];
    }
  }
  return dp[n][target];
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default SubsetSumAlgo;
