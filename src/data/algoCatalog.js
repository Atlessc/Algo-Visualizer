export const PROJECT_FOLDERS = [
  "1_Beginner_Algos",
  "2_Intermediate_Algos",
  "3_Advanced_Algos",
  "4_10x_Dev_Algos",
];

export const PROJECT_FOLDER_LABELS = {
  "1_Beginner_Algos": "Beginner Algorithms",
  "2_Intermediate_Algos": "Intermediate Algorithms",
  "3_Advanced_Algos": "Advanced Algorithms",
  "4_10x_Dev_Algos": "10x Dev Algorithms",
};

export const ALGO_COMPONENT_LOADERS = {
  "binary-search": () => import("../components/1_Beginner_Algos/BinarySearchAlgo.jsx"),
  "bubble-sort": () => import("../components/1_Beginner_Algos/BubbleSortAlgo.jsx"),
  "counting-sort": () => import("../components/1_Beginner_Algos/CountingSortAlgo.jsx"),
  "euclidean-algorithm": () => import("../components/1_Beginner_Algos/EuclideanAlgorithmAlgo.jsx"),
  "fibonacci-sequence": () => import("../components/1_Beginner_Algos/FibonacciSequenceIterativeAlgo.jsx"),
  "gcd-lcm": () => import("../components/1_Beginner_Algos/GcdLcmAlgo.jsx"),
  "insertion-sort": () => import("../components/1_Beginner_Algos/InsertionSortAlgo.jsx"),
  "linear-search": () => import("../components/1_Beginner_Algos/LinearSearchAlgo.jsx"),
  "rod-cutting": () => import("../components/1_Beginner_Algos/RodCuttingAlgo.jsx"),
  "selection-sort": () => import("../components/1_Beginner_Algos/SelectionSortAlgo.jsx"),
  "a-star-search": () => import("../components/2_Intermediate_Algos/AStarSearchAlgo.jsx"),
  "activity-selection": () => import("../components/2_Intermediate_Algos/ActivitySelectionAlgo.jsx"),
  "bellman-ford": () => import("../components/2_Intermediate_Algos/BellmanFordAlgo.jsx"),
  bfs: () => import("../components/2_Intermediate_Algos/BfsAlgo.jsx"),
  "binary-search-tree": () => import("../components/2_Intermediate_Algos/BinarySearchTreeAlgo.jsx"),
  "coin-change": () => import("../components/2_Intermediate_Algos/CoinChangeAlgo.jsx"),
  dfs: () => import("../components/2_Intermediate_Algos/DfsAlgo.jsx"),
  dijkstra: () => import("../components/2_Intermediate_Algos/DijkstraAlgorithmAlgo.jsx"),
  "edit-distance": () => import("../components/2_Intermediate_Algos/EditDistanceAlgo.jsx"),
  "floyd-warshall": () => import("../components/2_Intermediate_Algos/FloydWarshallAlgo.jsx"),
  "hamiltonian-path": () => import("../components/2_Intermediate_Algos/HamiltonianPathAlgo.jsx"),
  "heap-sort": () => import("../components/2_Intermediate_Algos/HeapSortAlgo.jsx"),
  "job-sequencing": () => import("../components/2_Intermediate_Algos/JobSequencingAlgo.jsx"),
  kmp: () => import("../components/2_Intermediate_Algos/KmpAlgorithmAlgo.jsx"),
  "knights-tour": () => import("../components/2_Intermediate_Algos/KnightsTourAlgo.jsx"),
  knapsack: () => import("../components/2_Intermediate_Algos/KnapsackAlgo.jsx"),
  "kruskal-algorithm": () => import("../components/2_Intermediate_Algos/KruskalAlgorithmAlgo.jsx"),
  "levenshtein-distance": () => import("../components/2_Intermediate_Algos/LevenshteinDistanceAlgo.jsx"),
  lcs: () => import("../components/2_Intermediate_Algos/LongestCommonSubsequenceAlgo.jsx"),
  "matrix-chain-multiplication": () => import("../components/2_Intermediate_Algos/MatrixChainMultiplicationAlgo.jsx"),
  "merge-sort": () => import("../components/2_Intermediate_Algos/MergeSortAlgo.jsx"),
  "modular-exponentiation": () => import("../components/2_Intermediate_Algos/ModularExponentiationAlgo.jsx"),
  "n-queens": () => import("../components/2_Intermediate_Algos/NQueensAlgo.jsx"),
  "prim-algorithm": () => import("../components/2_Intermediate_Algos/PrimAlgorithmAlgo.jsx"),
  "quick-sort": () => import("../components/2_Intermediate_Algos/QuickSortAlgo.jsx"),
  "rabin-karp": () => import("../components/2_Intermediate_Algos/RabinKarpAlgorithmAlgo.jsx"),
  "sudoku-solver": () => import("../components/2_Intermediate_Algos/SudokuSolverAlgo.jsx"),
  "suffix-tree-construction": () => import("../components/2_Intermediate_Algos/SuffixTreeConstructionAlgo.jsx"),
  "trie-operations": () => import("../components/2_Intermediate_Algos/TrieOperationsAlgo.jsx"),
  "z-algorithm": () => import("../components/2_Intermediate_Algos/ZAlgorithmAlgo.jsx"),
  "minimum-spanning-tree": () => import("../components/3_Advanced_Algos/MinimumSpanningTreeAlgo.jsx"),
  "interval-scheduling-max": () => import("../components/3_Advanced_Algos/IntervalSchedulingMaximizationAlgo.jsx"),
  lis: () => import("../components/3_Advanced_Algos/LongestIncreasingSubsequenceAlgo.jsx"),
  "manachers-algorithm": () => import("../components/3_Advanced_Algos/ManachersAlgorithmAlgo.jsx"),
  pagerank: () => import("../components/3_Advanced_Algos/PagerankAlgorithmAlgo.jsx"),
  "fenwick-tree": () => import("../components/3_Advanced_Algos/FenwickTreeAlgo.jsx"),
  "segment-tree": () => import("../components/3_Advanced_Algos/SegmentTreeAlgo.jsx"),
  "subset-sum-advanced": () => import("../components/3_Advanced_Algos/SubsetSumAlgo.jsx"),
  "suffix-array-construction": () => import("../components/3_Advanced_Algos/SuffixArrayConstructionAlgo.jsx"),
  "combination-sum": () => import("../components/3_Advanced_Algos/CombinationSumAlgo.jsx"),
  "dijkstra-priority-queue": () => import("../components/3_Advanced_Algos/DijkstraPriorityQueueAlgo.jsx"),
  karatsuba: () => import("../components/3_Advanced_Algos/KaratsubaAlgorithmAlgo.jsx"),
  "fermats-theorem": () => import("../components/3_Advanced_Algos/FermatsTheoremAlgo.jsx"),
  "kruskal-disjoint-set": () => import("../components/3_Advanced_Algos/KruskalDisjointSetAlgo.jsx"),
  "kosaraju-algorithm": () => import("../components/3_Advanced_Algos/KosarajuAlgorithmAlgo.jsx"),
  "permutation-generation": () => import("../components/3_Advanced_Algos/PermutationGenerationAlgo.jsx"),
  "tarjan-algorithm": () => import("../components/3_Advanced_Algos/TarjanAlgorithmAlgo.jsx"),
  crt: () => import("../components/3_Advanced_Algos/ChineseRemainderTheoremAlgo.jsx"),
  "lowest-common-ancestor": () => import("../components/3_Advanced_Algos/LowestCommonAncestorAlgo.jsx"),
  "miller-rabin": () => import("../components/3_Advanced_Algos/MillerRabinAlgo.jsx"),
  "sieve-of-eratosthenes": () => import("../components/3_Advanced_Algos/SieveOfEratosthenesAlgo.jsx"),
  "avl-tree-rotations": () => import("../components/3_Advanced_Algos/AvlTreeRotationsAlgo.jsx"),
  "k-means-clustering": () => import("../components/3_Advanced_Algos/KMeansClusteringAlgo.jsx"),
  "red-black-tree": () => import("../components/3_Advanced_Algos/RedBlackTreeAlgo.jsx"),
  "splay-tree": () => import("../components/3_Advanced_Algos/SplayTreeAlgo.jsx"),
  "johnsons-algorithm": () => import("../components/3_Advanced_Algos/JohnsonsAlgorithmAlgo.jsx"),
  fft: () => import("../components/3_Advanced_Algos/FftAlgo.jsx"),
  "aho-corasick": () => import("../components/4_10x_Dev_Algos/AhoCorasickAlgo.jsx"),
  "alpha-beta-pruning": () => import("../components/4_10x_Dev_Algos/AlphaBetaPruningAlgo.jsx"),
  "boyer-moore": () => import("../components/4_10x_Dev_Algos/BoyerMooreAlgo.jsx"),
  "convex-hull": () => import("../components/4_10x_Dev_Algos/ConvexHullAlgo.jsx"),
  "decision-tree": () => import("../components/4_10x_Dev_Algos/DecisionTreeAlgo.jsx"),
  "egg-dropping-puzzle": () => import("../components/4_10x_Dev_Algos/EggDroppingPuzzleAlgo.jsx"),
  "fortune-algorithm": () => import("../components/4_10x_Dev_Algos/FortuneAlgorithmAlgo.jsx"),
  "genetic-algorithm": () => import("../components/4_10x_Dev_Algos/GeneticAlgorithmAlgo.jsx"),
  "graham-scan": () => import("../components/4_10x_Dev_Algos/GrahamScanAlgo.jsx"),
  "hamiltonian-path-backtracking": () => import("../components/4_10x_Dev_Algos/HamiltonianPathBacktrackingAlgo.jsx"),
  "jarvis-march": () => import("../components/4_10x_Dev_Algos/JarvisMarchAlgo.jsx"),
  "kmp-advanced": () => import("../components/4_10x_Dev_Algos/KmpAdvancedAlgo.jsx"),
  "line-intersection": () => import("../components/4_10x_Dev_Algos/LineIntersectionAlgo.jsx"),
  "manachers-advanced": () => import("../components/4_10x_Dev_Algos/ManachersAdvancedAlgo.jsx"),
  minimax: () => import("../components/4_10x_Dev_Algos/MinimaxAlgo.jsx"),
  "n-queens-backtracking": () => import("../components/4_10x_Dev_Algos/NQueensBacktrackingAlgo.jsx"),
  "naive-bayes": () => import("../components/4_10x_Dev_Algos/NaiveBayesAlgo.jsx"),
  "neural-network-backpropagation": () => import("../components/4_10x_Dev_Algos/NeuralNetworkBackpropagationAlgo.jsx"),
  "pagerank-advanced": () => import("../components/4_10x_Dev_Algos/PagerankAdvancedAlgo.jsx"),
  pca: () => import("../components/4_10x_Dev_Algos/PcaAlgo.jsx"),
  "rabin-karp-hashing": () => import("../components/4_10x_Dev_Algos/RabinKarpHashingAlgo.jsx"),
  "random-forest": () => import("../components/4_10x_Dev_Algos/RandomForestAlgo.jsx"),
  "rat-in-a-maze": () => import("../components/4_10x_Dev_Algos/RatInAMazeAlgo.jsx"),
  "runge-kutta": () => import("../components/4_10x_Dev_Algos/RungeKuttaAlgo.jsx"),
  "simpsons-rule": () => import("../components/4_10x_Dev_Algos/SimpsonsRuleAlgo.jsx"),
  "spfa-algorithm": () => import("../components/4_10x_Dev_Algos/SpfaAlgorithmAlgo.jsx"),
  "sudoku-solver-backtracking": () => import("../components/4_10x_Dev_Algos/SudokuSolverBacktrackingAlgo.jsx"),
  svm: () => import("../components/4_10x_Dev_Algos/SvmAlgo.jsx"),
  "tarjan-scc": () => import("../components/4_10x_Dev_Algos/TarjanSccAlgo.jsx"),
  "ukkonen-suffix-tree": () => import("../components/4_10x_Dev_Algos/UkkonenSuffixTreeAlgo.jsx"),
  "voronoi-diagrams": () => import("../components/4_10x_Dev_Algos/VoronoiDiagramsAlgo.jsx"),
  "word-break-dp": () => import("../components/4_10x_Dev_Algos/WordBreakDpAlgo.jsx"),
  "z-algorithm-advanced": () => import("../components/4_10x_Dev_Algos/ZAlgorithmAdvancedAlgo.jsx"),
};

