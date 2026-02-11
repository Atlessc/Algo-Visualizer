import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  CardContainer,
  Title,
  AlgoVisualizer,
  CodeBlock,
  Para
} from "../Styled Components/styledComponents";

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

const KmpAlgorithmAlgo = () => {
  const steps = useMemo(() => generateKmpSteps(SAMPLE_TEXT, SAMPLE_PATTERN), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentStep = steps[stepIndex];
  const isSearchPhase = currentStep.phase === "search";
  const currentMatches = currentStep.matches ?? [];

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying, stepIndex, steps.length]);

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
              <div style={{ marginBottom: "16px", color: "#1f2937", fontWeight: "600", wordBreak: "break-all" }}>
                Text: {SAMPLE_TEXT}
              </div>
              <div style={{ marginBottom: "10px", color: "#4b5563", fontWeight: "600" }}>
                Pattern:
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  marginBottom: "16px",
                  flexWrap: "wrap"
                }}
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
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "6px",
                        background: bg,
                        color: getTextColorForBackground(bg),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "700"
                      }}
                    >
                      {char}
                    </div>
                  );
                })}
              </div>

              <div style={{ marginBottom: "10px", color: "#4b5563", fontWeight: "600" }}>
                Search alignment:
              </div>
              <div style={{ overflowX: "auto", paddingBottom: "6px" }}>
                <div style={{ minWidth: `${SAMPLE_TEXT.length * 34}px` }}>
                  <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
                    {SAMPLE_TEXT.split("").map((char, idx) => {
                      const bg = isSearchPhase && currentStep.textIndex === idx ? "#ef4444" : "#d1d5db";
                      return (
                        <div
                          key={`text-${idx}`}
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "6px",
                            background: bg,
                            color: getTextColorForBackground(bg),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "700"
                          }}
                        >
                          {char}
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ display: "flex", gap: "6px" }}>
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
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "6px",
                            background: bg,
                            color: bg === "transparent" ? "transparent" : getTextColorForBackground(bg),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "700",
                            border: isPatternHere ? "1px solid #93c5fd" : "1px solid transparent"
                          }}
                        >
                          {isPatternHere ? SAMPLE_PATTERN[relativePatternIndex] : "_"}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="algo-pane-side-wide">
              <div style={{ marginBottom: "12px" }}>
                <strong style={{ color: "#1f5f8b" }}>Phase:</strong>
                <div style={{ marginTop: "8px", color: "#1f5f8b" }}>
                  {isSearchPhase ? "Search" : "LPS Construction"}
                </div>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <strong style={{ color: "#4b5563" }}>LPS Array:</strong>
                <div
                  style={{
                    marginTop: "8px",
                    display: "grid",
                    gridTemplateColumns: `repeat(${SAMPLE_PATTERN.length}, minmax(24px, 1fr))`,
                    gap: "6px"
                  }}
                >
                  {currentStep.lps.map((value, idx) => {
                    const bg = idx === currentStep.i ? "#f59e0b" : "#e5e7eb";
                    return (
                      <div
                        key={`lps-${idx}`}
                        style={{
                          padding: "6px 4px",
                          borderRadius: "6px",
                          background: bg,
                          color: getTextColorForBackground(bg),
                          textAlign: "center",
                          fontWeight: "700"
                        }}
                        title={`LPS[${idx}]`}
                      >
                        {value}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <strong style={{ color: "#1f7a3f" }}>Matches found:</strong>
                <div
                  style={{
                    marginTop: "8px",
                    padding: "10px",
                    background: "#ecf0f1",
                    borderRadius: "6px",
                    minHeight: "40px",
                    color: "#1f7a3f"
                  }}
                >
                  {currentMatches.length > 0
                    ? currentMatches.map((idx) => `index ${idx}`).join(" • ")
                    : "(none yet)"}
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
