import React, { useMemo, useState } from "react";
import { Container, CardContainer, Title, AlgoVisualizer, CodeBlock, Para } from "../ui/algo-primitives";
import { cn } from "../../lib/utils";

const WORDS = ["cat", "car", "cart", "dog", "dove"];

const makeNode = () => ({ children: {}, isWord: false });

const buildTrie = (words) => {
  const root = makeNode();
  words.forEach((word) => {
    let cur = root;
    for (const ch of word) {
      if (!cur.children[ch]) cur.children[ch] = makeNode();
      cur = cur.children[ch];
    }
    cur.isWord = true;
  });
  return root;
};

const traversePrefix = (trie, query) => {
  let cur = trie;
  const path = [];
  for (const ch of query) {
    if (!cur.children[ch]) return { foundPrefix: false, foundWord: false, path };
    cur = cur.children[ch];
    path.push(ch);
  }
  return { foundPrefix: true, foundWord: cur.isWord, path };
};

const collectBranches = (node, prefix = "", out = []) => {
  Object.entries(node.children).forEach(([ch, child]) => {
    const next = prefix + ch;
    out.push({ text: next, word: child.isWord });
    collectBranches(child, next, out);
  });
  return out;
};

const TrieOperationsAlgo = ({ compact = false }) => {
  const trie = useMemo(() => buildTrie(WORDS), []);
  const [query, setQuery] = useState("car");
  const result = traversePrefix(trie, query);
  const branches = collectBranches(trie);

  return (
    <Container>
      <CardContainer>
        <Title>Trie Operations</Title>
        <Para>Trie supports efficient insert/search/prefix checks by sharing common prefixes.</Para>
        <div className="mb-1 flex flex-wrap items-center justify-center gap-2.5">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value.toLowerCase())}
            className={cn(
              "h-9 rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none ring-sky-300 transition focus:ring-2",
              compact ? "w-full min-w-0 text-sm" : "w-[180px] text-sm"
            )}
            aria-label="Trie search query"
          />
        </div>
        <Para>
          Prefix exists: <strong>{result.foundPrefix ? "Yes" : "No"}</strong> | Exact word:{" "}
          <strong>{result.foundWord ? "Yes" : "No"}</strong>
        </Para>

        <AlgoVisualizer>
          <div className="mx-auto grid w-full max-w-[820px] gap-2.5">
            <div className="flex flex-wrap items-center justify-center gap-2 rounded-xl bg-indigo-100 p-2.5">
              {WORDS.map((w) => (
                <span key={w} className={cn("rounded-full bg-slate-700 px-2.5 py-1 text-white", compact ? "text-[11px]" : "text-xs")}>
                  {w}
                </span>
              ))}
            </div>
            <div className={cn("grid gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2.5", compact ? "grid-cols-2" : "grid-cols-[repeat(auto-fit,minmax(110px,1fr))]")}>
              {branches.map((b, i) => {
                const active = query && b.text.startsWith(query) ? "#0ea5e9" : result.path.join("") === b.text ? "#f59e0b" : "#fff";
                return (
                  <div
                    key={i}
                    className={cn(
                      "rounded-lg p-2 font-mono font-semibold",
                      compact ? "text-xs" : "text-[13px]"
                    )}
                    style={{ background: active, color: active === "#fff" ? "#1e293b" : "#fff" }}
                  >
                    {b.text}{b.word ? " *" : ""}
                  </div>
                );
              })}
            </div>
          </div>
        </AlgoVisualizer>

        <CodeBlock>
          {`class TrieNode {
  constructor() { this.children = {}; this.isWord = false; }
}

function insert(root, word) {
  let node = root;
  for (const ch of word) {
    node.children[ch] ??= new TrieNode();
    node = node.children[ch];
  }
  node.isWord = true;
}`}
        </CodeBlock>
      </CardContainer>
    </Container>
  );
};

export default TrieOperationsAlgo;
