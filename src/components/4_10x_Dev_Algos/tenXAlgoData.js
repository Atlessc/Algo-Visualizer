const withSteps = (entry) => ({
  ...entry,
  steps: entry.stepLabels.map((title, index) => ({
    title,
    detail: entry.stepDetails[index],
    metric: entry.stepMetrics[index] ?? `Phase ${index + 1}`
  }))
});

export const tenXAlgoData = {
  AhoCorasickAlgo: withSteps({
    title: "Aho-Corasick Multi-Pattern Search",
    description:
      "Aho-Corasick matches many keywords in one pass over text, making it ideal for scanners and content filters.",
    intuition:
      "Build a trie of patterns, then add failure links so mismatches jump to the best suffix state instead of restarting.",
    complexity: "Build O(total pattern length), Search O(text length + matches)",
    useCase: "Log scanning, profanity filters, IDS signatures",
    stepLabels: ["Build Trie", "Create Failure Links", "Scan Text", "Emit Matches"],
    stepDetails: [
      "Insert every pattern into a trie so common prefixes are shared.",
      "BFS assigns fallback edges for mismatch recovery.",
      "Consume each character once while walking trie/failure transitions.",
      "Whenever terminal states are reached, report keyword hits."
    ],
    stepMetrics: ["Nodes: 19", "Fallbacks: 12", "Text idx: 27", "Matches: 6"],
    code: `function ahoCorasickSearch(text, gotoFn, fail, out) {
  let state = 0;
  const matches = [];
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    while (state !== 0 && gotoFn[state][ch] === undefined) state = fail[state];
    state = gotoFn[state][ch] ?? 0;
    for (const pattern of out[state] ?? []) matches.push([i - pattern.length + 1, pattern]);
  }
  return matches;
}`
  }),

  AlphaBetaPruningAlgo: withSteps({
    title: "Alpha-Beta Pruning",
    description:
      "Alpha-beta is an optimization over minimax that skips branches that cannot affect the final decision.",
    intuition:
      "Track the best guaranteed value for both players (alpha for max, beta for min) and prune when alpha >= beta.",
    complexity: "Best O(b^(d/2)), Worst O(b^d)",
    useCase: "Turn-based game AI with deep search trees",
    stepLabels: ["Traverse Node", "Update Alpha", "Update Beta", "Prune Branch"],
    stepDetails: [
      "Depth-first search starts from root game state.",
      "Max player improves lower bound alpha.",
      "Min player tightens upper bound beta.",
      "Remaining siblings are skipped after cutoff."
    ],
    stepMetrics: ["Depth: 0", "alpha: 3", "beta: 2", "Cutoff: yes"],
    code: `function alphaBeta(node, depth, alpha, beta, maximizing) {
  if (depth === 0 || node.isTerminal()) return node.score();
  if (maximizing) {
    let value = -Infinity;
    for (const child of node.children()) {
      value = Math.max(value, alphaBeta(child, depth - 1, alpha, beta, false));
      alpha = Math.max(alpha, value);
      if (alpha >= beta) break;
    }
    return value;
  }
  let value = Infinity;
  for (const child of node.children()) {
    value = Math.min(value, alphaBeta(child, depth - 1, alpha, beta, true));
    beta = Math.min(beta, value);
    if (alpha >= beta) break;
  }
  return value;
}`
  }),

  BoyerMooreAlgo: withSteps({
    title: "Boyer-Moore String Matching",
    description:
      "Boyer-Moore compares pattern characters from right to left and can skip large parts of the text.",
    intuition:
      "Bad-character and good-suffix heuristics let the pattern jump farther than one index after mismatches.",
    complexity: "Average sublinear, Worst O(nm)",
    useCase: "Fast substring search in long documents",
    stepLabels: ["Preprocess", "Align Pattern", "Compare Backward", "Shift Pattern"],
    stepDetails: [
      "Build bad-character and suffix shift tables.",
      "Place pattern window over text position s.",
      "Check from pattern end toward start.",
      "Apply largest legal shift from heuristics."
    ],
    stepMetrics: ["Tables ready", "s: 12", "j: 6", "shift: 4"],
    code: `function boyerMoore(text, pattern, last) {
  const hits = [];
  let s = 0;
  while (s <= text.length - pattern.length) {
    let j = pattern.length - 1;
    while (j >= 0 && pattern[j] === text[s + j]) j -= 1;
    if (j < 0) {
      hits.push(s);
      s += 1;
    } else {
      const badIndex = last[text[s + j]] ?? -1;
      s += Math.max(1, j - badIndex);
    }
  }
  return hits;
}`
  }),

  ConvexHullAlgo: withSteps({
    title: "Convex Hull (Monotonic Chain)",
    description:
      "Convex hull finds the smallest convex polygon containing a set of points.",
    intuition:
      "Sort points and maintain lower/upper chains while removing right turns using cross products.",
    complexity: "O(n log n)",
    useCase: "Collision boundaries, GIS shape simplification",
    stepLabels: ["Sort Points", "Build Lower Hull", "Build Upper Hull", "Merge Hull"],
    stepDetails: [
      "Order points by x then y.",
      "Push points and pop while turn is clockwise.",
      "Repeat in reverse order for top chain.",
      "Concatenate chains without duplicate endpoints."
    ],
    stepMetrics: ["n: 14", "Lower: 6", "Upper: 5", "Hull: 9"],
    code: `function convexHull(points) {
  const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  const sorted = [...points].sort((p, q) => (p.x - q.x) || (p.y - q.y));
  const lower = [];
  for (const p of sorted) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }
  const upper = [];
  for (let i = sorted.length - 1; i >= 0; i -= 1) {
    const p = sorted[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  return lower.slice(0, -1).concat(upper.slice(0, -1));
}`
  }),

  DecisionTreeAlgo: withSteps({
    title: "Decision Tree (Classification)",
    description:
      "Decision trees split data by feature thresholds to maximize class purity in child nodes.",
    intuition:
      "At each node choose the split with the best information gain (or Gini reduction), then recurse.",
    complexity: "Training approx O(n features * samples log samples)",
    useCase: "Interpretable supervised classification",
    stepLabels: ["Score Splits", "Choose Best Split", "Create Children", "Stop / Recurse"],
    stepDetails: [
      "Evaluate impurity reduction across candidate thresholds.",
      "Pick feature and threshold with highest gain.",
      "Partition data into left and right subsets.",
      "Stop if pure/depth limit; else continue recursively."
    ],
    stepMetrics: ["gains: 11", "feature: age", "left/right: 42/58", "depth: 3"],
    code: `function bestSplit(rows, features) {
  let best = { gain: 0, feature: null, threshold: null };
  for (const feature of features) {
    const values = [...new Set(rows.map((r) => r[feature]))];
    for (const threshold of values) {
      const left = rows.filter((r) => r[feature] <= threshold);
      const right = rows.filter((r) => r[feature] > threshold);
      const gain = informationGain(rows, left, right);
      if (gain > best.gain) best = { gain, feature, threshold };
    }
  }
  return best;
}`
  }),

  EggDroppingPuzzleAlgo: withSteps({
    title: "Egg Dropping Puzzle",
    description:
      "This dynamic programming problem finds the minimum worst-case drops needed with k eggs and n floors.",
    intuition:
      "For each floor choice x, combine two outcomes: egg breaks (k-1 eggs, x-1 floors) or survives (k eggs, n-x floors).",
    complexity: "Classic DP O(k * n^2)",
    useCase: "Worst-case optimization and decision planning",
    stepLabels: ["Define DP", "Try Drop Floor", "Take Worst Case", "Minimize Attempts"],
    stepDetails: [
      "dp[e][f] = minimum attempts with e eggs and f floors.",
      "Iterate x from 1..f as first drop candidate.",
      "Need 1 + max(breaks, survives).",
      "Keep smallest value across all x."
    ],
    stepMetrics: ["eggs: 2", "x: 7", "worst: 4", "answer: 4"],
    code: `function eggDrop(eggs, floors) {
  const dp = Array.from({ length: eggs + 1 }, () => Array(floors + 1).fill(0));
  for (let f = 1; f <= floors; f += 1) dp[1][f] = f;
  for (let e = 2; e <= eggs; e += 1) {
    for (let f = 1; f <= floors; f += 1) {
      dp[e][f] = Infinity;
      for (let x = 1; x <= f; x += 1) {
        const attempts = 1 + Math.max(dp[e - 1][x - 1], dp[e][f - x]);
        dp[e][f] = Math.min(dp[e][f], attempts);
      }
    }
  }
  return dp[eggs][floors];
}`
  }),

  FortuneAlgorithmAlgo: withSteps({
    title: "Fortune's Algorithm",
    description:
      "Fortune's sweep-line algorithm constructs Voronoi diagrams in optimal O(n log n) time.",
    intuition:
      "Process site and circle events while maintaining a beachline of parabolic arcs in a balanced structure.",
    complexity: "O(n log n)",
    useCase: "Voronoi generation for mapping, routing, meshing",
    stepLabels: ["Site Event", "Update Beachline", "Circle Event", "Finalize Edges"],
    stepDetails: [
      "Insert a new arc when sweep line reaches a point.",
      "Recompute neighboring breakpoints and pending events.",
      "Remove collapsing arc and record Voronoi vertex.",
      "Close remaining half-edges at the bounds."
    ],
    stepMetrics: ["events: 15", "arcs: 7", "vertex: v4", "edges: 18"],
    code: `function processSite(event, beachline, eventQueue) {
  const arc = beachline.locateArcAbove(event.point.x);
  beachline.splitArc(arc, event.point);
  eventQueue.removeInvalidCircleEvents(arc);
  eventQueue.addCircleEventsNear(arc.prev, arc, arc.next);
}

function processCircle(event, beachline, edges) {
  const arc = event.arc;
  if (event.invalid) return;
  edges.push(beachline.closeBreakpoint(arc.prev, arc.next, event.vertex));
  beachline.removeArc(arc);
}`
  }),

  GeneticAlgorithmAlgo: withSteps({
    title: "Genetic Algorithm",
    description:
      "Genetic algorithms evolve candidate solutions through selection, crossover, and mutation.",
    intuition:
      "Keep fitter individuals more often, recombine their genes, and mutate slightly to explore new regions.",
    complexity: "O(population * generations * fitnessCost)",
    useCase: "Large search spaces and heuristic optimization",
    stepLabels: ["Initialize Population", "Evaluate Fitness", "Recombine + Mutate", "Select Next Gen"],
    stepDetails: [
      "Create random chromosomes.",
      "Score each candidate using objective function.",
      "Produce offspring with crossover and mutation.",
      "Carry strongest solutions forward."
    ],
    stepMetrics: ["pop: 30", "best: 0.81", "mut rate: 0.03", "gen: 12"],
    code: `function evolve(population, fitness, crossover, mutate) {
  const scored = population.map((dna) => ({ dna, score: fitness(dna) }))
    .sort((a, b) => b.score - a.score);
  const elites = scored.slice(0, Math.ceil(population.length * 0.2)).map((x) => x.dna);
  const next = [...elites];
  while (next.length < population.length) {
    const a = elites[Math.floor(Math.random() * elites.length)];
    const b = elites[Math.floor(Math.random() * elites.length)];
    next.push(mutate(crossover(a, b)));
  }
  return next;
}`
  }),

  GrahamScanAlgo: withSteps({
    title: "Graham Scan",
    description:
      "Graham scan computes convex hull by sorting points by polar angle around a pivot.",
    intuition:
      "As points are processed in angular order, non-left turns are removed from the stack.",
    complexity: "O(n log n)",
    useCase: "Geometry pipelines and shape envelopes",
    stepLabels: ["Pick Pivot", "Sort by Angle", "Push Candidates", "Pop Right Turns"],
    stepDetails: [
      "Choose lowest y then lowest x point.",
      "Sort remaining points by polar angle from pivot.",
      "Scan points and append to stack.",
      "If turn is not counter-clockwise, remove middle point."
    ],
    stepMetrics: ["pivot: p0", "sorted: 13", "stack: 5", "hull: 8"],
    code: `function grahamScan(points) {
  const cross = (a, b, c) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
  const pivot = points.reduce((best, p) => (p.y < best.y || (p.y === best.y && p.x < best.x) ? p : best));
  const sorted = points.filter((p) => p !== pivot).sort((u, v) => Math.atan2(u.y - pivot.y, u.x - pivot.x) - Math.atan2(v.y - pivot.y, v.x - pivot.x));
  const stack = [pivot, sorted[0]];
  for (let i = 1; i < sorted.length; i += 1) {
    while (stack.length >= 2 && cross(stack[stack.length - 2], stack[stack.length - 1], sorted[i]) <= 0) stack.pop();
    stack.push(sorted[i]);
  }
  return stack;
}`
  }),

  HamiltonianPathBacktrackingAlgo: withSteps({
    title: "Hamiltonian Path (Backtracking)",
    description:
      "Hamiltonian path search tries to visit each vertex exactly once in a graph.",
    intuition:
      "Build path incrementally, reject nodes already used, and backtrack on dead ends.",
    complexity: "O(n!) worst case",
    useCase: "Constraint search and puzzle-style graph traversal",
    stepLabels: ["Start Node", "Try Neighbor", "Validate Path", "Backtrack"],
    stepDetails: [
      "Pick a node as path[0].",
      "Try unused neighbors for next position.",
      "Accept if entire path length reaches n.",
      "Undo choice if no extension works."
    ],
    stepMetrics: ["path len: 1", "candidate: C", "valid: false", "rewind: yes"],
    code: `function hasHamiltonianPath(graph) {
  const n = graph.length;
  const used = Array(n).fill(false);
  const dfs = (node, count) => {
    if (count === n) return true;
    for (const next of graph[node]) {
      if (!used[next]) {
        used[next] = true;
        if (dfs(next, count + 1)) return true;
        used[next] = false;
      }
    }
    return false;
  };
  for (let start = 0; start < n; start += 1) {
    used[start] = true;
    if (dfs(start, 1)) return true;
    used[start] = false;
  }
  return false;
}`
  }),

  JarvisMarchAlgo: withSteps({
    title: "Jarvis March (Gift Wrapping)",
    description:
      "Jarvis March wraps points by repeatedly selecting the most counter-clockwise point from the current hull point.",
    intuition:
      "Treat each hull edge as a search for the next point that all others lie to one side of.",
    complexity: "O(nh), h = hull size",
    useCase: "Small hull extraction and educational geometry",
    stepLabels: ["Leftmost Start", "Pick Candidate", "Rotate Check", "Close Hull"],
    stepDetails: [
      "Begin from leftmost point.",
      "Assume any point as next hull vertex.",
      "Replace candidate if a point is more counter-clockwise.",
      "Stop when you return to start."
    ],
    stepMetrics: ["start: p1", "q: p4", "updated: p6", "hull pts: 7"],
    code: `function jarvis(points) {
  const cross = (a, b, c) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
  const hull = [];
  let left = 0;
  for (let i = 1; i < points.length; i += 1) if (points[i].x < points[left].x) left = i;
  let p = left;
  do {
    hull.push(points[p]);
    let q = (p + 1) % points.length;
    for (let r = 0; r < points.length; r += 1) if (cross(points[p], points[q], points[r]) < 0) q = r;
    p = q;
  } while (p !== left);
  return hull;
}`
  }),

  KmpAdvancedAlgo: withSteps({
    title: "KMP (Advanced)",
    description:
      "KMP finds pattern occurrences in linear time by avoiding re-checking characters after mismatches.",
    intuition:
      "Prefix-function (LPS array) tells how far pattern can shift while preserving known matches.",
    complexity: "O(n + m)",
    useCase: "Fast exact matching in editors and parsers",
    stepLabels: ["Build LPS", "Match Prefix", "Mismatch Fallback", "Report Hit"],
    stepDetails: [
      "Compute longest proper prefix which is also suffix.",
      "Advance text and pattern pointers on match.",
      "Use LPS to avoid restarting at pattern index 0.",
      "When pattern index reaches end, record occurrence."
    ],
    stepMetrics: ["lps[7]=3", "i/j: 14/5", "j -> 2", "match @ 10"],
    code: `function kmp(text, pattern) {
  const lps = Array(pattern.length).fill(0);
  for (let i = 1, len = 0; i < pattern.length;) {
    if (pattern[i] === pattern[len]) lps[i++] = ++len;
    else if (len) len = lps[len - 1];
    else lps[i++] = 0;
  }
  const hits = [];
  for (let i = 0, j = 0; i < text.length;) {
    if (text[i] === pattern[j]) { i += 1; j += 1; }
    if (j === pattern.length) { hits.push(i - j); j = lps[j - 1]; }
    else if (i < text.length && text[i] !== pattern[j]) j ? (j = lps[j - 1]) : (i += 1);
  }
  return hits;
}`
  }),

  LineIntersectionAlgo: withSteps({
    title: "Line Segment Intersection",
    description:
      "This algorithm checks whether two line segments intersect using orientations and boundary cases.",
    intuition:
      "Segments intersect if each straddles the line extended by the other, plus collinear overlap checks.",
    complexity: "O(1)",
    useCase: "CAD, collision detection, clipping",
    stepLabels: ["Compute Orientations", "General Case Test", "Collinear Edge Case", "Return Result"],
    stepDetails: [
      "Evaluate orientation for ordered triples.",
      "Intersection if o1 != o2 and o3 != o4.",
      "Handle points lying on segment bounds.",
      "Return true only when any valid condition holds."
    ],
    stepMetrics: ["o1..o4: 1,2,2,1", "crossed: yes", "on-segment: no", "intersect: true"],
    code: `function segmentsIntersect(p1, q1, p2, q2) {
  const orient = (a, b, c) => Math.sign((b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y));
  const onSeg = (a, b, c) => Math.min(a.x, c.x) <= b.x && b.x <= Math.max(a.x, c.x)
    && Math.min(a.y, c.y) <= b.y && b.y <= Math.max(a.y, c.y);
  const o1 = orient(p1, q1, p2), o2 = orient(p1, q1, q2), o3 = orient(p2, q2, p1), o4 = orient(p2, q2, q1);
  if (o1 !== o2 && o3 !== o4) return true;
  if (o1 === 0 && onSeg(p1, p2, q1)) return true;
  if (o2 === 0 && onSeg(p1, q2, q1)) return true;
  if (o3 === 0 && onSeg(p2, p1, q2)) return true;
  return o4 === 0 && onSeg(p2, q1, q2);
}`
  }),

  ManachersAdvancedAlgo: withSteps({
    title: "Manacher's Algorithm",
    description:
      "Manacher computes all odd/even palindrome radii in linear time.",
    intuition:
      "Mirror known palindrome information around center C to seed expansion at symmetric positions.",
    complexity: "O(n)",
    useCase: "Longest palindromic substring in large text",
    stepLabels: ["Transform String", "Mirror Reuse", "Expand Around Center", "Update Best Window"],
    stepDetails: [
      "Insert separators to unify odd/even handling.",
      "Use mirror index to initialize current radius.",
      "Expand while surrounding characters match.",
      "Track rightmost palindrome boundary."
    ],
    stepMetrics: ["len: 2n+1", "mirror: 11", "radius: 5", "best: abaaba"],
    code: `function manacher(s) {
  const t = "#" + s.split("").join("#") + "#";
  const p = Array(t.length).fill(0);
  let center = 0, right = 0, bestCenter = 0;
  for (let i = 0; i < t.length; i += 1) {
    const mirror = 2 * center - i;
    if (i < right) p[i] = Math.min(right - i, p[mirror]);
    while (i - p[i] - 1 >= 0 && i + p[i] + 1 < t.length && t[i - p[i] - 1] === t[i + p[i] + 1]) p[i] += 1;
    if (i + p[i] > right) { center = i; right = i + p[i]; }
    if (p[i] > p[bestCenter]) bestCenter = i;
  }
  return s.slice((bestCenter - p[bestCenter]) / 2, (bestCenter + p[bestCenter]) / 2);
}`
  }),

  MinimaxAlgo: withSteps({
    title: "Minimax",
    description:
      "Minimax chooses moves by assuming an optimal opponent and maximizing guaranteed outcome.",
    intuition:
      "Max nodes choose highest child value; min nodes choose lowest.",
    complexity: "O(b^d)",
    useCase: "Deterministic perfect-information games",
    stepLabels: ["Expand Game Tree", "Evaluate Leaves", "Propagate Min", "Propagate Max"],
    stepDetails: [
      "Generate legal moves to depth d.",
      "Assign utility scores to terminal states.",
      "Opponent layer picks minimum score.",
      "Player layer picks maximum score."
    ],
    stepMetrics: ["nodes: 40", "leaf score: -1", "min: -2", "root: 3"],
    code: `function minimax(node, depth, maximizing) {
  if (depth === 0 || node.isTerminal()) return node.score();
  const scores = node.children().map((child) => minimax(child, depth - 1, !maximizing));
  return maximizing ? Math.max(...scores) : Math.min(...scores);
}`
  }),

  NQueensBacktrackingAlgo: withSteps({
    title: "N-Queens (Backtracking)",
    description:
      "N-Queens places N queens so none attack each other on rows, columns, or diagonals.",
    intuition:
      "Place one queen per row, skip unsafe columns, and backtrack when stuck.",
    complexity: "O(n!) worst case",
    useCase: "Constraint programming fundamentals",
    stepLabels: ["Place Row", "Check Conflicts", "Commit Queen", "Backtrack"],
    stepDetails: [
      "Attempt a column in current row.",
      "Reject columns with occupied column/diagonals.",
      "Mark column and diagonals as used.",
      "If no safe column, remove prior queen and retry."
    ],
    stepMetrics: ["row: 4", "safe cols: 2", "placed: (4,1)", "rewind row: 3"],
    code: `function solveNQueens(n) {
  const cols = new Set(), diag1 = new Set(), diag2 = new Set();
  const board = Array.from({ length: n }, () => Array(n).fill("."));
  const out = [];
  const dfs = (r) => {
    if (r === n) return out.push(board.map((row) => row.join("")));
    for (let c = 0; c < n; c += 1) {
      const d1 = r - c, d2 = r + c;
      if (cols.has(c) || diag1.has(d1) || diag2.has(d2)) continue;
      cols.add(c); diag1.add(d1); diag2.add(d2); board[r][c] = "Q";
      dfs(r + 1);
      cols.delete(c); diag1.delete(d1); diag2.delete(d2); board[r][c] = ".";
    }
  };
  dfs(0);
  return out;
}`
  }),

  NaiveBayesAlgo: withSteps({
    title: "Naive Bayes",
    description:
      "Naive Bayes predicts classes using Bayes theorem with conditional independence assumptions.",
    intuition:
      "Compute log posterior for each class from class priors and per-feature likelihoods.",
    complexity: "Train O(samples * features), Predict O(classes * features)",
    useCase: "Text classification and spam filtering",
    stepLabels: ["Compute Priors", "Estimate Likelihoods", "Score Classes", "Pick Max Posterior"],
    stepDetails: [
      "Count class frequencies P(C).",
      "Estimate P(feature|class) with smoothing.",
      "Sum log-probabilities for each class.",
      "Choose class with highest score."
    ],
    stepMetrics: ["P(spam)=0.34", "alpha: 1", "log score: -12.1", "class: spam"],
    code: `function predictNaiveBayes(sample, priors, likelihoods) {
  let bestClass = null;
  let bestScore = -Infinity;
  for (const cls of Object.keys(priors)) {
    let score = Math.log(priors[cls]);
    for (const feature of Object.keys(sample)) {
      const prob = likelihoods[cls][feature][sample[feature]] ?? 1e-9;
      score += Math.log(prob);
    }
    if (score > bestScore) { bestScore = score; bestClass = cls; }
  }
  return bestClass;
}`
  }),

  NeuralNetworkBackpropagationAlgo: withSteps({
    title: "Neural Network Backpropagation",
    description:
      "Backpropagation trains neural nets by propagating output loss gradients backward through layers.",
    intuition:
      "Use chain rule to compute each weight's contribution to error, then update by gradient descent.",
    complexity: "Per batch O(total weights)",
    useCase: "Supervised learning for differentiable models",
    stepLabels: ["Forward Pass", "Compute Loss", "Backward Gradients", "Update Weights"],
    stepDetails: [
      "Calculate activations layer-by-layer.",
      "Measure prediction error.",
      "Propagate delta terms backward.",
      "Apply learning rate to weight gradients."
    ],
    stepMetrics: ["a2: 0.71", "loss: 0.18", "dw1: -0.03", "lr: 0.01"],
    code: `function trainStep(x, y, w1, w2, lr) {
  const h = sigmoid(dot(x, w1));
  const yHat = sigmoid(dot(h, w2));
  const dLoss = yHat - y;
  const dw2 = outer(h, dLoss * yHat * (1 - yHat));
  const dh = mul(w2, dLoss * yHat * (1 - yHat));
  const dw1 = outer(x, hadamard(dh, hadamard(h, sub(1, h))));
  w2 = sub(w2, scale(dw2, lr));
  w1 = sub(w1, scale(dw1, lr));
  return { w1, w2 };
}`
  }),

  PagerankAdvancedAlgo: withSteps({
    title: "PageRank (Power Iteration)",
    description:
      "PageRank estimates node importance from incoming links with damping for random jumps.",
    intuition:
      "Repeatedly multiply by transition matrix until rank vector converges.",
    complexity: "O(iterations * edges)",
    useCase: "Ranking web pages, citation graphs, influence networks",
    stepLabels: ["Initialize Ranks", "Distribute Rank", "Apply Damping", "Check Convergence"],
    stepDetails: [
      "Start with uniform probability for each node.",
      "Send node rank equally across outgoing links.",
      "Blend teleport probability (1-d)/N.",
      "Stop when rank delta is below threshold."
    ],
    stepMetrics: ["N: 6", "d: 0.85", "delta: 0.004", "iter: 18"],
    code: `function pageRank(graph, d = 0.85, maxIter = 100, eps = 1e-6) {
  const nodes = Object.keys(graph);
  const n = nodes.length;
  let rank = Object.fromEntries(nodes.map((u) => [u, 1 / n]));
  for (let iter = 0; iter < maxIter; iter += 1) {
    const next = Object.fromEntries(nodes.map((u) => [u, (1 - d) / n]));
    for (const u of nodes) for (const v of graph[u]) next[v] += d * (rank[u] / graph[u].length);
    const delta = nodes.reduce((acc, u) => acc + Math.abs(next[u] - rank[u]), 0);
    rank = next;
    if (delta < eps) break;
  }
  return rank;
}`
  }),

  PcaAlgo: withSteps({
    title: "Principal Component Analysis (PCA)",
    description:
      "PCA reduces dimensionality by projecting data onto directions of maximum variance.",
    intuition:
      "Center data, compute covariance, then keep top eigenvectors as principal components.",
    complexity: "Covariance O(nd^2), decomposition O(d^3)",
    useCase: "Feature compression and visualization",
    stepLabels: ["Center Data", "Covariance Matrix", "Eigen Decompose", "Project Samples"],
    stepDetails: [
      "Subtract mean from each feature.",
      "Compute covariance between all feature pairs.",
      "Sort eigenvectors by eigenvalue.",
      "Multiply centered data by top k vectors."
    ],
    stepMetrics: ["mean removed", "cov size: 4x4", "PC1 var: 62%", "k: 2"],
    code: `function pcaProject(X, components) {
  const n = X.length;
  const d = X[0].length;
  const mean = Array(d).fill(0);
  for (const row of X) for (let j = 0; j < d; j += 1) mean[j] += row[j] / n;
  const centered = X.map((row) => row.map((v, j) => v - mean[j]));
  return centered.map((row) =>
    components.map((pc) => row.reduce((acc, v, j) => acc + v * pc[j], 0))
  );
}`
  }),

  RabinKarpHashingAlgo: withSteps({
    title: "Rabin-Karp (Rolling Hash)",
    description:
      "Rabin-Karp uses rolling hash values to quickly find candidate substring matches.",
    intuition:
      "Update hash in O(1) when sliding the window; verify characters only on hash hits.",
    complexity: "Average O(n + m), Worst O(nm) with collisions",
    useCase: "Multiple pattern checks and plagiarism scanners",
    stepLabels: ["Hash Pattern", "Hash Window", "Slide Window", "Verify Match"],
    stepDetails: [
      "Precompute pattern hash and high-order multiplier.",
      "Hash first text window.",
      "Remove left char and add right char to update hash.",
      "Compare strings only when hashes are equal."
    ],
    stepMetrics: ["pat hash: 97", "win hash: 84", "next hash: 97", "hit @ 11"],
    code: `function rabinKarp(text, pattern) {
  const base = 257;
  const mod = 1_000_000_007;
  let pat = 0, win = 0, high = 1;
  for (let i = 0; i < pattern.length; i += 1) {
    pat = (pat * base + pattern.charCodeAt(i)) % mod;
    win = (win * base + text.charCodeAt(i)) % mod;
    if (i) high = (high * base) % mod;
  }
  const hits = [];
  for (let i = 0; i <= text.length - pattern.length; i += 1) {
    if (pat === win && text.slice(i, i + pattern.length) === pattern) hits.push(i);
    if (i < text.length - pattern.length) {
      win = (win - text.charCodeAt(i) * high) % mod;
      win = (win * base + text.charCodeAt(i + pattern.length)) % mod;
      if (win < 0) win += mod;
    }
  }
  return hits;
}`
  }),

  RandomForestAlgo: withSteps({
    title: "Random Forest",
    description:
      "Random forest combines many decision trees trained on random samples and random feature subsets.",
    intuition:
      "Bagging and feature randomness reduce variance and improve generalization.",
    complexity: "Train roughly O(numTrees * treeCost)",
    useCase: "Robust tabular classification/regression",
    stepLabels: ["Bootstrap Sample", "Train Tree", "Aggregate Votes", "Return Prediction"],
    stepDetails: [
      "Sample rows with replacement for each tree.",
      "Split each node on random feature subset.",
      "Collect outputs across all trees.",
      "Use majority vote (or mean for regression)."
    ],
    stepMetrics: ["trees: 100", "mtry: sqrt(d)", "votes: 64/36", "class: 1"],
    code: `function randomForestPredict(trees, row) {
  const votes = new Map();
  for (const tree of trees) {
    const label = tree.predict(row);
    votes.set(label, (votes.get(label) ?? 0) + 1);
  }
  let best = null;
  for (const [label, count] of votes.entries()) if (!best || count > best.count) best = { label, count };
  return best.label;
}`
  }),

  RatInAMazeAlgo: withSteps({
    title: "Rat in a Maze",
    description:
      "This backtracking problem finds a path from start to finish in a blocked grid.",
    intuition:
      "Move through valid cells recursively and mark visited to avoid cycles.",
    complexity: "O(4^(n*m)) worst case",
    useCase: "Path existence in constrained grids",
    stepLabels: ["Start Cell", "Try Moves", "Mark Path", "Backtrack Dead End"],
    stepDetails: [
      "Begin at top-left cell.",
      "Explore allowed directions (down/right/up/left).",
      "Mark current cell in solution path.",
      "Unmark when route cannot reach target."
    ],
    stepMetrics: ["pos: (0,0)", "options: 2", "path len: 6", "dead-end: 1"],
    code: `function solveMaze(grid) {
  const n = grid.length;
  const path = Array.from({ length: n }, () => Array(n).fill(0));
  const dfs = (r, c) => {
    if (r === n - 1 && c === n - 1 && grid[r][c] === 1) { path[r][c] = 1; return true; }
    if (r < 0 || c < 0 || r >= n || c >= n || grid[r][c] === 0 || path[r][c] === 1) return false;
    path[r][c] = 1;
    if (dfs(r + 1, c) || dfs(r, c + 1) || dfs(r - 1, c) || dfs(r, c - 1)) return true;
    path[r][c] = 0;
    return false;
  };
  return dfs(0, 0) ? path : null;
}`
  }),

  RungeKuttaAlgo: withSteps({
    title: "Runge-Kutta (RK4)",
    description:
      "RK4 numerically solves ordinary differential equations with high accuracy per step.",
    intuition:
      "Blend four slope estimates across the interval to reduce local truncation error.",
    complexity: "O(steps)",
    useCase: "Physics simulation and continuous system modeling",
    stepLabels: ["k1 Slope", "k2 Midpoint", "k3 Midpoint", "k4 Endpoint"],
    stepDetails: [
      "Evaluate derivative at current state.",
      "Evaluate using half-step with k1.",
      "Evaluate half-step with k2.",
      "Evaluate at full step using k3 and combine weighted average."
    ],
    stepMetrics: ["k1: 1.2", "k2: 1.1", "k3: 1.05", "k4: 0.98"],
    code: `function rk4Step(f, t, y, h) {
  const k1 = f(t, y);
  const k2 = f(t + h / 2, y + (h * k1) / 2);
  const k3 = f(t + h / 2, y + (h * k2) / 2);
  const k4 = f(t + h, y + h * k3);
  return y + (h / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
}`
  }),

  SimpsonsRuleAlgo: withSteps({
    title: "Simpson's Rule",
    description:
      "Simpson's Rule approximates definite integrals using quadratic interpolation over subintervals.",
    intuition:
      "Weight odd/even sample points as 4 and 2, then scale by h/3.",
    complexity: "O(n)",
    useCase: "Numerical integration of smooth functions",
    stepLabels: ["Choose Even n", "Sample f(x)", "Apply Weights", "Scale Result"],
    stepDetails: [
      "Split interval into even number of slices.",
      "Evaluate function at each node.",
      "Accumulate endpoints + 4*odd + 2*even terms.",
      "Multiply total by h/3."
    ],
    stepMetrics: ["n: 10", "h: 0.2", "weighted sum: 9.8", "integral: 0.653"],
    code: `function simpsonIntegral(f, a, b, n) {
  if (n % 2 !== 0) throw new Error("n must be even");
  const h = (b - a) / n;
  let sum = f(a) + f(b);
  for (let i = 1; i < n; i += 1) {
    const x = a + i * h;
    sum += (i % 2 === 0 ? 2 : 4) * f(x);
  }
  return (h / 3) * sum;
}`
  }),

  SpfaAlgorithmAlgo: withSteps({
    title: "SPFA (Shortest Path Faster Algorithm)",
    description:
      "SPFA is a queue-optimized Bellman-Ford variant for single-source shortest paths with possible negative edges.",
    intuition:
      "Only relax vertices that were recently improved, often reducing unnecessary relaxations.",
    complexity: "Average near O(E), worst O(VE)",
    useCase: "Sparse graphs with occasional negative weights",
    stepLabels: ["Init Distances", "Pop Queue", "Relax Edges", "Requeue Improved"],
    stepDetails: [
      "Set source distance to 0 and enqueue source.",
      "Process active vertex from queue.",
      "Update neighbors if shorter path found.",
      "Push neighbor back into queue when its distance improves."
    ],
    stepMetrics: ["queue: [s]", "u: 3", "relaxed: 4", "queued: 2"],
    code: `function spfa(graph, source) {
  const dist = Array(graph.length).fill(Infinity);
  const inQueue = Array(graph.length).fill(false);
  const q = [source];
  dist[source] = 0; inQueue[source] = true;
  while (q.length) {
    const u = q.shift();
    inQueue[u] = false;
    for (const [v, w] of graph[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        if (!inQueue[v]) { q.push(v); inQueue[v] = true; }
      }
    }
  }
  return dist;
}`
  }),

  SudokuSolverBacktrackingAlgo: withSteps({
    title: "Sudoku Solver (Backtracking)",
    description:
      "Backtracking solves Sudoku by filling empty cells with legal digits and undoing on contradiction.",
    intuition:
      "Choose next empty cell, test digits 1-9 with row/column/box checks, recurse until solved.",
    complexity: "Exponential worst case",
    useCase: "Constraint satisfaction with pruning",
    stepLabels: ["Find Empty Cell", "Try Digit", "Validate Constraints", "Backtrack if Needed"],
    stepDetails: [
      "Select next zero cell.",
      "Attempt candidate digit from 1..9.",
      "Check row, column, and 3x3 box.",
      "Clear cell and continue search if branch fails."
    ],
    stepMetrics: ["cell: (4,6)", "digit: 7", "valid: true", "undos: 3"],
    code: `function solveSudoku(board) {
  const find = () => {
    for (let r = 0; r < 9; r += 1) for (let c = 0; c < 9; c += 1) if (board[r][c] === 0) return [r, c];
    return null;
  };
  const ok = (r, c, val) => {
    for (let i = 0; i < 9; i += 1) if (board[r][i] === val || board[i][c] === val) return false;
    const br = Math.floor(r / 3) * 3, bc = Math.floor(c / 3) * 3;
    for (let i = br; i < br + 3; i += 1) for (let j = bc; j < bc + 3; j += 1) if (board[i][j] === val) return false;
    return true;
  };
  const pos = find();
  if (!pos) return true;
  const [r, c] = pos;
  for (let val = 1; val <= 9; val += 1) if (ok(r, c, val)) { board[r][c] = val; if (solveSudoku(board)) return true; board[r][c] = 0; }
  return false;
}`
  }),

  SvmAlgo: withSteps({
    title: "Support Vector Machine (Linear)",
    description:
      "Linear SVM finds a maximum-margin separating hyperplane between classes.",
    intuition:
      "Optimize hinge-loss objective; support vectors define the margin boundaries.",
    complexity: "Depends on solver, often O(samples * features * epochs)",
    useCase: "High-dimensional classification",
    stepLabels: ["Initialize Weights", "Compute Margin", "Hinge Loss Update", "Converge"],
    stepDetails: [
      "Start w and b near zero.",
      "Evaluate y*(w·x + b).",
      "Update only when margin < 1.",
      "Iterate until objective stabilizes."
    ],
    stepMetrics: ["||w||: 0.91", "margin: 0.74", "update: yes", "epoch: 22"],
    code: `function svmEpoch(samples, labels, w, b, lr, lambda) {
  for (let i = 0; i < samples.length; i += 1) {
    const x = samples[i];
    const y = labels[i];
    const margin = y * (dot(w, x) + b);
    if (margin >= 1) {
      w = w.map((wj) => wj - lr * (2 * lambda * wj));
    } else {
      w = w.map((wj, j) => wj - lr * (2 * lambda * wj - y * x[j]));
      b += lr * y;
    }
  }
  return { w, b };
}`
  }),

  TarjanSccAlgo: withSteps({
    title: "Tarjan SCC",
    description:
      "Tarjan's algorithm finds strongly connected components in one DFS pass.",
    intuition:
      "Track discovery index and low-link values on a stack; low==index marks SCC root.",
    complexity: "O(V + E)",
    useCase: "Dependency cycle detection and graph condensation",
    stepLabels: ["DFS Visit", "Push Stack", "Update Low-Link", "Pop SCC"],
    stepDetails: [
      "Assign discovery index to node.",
      "Mark node active in stack.",
      "Propagate min reachable index.",
      "Pop component when root detected."
    ],
    stepMetrics: ["idx: 5", "stack size: 4", "low[u]: 2", "SCC: {D,E,F}"],
    code: `function tarjan(adj) {
  let idx = 0;
  const index = {}, low = {}, st = [], inSt = new Set(), sccs = [];
  const dfs = (u) => {
    index[u] = low[u] = idx += 1;
    st.push(u); inSt.add(u);
    for (const v of adj[u]) {
      if (index[v] === undefined) { dfs(v); low[u] = Math.min(low[u], low[v]); }
      else if (inSt.has(v)) low[u] = Math.min(low[u], index[v]);
    }
    if (low[u] === index[u]) {
      const comp = [];
      while (true) { const w = st.pop(); inSt.delete(w); comp.push(w); if (w === u) break; }
      sccs.push(comp);
    }
  };
  Object.keys(adj).forEach((u) => index[u] === undefined && dfs(u));
  return sccs;
}`
  }),

  UkkonenSuffixTreeAlgo: withSteps({
    title: "Ukkonen Suffix Tree",
    description:
      "Ukkonen builds suffix trees online in linear time by maintaining an active point and suffix links.",
    intuition:
      "Each phase extends all pending suffixes implicitly and uses suffix links to avoid repeated work.",
    complexity: "O(n)",
    useCase: "Fast substring queries and repeated pattern analytics",
    stepLabels: ["Extend Phase", "Walk Active Point", "Split Edge", "Follow Suffix Link"],
    stepDetails: [
      "Add next character to implicit tree.",
      "Skip/count down edges when active length is large.",
      "Create internal node on mismatch.",
      "Jump across internal nodes via suffix links."
    ],
    stepMetrics: ["phase: 8", "activeLen: 3", "splits: 2", "remainder: 1"],
    code: `function extendSuffixTree(state, ch) {
  state.end += 1;
  state.remainder += 1;
  let lastInternal = null;
  while (state.remainder > 0) {
    if (state.activeLength === 0) state.activeEdge = ch;
    if (!state.hasEdge(state.activeNode, state.activeEdge)) {
      state.addLeaf(state.activeNode, ch);
      if (lastInternal) state.suffixLink(lastInternal, state.activeNode);
    } else {
      if (state.walkDown()) continue;
      if (state.nextChar() === ch) { state.activeLength += 1; break; }
      const split = state.splitEdge(ch);
      if (lastInternal) state.suffixLink(lastInternal, split);
      lastInternal = split;
    }
    state.remainder -= 1;
    state.followActiveSuffix();
  }
}`
  }),

  VoronoiDiagramsAlgo: withSteps({
    title: "Voronoi Diagrams",
    description:
      "A Voronoi diagram partitions space into cells where each cell contains points nearest to one site.",
    intuition:
      "Cell boundaries are perpendicular bisectors between neighboring sites.",
    complexity: "With Fortune: O(n log n)",
    useCase: "Territory partitioning, nearest-service maps",
    stepLabels: ["Input Sites", "Find Neighbors", "Build Bisectors", "Assemble Cells"],
    stepDetails: [
      "Load all generator points.",
      "Determine site adjacency relationships.",
      "Compute boundary lines equidistant to site pairs.",
      "Clip boundaries into polygon cells."
    ],
    stepMetrics: ["sites: 12", "edges: 27", "vertices: 18", "cells: 12"],
    code: `function bisector(a, b) {
  const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return {
    point: mid,
    direction: { x: -dy, y: dx }
  };
}

function distanceSq(p, q) {
  const x = p.x - q.x;
  const y = p.y - q.y;
  return x * x + y * y;
}`
  }),

  WordBreakDpAlgo: withSteps({
    title: "Word Break (DP)",
    description:
      "Word Break decides whether a string can be segmented into dictionary words.",
    intuition:
      "dp[i] is true if some prior split j is valid and s[j..i) exists in dictionary.",
    complexity: "O(n^2)",
    useCase: "Tokenization and dictionary-based parsing",
    stepLabels: ["Initialize DP", "Try Split j", "Lookup Word", "Mark Reachable"],
    stepDetails: [
      "Set dp[0] = true for empty prefix.",
      "For each i, scan earlier cut positions.",
      "Check if substring is in dictionary set.",
      "Set dp[i] true once any valid split is found."
    ],
    stepMetrics: ["i: 9", "j: 5", "word: 'code'", "dp[9]=true"],
    code: `function wordBreak(s, dictionary) {
  const dict = new Set(dictionary);
  const dp = Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i += 1) {
    for (let j = 0; j < i; j += 1) {
      if (dp[j] && dict.has(s.slice(j, i))) { dp[i] = true; break; }
    }
  }
  return dp[s.length];
}`
  }),

  ZAlgorithmAdvancedAlgo: withSteps({
    title: "Z Algorithm (Advanced)",
    description:
      "The Z algorithm computes longest prefix matches for every position in linear time.",
    intuition:
      "Reuse a running [L,R] window of known prefix matches to avoid redundant comparisons.",
    complexity: "O(n)",
    useCase: "Pattern matching, border/prefix analytics",
    stepLabels: ["Init Window", "Inside Window", "Explicit Expand", "Update [L,R]"],
    stepDetails: [
      "Start with empty matching window.",
      "If i <= R, seed Z[i] from mirror position.",
      "Extend Z[i] by direct character comparisons.",
      "Shift window when i + Z[i] exceeds R."
    ],
    stepMetrics: ["L,R: 5,11", "i: 8", "Z[i]=3", "new R: 12"],
    code: `function zArray(s) {
  const z = Array(s.length).fill(0);
  let L = 0, R = 0;
  for (let i = 1; i < s.length; i += 1) {
    if (i <= R) z[i] = Math.min(R - i + 1, z[i - L]);
    while (i + z[i] < s.length && s[z[i]] === s[i + z[i]]) z[i] += 1;
    if (i + z[i] - 1 > R) { L = i; R = i + z[i] - 1; }
  }
  return z;
}`
  })
};

