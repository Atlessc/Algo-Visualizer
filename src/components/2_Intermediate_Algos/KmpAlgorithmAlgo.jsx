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

const SAMPLE_TEXT = "ABABDABACDABABCABAB";
const SAMPLE_PATTERN = "ABABCABAB";

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

const generateLpsSteps = (pattern) => {
  const lps = Array(pattern.length).fill(0);
  const steps = [
    {
      phase: "lps",
      message: "Build LPS array for the pattern.",
      lps: [...lps],
      i: 1,
      len: 0,
      patternIndex: 1,
      patternMatchIndex: 0
    }
  ];

  let len = 0;
  let i = 1;
  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len += 1;
      lps[i] = len;
      steps.push({
        phase: "lps",
        message: `pattern[${i}] matches pattern[${len - 1}], set LPS[${i}] = ${len}.`,
        lps: [...lps],
        i,
        len,
        patternIndex: i,
        patternMatchIndex: len - 1
      });
      i += 1;
    } else if (len !== 0) {
      const oldLen = len;
      len = lps[len - 1];
      steps.push({
        phase: "lps",
        message: `Mismatch at i=${i}. Fallback len from ${oldLen} to ${len}.`,
        lps: [...lps],
        i,
        len,
        patternIndex: i,
        patternMatchIndex: oldLen - 1
      });
    } else {
      lps[i] = 0;
      steps.push({
        phase: "lps",
        message: `Mismatch at i=${i} with len=0, set LPS[${i}] = 0.`,
        lps: [...lps],
        i,
        len,
        patternIndex: i,
        patternMatchIndex: null
      });
      i += 1;
    }
  }

  steps.push({
    phase: "lps",
    message: "LPS construction complete.",
    lps: [...lps],
    i: pattern.length - 1,
    len,
    patternIndex: null,
    patternMatchIndex: null
  });

  return { lps, steps };
};

const generateSearchSteps = (text, pattern, lps) => {
  const steps = [
    {
      phase: "search",
      message: "Start KMP search using the computed LPS array.",
      lps: [...lps],
      textIndex: 0,
      patternIndex: 0,
      windowStart: 0,
      matches: []
    }
  ];

  const matches = [];
  let i = 0;
  let j = 0;
  while (i < text.length) {
    if (text[i] === pattern[j]) {
      steps.push({
        phase: "search",
        message: `Match: text[${i}] and pattern[${j}] are both "${text[i]}".`,
        lps: [...lps],
        textIndex: i,
        patternIndex: j,
        windowStart: i - j,
        matches: [...matches]
      });
      i += 1;
      j += 1;

      if (j === pattern.length) {
        const startIndex = i - j;
        matches.push(startIndex);
        steps.push({
          phase: "search",
          message: `Pattern found at index ${startIndex}. Continue with LPS fallback.`,
          lps: [...lps],
          textIndex: i - 1,
          patternIndex: j - 1,
          windowStart: startIndex,
          matches: [...matches]
        });
        j = lps[j - 1];
      }
    } else if (j !== 0) {
      const oldJ = j;
      j = lps[j - 1];
      steps.push({
        phase: "search",
        message: `Mismatch at text[${i}] vs pattern[${oldJ}]. Jump pattern index to ${j}.`,
        lps: [...lps],
        textIndex: i,
        patternIndex: oldJ,
        windowStart: i - oldJ,
        matches: [...matches]
      });
    } else {
      steps.push({
        phase: "search",
        message: `Mismatch at text[${i}] with pattern start. Move text pointer forward.`,
        lps: [...lps],
        textIndex: i,
        patternIndex: 0,
        windowStart: i,
        matches: [...matches]
      });
      i += 1;
    }
  }

  steps.push({
    phase: "search",
    message: "Search complete.",
    lps: [...lps],
    textIndex: null,
    patternIndex: null,
    windowStart: text.length,
    matches: [...matches]
  });

  return steps;
};

const generateKmpSteps = (text, pattern) => {
  const { lps, steps: lpsSteps } = generateLpsSteps(pattern);
  const searchSteps = generateSearchSteps(text, pattern, lps);
  return [...lpsSteps, ...searchSteps];
};

