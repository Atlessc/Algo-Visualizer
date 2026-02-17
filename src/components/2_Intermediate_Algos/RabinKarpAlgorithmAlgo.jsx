import React, { useEffect, useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

const TEXT = "ABCCDDAEFG";
const PATTERN = "CDD";
const MOD = 101;
const BASE = 256;

const hashString = (s) => s.split("").reduce((h, ch) => (h * BASE + ch.charCodeAt(0)) % MOD, 0);

const buildSteps = () => {
  const m = PATTERN.length;
  const n = TEXT.length;
  const steps = [];
  const pHash = hashString(PATTERN);
  let tHash = hashString(TEXT.slice(0, m));
  let h = 1;
  for (let i = 0; i < m - 1; i++) h = (h * BASE) % MOD;

  for (let i = 0; i <= n - m; i++) {
    const window = TEXT.slice(i, i + m);
    const equalHash = pHash === tHash;
    const exactMatch = equalHash && window === PATTERN;
    steps.push({
      i,
      window,
      tHash,
      pHash,
      equalHash,
      exactMatch,
      message: exactMatch ? `Match at index ${i}.` : equalHash ? `Hash match at ${i}, verify characters.` : `Hash mismatch at ${i}.`,
    });
    if (i < n - m) {
      tHash = (BASE * (tHash - TEXT.charCodeAt(i) * h) + TEXT.charCodeAt(i + m)) % MOD;
      if (tHash < 0) tHash += MOD;
    }
  }
  return steps;
};

const RabinKarpAlgorithmAlgo = ({ autoPlay = true, compact = false }) => {
  const steps = useMemo(() => buildSteps(), []);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const step = steps[stepIndex];

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  useEffect(() => {
    if (!isPlaying || stepIndex >= steps.length - 1) return undefined;
    const id = setInterval(() => setStepIndex((p) => Math.min(p + 1, steps.length - 1)), 1000);
    return () => clearInterval(id);
  }, [isPlaying, stepIndex, steps.length]);

  return (
    <Container>
      <CardContainer>
        <Title>Rabin-Karp Algorithm</Title>
        <Para>
          Rabin-Karp searches for a pattern using rolling hashes over text windows. Hashes quickly
          skip most non-matches, and only potential matches are verified character-by-character.
        </Para>
        <Para>{step.message}</Para>
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
        <Para>Pattern: "{PATTERN}" | Pattern hash: {step.pHash} | Window hash: {step.tHash}</Para>

        <AlgoVisualizer>
          <div className="w-full overflow-x-auto">
            <div className="mx-auto w-fit" style={{ minWidth: `${TEXT.length * 38}px` }}>
              <div className="mb-2 flex gap-1.5">
                {TEXT.split("").map((ch, idx) => {
                  const inWindow = idx >= step.i && idx < step.i + PATTERN.length;
                  const matchCell = inWindow && PATTERN[idx - step.i] === ch && step.equalHash;
                  const bg = inWindow ? (matchCell ? "#16a34a" : "#f59e0b") : "#d1d5db";
                  return (
                    <div
                      key={idx}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold text-white",
                        compact && "h-7 w-7 text-xs"
                      )}
                      style={{ background: bg }}
                    >
                      {ch}
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-1.5">
                {TEXT.split("").map((_, idx) => {
                  const rel = idx - step.i;
                  const show = rel >= 0 && rel < PATTERN.length;
                  return (
                    <div
                      key={`p-${idx}`}
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-md border text-sm font-bold",
                        compact && "h-7 w-7 text-xs",
                        show
                          ? "border-sky-300 bg-sky-500 text-white"
                          : "border-transparent bg-transparent text-transparent"
                      )}
                    >
                      {show ? PATTERN[rel] : "_"}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </AlgoVisualizer>

        <CodeBlock>
          {`function rabinKarp(text, pattern) {
  const pHash = hash(pattern);
  let wHash = hash(text.slice(0, pattern.length));
  for (let i = 0; i <= text.length - pattern.length; i++) {
    if (pHash === wHash && text.slice(i, i + pattern.length) === pattern) return i;
    wHash = rollHash(wHash, text[i], text[i + pattern.length]);
  }
  return -1;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default RabinKarpAlgorithmAlgo;