const BASE_ALGO_SECTIONS = [
  {
    folder: "1_Beginner_Algos",
    title: PROJECT_FOLDER_LABELS["1_Beginner_Algos"],
    items: [
      { id: "binary-search", label: "Binary Search" },
      { id: "bubble-sort", label: "Bubble Sort" },
      { id: "counting-sort", label: "Counting Sort" },
      { id: "euclidean-algorithm", label: "Euclidean Algorithm" },
      {
        id: "fibonacci-sequence",
        label: "Fibonacci Sequence (Iterative)",
        props: { endOnValue: 200 },
      },
      { id: "gcd-lcm", label: "GCD and LCM" },
      { id: "insertion-sort", label: "Insertion Sort" },
      { id: "linear-search", label: "Linear Search" },
      { id: "rod-cutting", label: "Rod Cutting" },
      { id: "selection-sort", label: "Selection Sort" },
    ],
  },
  {
    folder: "2_Intermediate_Algos",
    title: PROJECT_FOLDER_LABELS["2_Intermediate_Algos"],
    items: [
      { id: "a-star-search", label: "A* Search" },
      { id: "activity-selection", label: "Activity Selection" },
      { id: "bellman-ford", label: "Bellman-Ford Algorithm" },
      { id: "bfs", label: "BFS" },
      { id: "binary-search-tree", label: "Binary Search Tree" },
      { id: "coin-change", label: "Coin Change" },
      { id: "dfs", label: "DFS" },
      { id: "dijkstra", label: "Dijkstra's Algorithm" },
      { id: "edit-distance", label: "Edit Distance" },
      { id: "floyd-warshall", label: "Floyd-Warshall Algorithm" },
      { id: "hamiltonian-path", label: "Hamiltonian Path" },
      { id: "heap-sort", label: "Heap Sort" },
      { id: "job-sequencing", label: "Job Sequencing" },
      { id: "kmp", label: "KMP Algorithm" },
      { id: "knights-tour", label: "Knight's Tour" },
      { id: "knapsack", label: "Knapsack Problem" },
      { id: "kruskal-algorithm", label: "Kruskal's Algorithm" },
      { id: "levenshtein-distance", label: "Levenshtein Distance" },
      { id: "lcs", label: "Longest Common Subsequence" },
      { id: "matrix-chain-multiplication", label: "Matrix Chain Multiplication" },
      { id: "merge-sort", label: "Merge Sort" },
      { id: "modular-exponentiation", label: "Modular Exponentiation" },
      { id: "n-queens", label: "N-Queens Problem" },
      { id: "prim-algorithm", label: "Prim's Algorithm" },
      { id: "quick-sort", label: "Quick Sort" },
      { id: "rabin-karp", label: "Rabin-Karp Algorithm" },
      { id: "sudoku-solver", label: "Sudoku Solver", props: { autoPlayOnMobile: true } },
      { id: "suffix-tree-construction", label: "Suffix Tree Construction" },
      { id: "trie-operations", label: "Trie Operations" },
      { id: "z-algorithm", label: "Z Algorithm" },
    ],
  },
  {
    folder: "3_Advanced_Algos",
    title: PROJECT_FOLDER_LABELS["3_Advanced_Algos"],
    items: [
      { id: "minimum-spanning-tree", label: "Minimum Spanning Tree" },
      { id: "interval-scheduling-max", label: "Interval Scheduling Maximization" },
      { id: "lis", label: "Longest Increasing Subsequence" },
      { id: "manachers-algorithm", label: "Manacher's Algorithm" },
      { id: "pagerank", label: "PageRank Algorithm" },
      { id: "fenwick-tree", label: "Fenwick Tree" },
      { id: "segment-tree", label: "Segment Tree" },
      { id: "subset-sum-advanced", label: "Subset Sum" },
      { id: "suffix-array-construction", label: "Suffix Array Construction" },
      { id: "combination-sum", label: "Combination Sum" },
      { id: "dijkstra-priority-queue", label: "Dijkstra (Priority Queue)" },
      { id: "karatsuba", label: "Karatsuba Multiplication" },
      { id: "fermats-theorem", label: "Fermat's Little Theorem" },
      { id: "kruskal-disjoint-set", label: "Kruskal (Disjoint Set)" },
      { id: "kosaraju-algorithm", label: "Kosaraju's Algorithm" },
      { id: "permutation-generation", label: "Permutation Generation" },
      { id: "tarjan-algorithm", label: "Tarjan's Algorithm" },
      { id: "crt", label: "Chinese Remainder Theorem" },
      { id: "lowest-common-ancestor", label: "Lowest Common Ancestor" },
      { id: "miller-rabin", label: "Miller-Rabin Primality Test" },
      { id: "sieve-of-eratosthenes", label: "Sieve of Eratosthenes" },
      { id: "avl-tree-rotations", label: "AVL Tree Rotations" },
      { id: "k-means-clustering", label: "K-Means Clustering" },
      { id: "red-black-tree", label: "Red-Black Tree Operations" },
      { id: "splay-tree", label: "Splay Tree Operations" },
      { id: "johnsons-algorithm", label: "Johnson's Algorithm" },
      { id: "fft", label: "FFT (Fast Fourier Transform)" },
    ],
  },
  {
    folder: "4_10x_Dev_Algos",
    title: PROJECT_FOLDER_LABELS["4_10x_Dev_Algos"],
    items: [
      { id: "aho-corasick", label: "Aho-Corasick" },
      { id: "alpha-beta-pruning", label: "Alpha-Beta Pruning" },
      { id: "boyer-moore", label: "Boyer-Moore" },
      { id: "convex-hull", label: "Convex Hull" },
      { id: "decision-tree", label: "Decision Tree" },
      { id: "egg-dropping-puzzle", label: "Egg Dropping Puzzle" },
      { id: "fortune-algorithm", label: "Fortune's Algorithm" },
      { id: "genetic-algorithm", label: "Genetic Algorithm" },
      { id: "graham-scan", label: "Graham Scan" },
      { id: "hamiltonian-path-backtracking", label: "Hamiltonian Path (Backtracking)" },
      { id: "jarvis-march", label: "Jarvis March" },
      { id: "kmp-advanced", label: "KMP (Advanced)" },
      { id: "line-intersection", label: "Line Intersection" },
      { id: "manachers-advanced", label: "Manacher's (Advanced)" },
      { id: "minimax", label: "Minimax" },
      { id: "n-queens-backtracking", label: "N-Queens (Backtracking)" },
      { id: "naive-bayes", label: "Naive Bayes" },
      { id: "neural-network-backpropagation", label: "Neural Network Backpropagation" },
      { id: "pagerank-advanced", label: "PageRank (Advanced)" },
      { id: "pca", label: "PCA" },
      { id: "rabin-karp-hashing", label: "Rabin-Karp (Hashing)" },
      { id: "random-forest", label: "Random Forest" },
      { id: "rat-in-a-maze", label: "Rat in a Maze" },
      { id: "runge-kutta", label: "Runge-Kutta" },
      { id: "simpsons-rule", label: "Simpson's Rule" },
      { id: "spfa-algorithm", label: "SPFA Algorithm" },
      { id: "sudoku-solver-backtracking", label: "Sudoku Solver (Backtracking)" },
      { id: "svm", label: "SVM" },
      { id: "tarjan-scc", label: "Tarjan SCC" },
      { id: "ukkonen-suffix-tree", label: "Ukkonen's Suffix Tree" },
      { id: "voronoi-diagrams", label: "Voronoi Diagrams" },
      { id: "word-break-dp", label: "Word Break (DP)" },
      { id: "z-algorithm-advanced", label: "Z Algorithm (Advanced)" },
    ],
  },
];