const KmpAlgorithmAlgo = ({ autoPlay = true, compact = false }) => {
  const steps = useMemo(() => generateKmpSteps(SAMPLE_TEXT, SAMPLE_PATTERN), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const currentStep = steps[stepIndex];
  const isSearchPhase = currentStep.phase === "search";
  const currentMatches = currentStep.matches ?? [];
  const cellSize = compact ? 24 : 30;
  const cellGap = compact ? 4 : 6;
  const cellRadius = compact ? 5 : 6;
  const cellFontSize = compact ? "0.82rem" : "0.95rem";
  const alignmentMinWidth = Math.max(260, SAMPLE_TEXT.length * (cellSize + cellGap) + cellGap);

  const getCharCellStyle = (bg, options = {}) => ({
    width: `${cellSize}px`,
    height: `${cellSize}px`,
    borderRadius: `${cellRadius}px`,
    background: bg,
    color: bg === "transparent" ? "transparent" : getTextColorForBackground(bg),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: cellFontSize,
    border: options.border ?? "1px solid transparent",
    flex: "0 0 auto"
  });

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying, stepIndex, steps.length]);

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  return (
    <Container>
      <CardContainer>
        <Title>KMP (Knuth-Morris-Pratt)</Title>
        <Para>
          KMP preprocesses a pattern into an LPS array, then searches in linear
          time by reusing partial matches instead of re-checking characters.
        </Para>

        <AlgoVisualizer>
          <div className="algo-split">
            <div className="algo-pane-main-wide">
              <div className={cn("break-all font-semibold text-slate-800", compact ? "mb-3" : "mb-4")}>
                Text: {SAMPLE_TEXT}
              </div>
              <div className={cn("font-semibold text-slate-600", compact ? "mb-2" : "mb-2.5")}>
                Pattern:
              </div>
              <div
                className={cn("flex flex-wrap", compact ? "mb-3" : "mb-4")}
                style={{ gap: `${cellGap}px` }}
              >
                {SAMPLE_PATTERN.split("").map((char, idx) => {
                  let bg = "#cbd5e1";
                  if (currentStep.phase === "lps" && currentStep.patternMatchIndex === idx) {
                    bg = "#f59e0b";
                  }
                  if (currentStep.patternIndex === idx) {
                    bg = "#ef4444";
                  }
                  return (
                    <div
                      key={`pattern-top-${idx}`}
                      style={getCharCellStyle(bg)}
                    >
                      {char}
                    </div>
                  );
                })}
              </div>

              <div className="mb-2.5 font-semibold text-slate-600">
                Search alignment:
              </div>
              <AlgoVisualizerScroll className={compact ? "pb-1" : "pb-1.5"}>
                <div style={{ minWidth: `${alignmentMinWidth}px` }}>
                  <div className={compact ? "mb-1.5 flex" : "mb-2 flex"} style={{ gap: `${cellGap}px` }}>
                    {SAMPLE_TEXT.split("").map((char, idx) => {
                      const bg = isSearchPhase && currentStep.textIndex === idx ? "#ef4444" : "#d1d5db";
                      return (
                        <div
                          key={`text-${idx}`}
                          style={getCharCellStyle(bg)}
                        >
                          {char}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex" style={{ gap: `${cellGap}px` }}>
                    {SAMPLE_TEXT.split("").map((_, idx) => {
                      const relativePatternIndex = isSearchPhase
                        ? idx - currentStep.windowStart
                        : -1;
                      const isPatternHere =
                        relativePatternIndex >= 0 &&
                        relativePatternIndex < SAMPLE_PATTERN.length &&
                        isSearchPhase;
                      const isActivePatternChar =
                        isPatternHere && relativePatternIndex === currentStep.patternIndex;
                      const bg = isActivePatternChar
                        ? "#ef4444"
                        : isPatternHere
                          ? "#3b82f6"
                          : "transparent";

                      return (
                        <div
                          key={`align-${idx}`}
                          style={getCharCellStyle(bg, {
                            border: isPatternHere ? "1px solid #93c5fd" : "1px solid transparent"
                          })}
                        >
                          {isPatternHere ? SAMPLE_PATTERN[relativePatternIndex] : "_"}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AlgoVisualizerScroll>
            </div>

            <div className="algo-pane-side-wide">
              <div className="mb-3">
                <strong className="text-sky-800">Phase:</strong>
                <div className="mt-2 text-sky-800">
                  {isSearchPhase ? "Search" : "LPS Construction"}
                </div>
              </div>

              <div className="mb-3">
                <strong className="text-slate-600">LPS Array:</strong>
                <div
                  className="mt-2 grid"
                  style={{
                    gridTemplateColumns: `repeat(${SAMPLE_PATTERN.length}, minmax(${compact ? 20 : 24}px, 1fr))`,
                    gap: compact ? "4px" : "6px"
                  }}
                >
                  {currentStep.lps.map((value, idx) => {
                    const bg = idx === currentStep.i ? "#f59e0b" : "#e5e7eb";
                    return (
                      <div
                        key={`lps-${idx}`}
                        className="text-center font-bold"
                        style={{
                          padding: compact ? "5px 3px" : "6px 4px",
                          borderRadius: compact ? "5px" : "6px",
                          background: bg,
                          color: getTextColorForBackground(bg),
                          fontSize: compact ? "0.8rem" : "0.95rem"
                        }}
                        title={`LPS[${idx}]`}
                      >
                        {value}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mb-3">
                <strong className="text-emerald-700">Matches found:</strong>
                <div
                  className={cn(
                    "mt-2 min-h-10 rounded-md bg-slate-100 text-emerald-700",
                    compact ? "p-2 text-sm" : "p-2.5 text-base"
                  )}
                >
                  {currentMatches.length > 0
                    ? currentMatches.map((idx) => `index ${idx}`).join(" • ")
                    : "(none yet)"}
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
{`function kmpSearch(text, pattern) {
  const lps = buildLps(pattern);
  const matches = [];
  let i = 0;
  let j = 0;

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
      if (j === pattern.length) {
        matches.push(i - j);
        j = lps[j - 1];
      }
    } else if (j !== 0) {
      j = lps[j - 1];
    } else {
      i++;
    }
  }

  return matches;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default KmpAlgorithmAlgo;