export const tenXOrder = [
  "AhoCorasickAlgo",
  "AlphaBetaPruningAlgo",
  "BoyerMooreAlgo",
  "ConvexHullAlgo",
  "DecisionTreeAlgo",
  "EggDroppingPuzzleAlgo",
  "FortuneAlgorithmAlgo",
  "GeneticAlgorithmAlgo",
  "GrahamScanAlgo",
  "HamiltonianPathBacktrackingAlgo",
  "JarvisMarchAlgo",
  "KmpAdvancedAlgo",
  "LineIntersectionAlgo",
  "ManachersAdvancedAlgo",
  "MinimaxAlgo",
  "NQueensBacktrackingAlgo",
  "NaiveBayesAlgo",
  "NeuralNetworkBackpropagationAlgo",
  "PagerankAdvancedAlgo",
  "PcaAlgo",
  "RabinKarpHashingAlgo",
  "RandomForestAlgo",
  "RatInAMazeAlgo",
  "RungeKuttaAlgo",
  "SimpsonsRuleAlgo",
  "SpfaAlgorithmAlgo",
  "SudokuSolverBacktrackingAlgo",
  "SvmAlgo",
  "TarjanSccAlgo",
  "UkkonenSuffixTreeAlgo",
  "VoronoiDiagramsAlgo",
  "WordBreakDpAlgo",
  "ZAlgorithmAdvancedAlgo"
];