const FOLDER_DIFFICULTY = {
  "1_Beginner_Algos": "Beginner",
  "2_Intermediate_Algos": "Intermediate",
  "3_Advanced_Algos": "Advanced",
  "4_10x_Dev_Algos": "Expert",
};

export const DIFFICULTY_ORDER = ["Beginner", "Intermediate", "Advanced", "Expert"];

const DIFFICULTY_RANK = DIFFICULTY_ORDER.reduce((acc, level, index) => {
  acc[level] = index;
  return acc;
}, {});

const ALGO_METADATA_OVERRIDES = {
  "binary-search": { topic: "Searching", dataStructure: "Array", timeComplexity: "O(log n)", runtimeRank: 2, popularity: 95 },
  "bubble-sort": { topic: "Sorting", dataStructure: "Array", timeComplexity: "O(n^2)", runtimeRank: 7, popularity: 74 },
  "counting-sort": { topic: "Sorting", dataStructure: "Array", timeComplexity: "O(n + k)", runtimeRank: 3, popularity: 62 },
  "euclidean-algorithm": { topic: "Number Theory", dataStructure: "Integers", timeComplexity: "O(log n)", runtimeRank: 2, popularity: 73 },
  "fibonacci-sequence": { topic: "Dynamic Programming", dataStructure: "Sequence", timeComplexity: "O(n)", runtimeRank: 4, popularity: 82 },
  "gcd-lcm": { topic: "Number Theory", dataStructure: "Integers", timeComplexity: "O(log n)", runtimeRank: 2, popularity: 76 },
  "insertion-sort": { topic: "Sorting", dataStructure: "Array", timeComplexity: "O(n^2)", runtimeRank: 7, popularity: 79 },
  "linear-search": { topic: "Searching", dataStructure: "Array", timeComplexity: "O(n)", runtimeRank: 4, popularity: 80 },
  "rod-cutting": { topic: "Dynamic Programming", dataStructure: "Array", timeComplexity: "O(n^2)", runtimeRank: 7, popularity: 58 },
  "selection-sort": { topic: "Sorting", dataStructure: "Array", timeComplexity: "O(n^2)", runtimeRank: 7, popularity: 70 },
  bfs: { topic: "Graphs", dataStructure: "Graph + Queue", timeComplexity: "O(V + E)", runtimeRank: 5, popularity: 96 },
  dijkstra: { topic: "Graphs", dataStructure: "Graph + Priority Queue", timeComplexity: "O((V + E) log V)", runtimeRank: 6, popularity: 98 },
  "edit-distance": { topic: "Dynamic Programming", dataStructure: "Matrix", timeComplexity: "O(m * n)", runtimeRank: 7, popularity: 86 },
  "floyd-warshall": { topic: "Graphs", dataStructure: "Matrix", timeComplexity: "O(V^3)", runtimeRank: 9, popularity: 77 },
  "hamiltonian-path": { topic: "Graphs", dataStructure: "Graph", timeComplexity: "O(V!)", runtimeRank: 12, popularity: 67 },
  "heap-sort": { topic: "Sorting", dataStructure: "Heap", timeComplexity: "O(n log n)", runtimeRank: 5, popularity: 83 },
  "job-sequencing": { topic: "Greedy", dataStructure: "Array", timeComplexity: "O(n log n)", runtimeRank: 5, popularity: 65 },
  kmp: { topic: "Strings", dataStructure: "Prefix Table", timeComplexity: "O(n + m)", runtimeRank: 4, popularity: 89 },
  "knights-tour": { topic: "Backtracking", dataStructure: "Matrix", timeComplexity: "Exponential", runtimeRank: 12, popularity: 59 },
  knapsack: { topic: "Dynamic Programming", dataStructure: "Matrix", timeComplexity: "O(n * W)", runtimeRank: 8, popularity: 92 },
  "levenshtein-distance": { topic: "Dynamic Programming", dataStructure: "Matrix", timeComplexity: "O(m * n)", runtimeRank: 7, popularity: 81 },
  lcs: { topic: "Dynamic Programming", dataStructure: "Matrix", timeComplexity: "O(m * n)", runtimeRank: 7, popularity: 84 },
  "matrix-chain-multiplication": { topic: "Dynamic Programming", dataStructure: "Matrix", timeComplexity: "O(n^3)", runtimeRank: 9, popularity: 63 },
  "modular-exponentiation": { topic: "Number Theory", dataStructure: "Integers", timeComplexity: "O(log n)", runtimeRank: 2, popularity: 71 },
  "n-queens": { topic: "Backtracking", dataStructure: "Matrix", timeComplexity: "Exponential", runtimeRank: 12, popularity: 85 },
  "rabin-karp": { topic: "Strings", dataStructure: "Rolling Hash", timeComplexity: "O(n + m) average", runtimeRank: 4, popularity: 79 },
  "sudoku-solver": { topic: "Backtracking", dataStructure: "Grid", timeComplexity: "Exponential", runtimeRank: 12, popularity: 88 },
  "suffix-tree-construction": { topic: "Strings", dataStructure: "Suffix Tree", timeComplexity: "O(n)", runtimeRank: 4, popularity: 55 },
  "trie-operations": { topic: "Strings", dataStructure: "Trie", timeComplexity: "O(L)", runtimeRank: 3, popularity: 75 },
  "z-algorithm": { topic: "Strings", dataStructure: "Array", timeComplexity: "O(n)", runtimeRank: 4, popularity: 68 },
  "minimum-spanning-tree": { topic: "Graphs", dataStructure: "Graph", timeComplexity: "O(E log V)", runtimeRank: 6, popularity: 90 },
  "interval-scheduling-max": { topic: "Greedy", dataStructure: "Array", timeComplexity: "O(n log n)", runtimeRank: 5, popularity: 64 },
  lis: { topic: "Dynamic Programming", dataStructure: "Array", timeComplexity: "O(n log n)", runtimeRank: 5, popularity: 87 },
  "manachers-algorithm": { topic: "Strings", dataStructure: "Array", timeComplexity: "O(n)", runtimeRank: 4, popularity: 61 },
  pagerank: { topic: "Graphs", dataStructure: "Graph", timeComplexity: "Iterative", runtimeRank: 8, popularity: 73 },
  "fenwick-tree": { topic: "Data Structures", dataStructure: "Fenwick Tree", timeComplexity: "O(log n)", runtimeRank: 2, popularity: 72 },
  "segment-tree": { topic: "Data Structures", dataStructure: "Segment Tree", timeComplexity: "O(log n)", runtimeRank: 2, popularity: 86 },
  "subset-sum-advanced": { topic: "Dynamic Programming", dataStructure: "Set + Array", timeComplexity: "Pseudo-polynomial", runtimeRank: 8, popularity: 66 },
  "suffix-array-construction": { topic: "Strings", dataStructure: "Array", timeComplexity: "O(n log n)", runtimeRank: 5, popularity: 58 },
  "combination-sum": { topic: "Backtracking", dataStructure: "Array", timeComplexity: "Exponential", runtimeRank: 11, popularity: 70 },
  "dijkstra-priority-queue": { topic: "Graphs", dataStructure: "Graph + Priority Queue", timeComplexity: "O((V + E) log V)", runtimeRank: 6, popularity: 88 },
  karatsuba: { topic: "Divide and Conquer", dataStructure: "Numbers", timeComplexity: "O(n^1.585)", runtimeRank: 6, popularity: 62 },
  "fermats-theorem": { topic: "Number Theory", dataStructure: "Integers", timeComplexity: "O(log p)", runtimeRank: 2, popularity: 57 },
  "kruskal-disjoint-set": { topic: "Graphs", dataStructure: "Disjoint Set", timeComplexity: "O(E log E)", runtimeRank: 6, popularity: 82 },
  "kosaraju-algorithm": { topic: "Graphs", dataStructure: "Graph", timeComplexity: "O(V + E)", runtimeRank: 5, popularity: 69 },
  "permutation-generation": { topic: "Backtracking", dataStructure: "Array", timeComplexity: "O(n * n!)", runtimeRank: 12, popularity: 63 },
  "tarjan-algorithm": { topic: "Graphs", dataStructure: "Graph + Stack", timeComplexity: "O(V + E)", runtimeRank: 5, popularity: 71 },
  crt: { topic: "Number Theory", dataStructure: "Integers", timeComplexity: "O(k log M)", runtimeRank: 5, popularity: 56 },
  "lowest-common-ancestor": { topic: "Trees", dataStructure: "Tree", timeComplexity: "O(log n) query", runtimeRank: 2, popularity: 84 },
  "miller-rabin": { topic: "Number Theory", dataStructure: "Integers", timeComplexity: "Probabilistic", runtimeRank: 6, popularity: 65 },
  "sieve-of-eratosthenes": { topic: "Number Theory", dataStructure: "Array", timeComplexity: "O(n log log n)", runtimeRank: 4, popularity: 78 },
  "avl-tree-rotations": { topic: "Trees", dataStructure: "AVL Tree", timeComplexity: "O(log n)", runtimeRank: 2, popularity: 67 },
  "k-means-clustering": { topic: "Machine Learning", dataStructure: "Point Set", timeComplexity: "Iterative", runtimeRank: 8, popularity: 74 },
  "red-black-tree": { topic: "Trees", dataStructure: "Red-Black Tree", timeComplexity: "O(log n)", runtimeRank: 2, popularity: 76 },
  "splay-tree": { topic: "Trees", dataStructure: "Splay Tree", timeComplexity: "Amortized O(log n)", runtimeRank: 2, popularity: 60 },
  "johnsons-algorithm": { topic: "Graphs", dataStructure: "Graph", timeComplexity: "O(V^2 log V + V E)", runtimeRank: 9, popularity: 52 },
  fft: { topic: "Divide and Conquer", dataStructure: "Array", timeComplexity: "O(n log n)", runtimeRank: 5, popularity: 79 },
  "aho-corasick": { topic: "Strings", dataStructure: "Trie + Automaton", timeComplexity: "O(n + m + z)", runtimeRank: 4, popularity: 68 },
};

function enrichItem(section, item, sectionItemIndex, globalIndex) {
  const difficulty = FOLDER_DIFFICULTY[section.folder] ?? "Intermediate";
  const difficultyRank = DIFFICULTY_RANK[difficulty] ?? DIFFICULTY_ORDER.length;
  const metadata = ALGO_METADATA_OVERRIDES[item.id] ?? {};

  return {
    ...item,
    slug: item.id,
    folder: section.folder,
    folderLabel: section.title,
    difficulty,
    difficultyRank,
    topic: metadata.topic ?? "General",
    dataStructure: metadata.dataStructure ?? "General",
    timeComplexity: metadata.timeComplexity ?? "Varies",
    runtimeRank: metadata.runtimeRank ?? 99,
    popularity: metadata.popularity ?? 0,
    sectionItemIndex,
    globalIndex,
  };
}

export const ALGO_SECTIONS = BASE_ALGO_SECTIONS.map((section) => ({
  ...section,
  items: section.items.map((item, sectionItemIndex) => enrichItem(section, item, sectionItemIndex, 0)),
}));

const enrichedItems = ALGO_SECTIONS.flatMap((section) => section.items);

export const ALGO_ITEMS = enrichedItems.map((item, index) => ({
  ...item,
  globalIndex: index,
}));

export const ALGO_BY_SLUG = ALGO_ITEMS.reduce((acc, item) => {
  acc[item.slug] = item;
  return acc;
}, {});

export function getAlgoBySlug(slug) {
  if (!slug) return undefined;
  return ALGO_BY_SLUG[slug];
}

function uniqueSorted(values) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
}

export const ALGO_FILTER_OPTIONS = {
  topic: uniqueSorted(ALGO_ITEMS.map((item) => item.topic)),
  difficulty: DIFFICULTY_ORDER.filter((level) => ALGO_ITEMS.some((item) => item.difficulty === level)),
  timeComplexity: uniqueSorted(ALGO_ITEMS.map((item) => item.timeComplexity)),
  dataStructure: uniqueSorted(ALGO_ITEMS.map((item) => item.dataStructure)),
};

export const SORT_OPTIONS = [
  { value: "difficulty", label: "Beginner first" },
  { value: "popularity", label: "Most popular" },
  { value: "runtime", label: "Shortest runtime" },
  { value: "alphabetical", label: "A to Z" },
];

function compareLabel(a, b) {
  return a.label.localeCompare(b.label);
}

export function sortAlgorithms(items, sortKey = "difficulty") {
  const list = [...items];

  switch (sortKey) {
    case "popularity":
      return list.sort((a, b) => b.popularity - a.popularity || compareLabel(a, b));
    case "runtime":
      return list.sort(
        (a, b) => a.runtimeRank - b.runtimeRank || a.difficultyRank - b.difficultyRank || compareLabel(a, b)
      );
    case "alphabetical":
      return list.sort(compareLabel);
    case "difficulty":
    default:
      return list.sort(
        (a, b) => a.difficultyRank - b.difficultyRank || a.sectionItemIndex - b.sectionItemIndex || compareLabel(a, b)
      );
  }
}

export function filterAlgorithms(
  items,
  { query = "", topic = "all", difficulty = "all", timeComplexity = "all", dataStructure = "all" } = {}
) {
  const normalizedQuery = query.trim().toLowerCase();

  return items.filter((item) => {
    if (topic !== "all" && item.topic !== topic) return false;
    if (difficulty !== "all" && item.difficulty !== difficulty) return false;
    if (timeComplexity !== "all" && item.timeComplexity !== timeComplexity) return false;
    if (dataStructure !== "all" && item.dataStructure !== dataStructure) return false;

    if (!normalizedQuery) return true;

    return [item.label, item.id, item.topic, item.dataStructure, item.timeComplexity]
      .join(" ")
      .toLowerCase()
      .includes(normalizedQuery);
  });
}

export function groupAlgorithmsByFolder(items) {
  const ids = new Set(items.map((item) => item.id));

  return ALGO_SECTIONS.map((section) => ({
    folder: section.folder,
    title: section.title,
    items: section.items.filter((item) => ids.has(item.id)),
  })).filter((section) => section.items.length > 0);
}
