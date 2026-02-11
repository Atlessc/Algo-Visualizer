import { useEffect, useMemo, useState } from "react";
import BinarySearchAlgo from "../components/1_Beginner_Algos/BinarySearchAlgo";
import BubbleSortAlgo from "../components/1_Beginner_Algos/BubbleSortAlgo";
import CountingSortAlgo from "../components/1_Beginner_Algos/CountingSortAlgo";
import EuclideanAlgorithmAlgo from "../components/1_Beginner_Algos/EuclideanAlgorithmAlgo";
import FibonacciSequenceIterativeAlgo from "../components/1_Beginner_Algos/FibonacciSequenceIterativeAlgo";
import GcdLcmAlgo from "../components/1_Beginner_Algos/GcdLcmAlgo";
import InsertionSortAlgo from "../components/1_Beginner_Algos/InsertionSortAlgo";
import LinearSearchAlgo from "../components/1_Beginner_Algos/LinearSearchAlgo";
import RodCuttingAlgo from "../components/1_Beginner_Algos/RodCuttingAlgo";
import SelectionSortAlgo from "../components/1_Beginner_Algos/SelectionSortAlgo";
import BfsAlgo from "../components/2_Intermediate_Algos/BfsAlgo";
import DijkstraAlgorithmAlgo from "../components/2_Intermediate_Algos/DijkstraAlgorithmAlgo";
import EditDistanceAlgo from "../components/2_Intermediate_Algos/EditDistanceAlgo";
import FloydWarshallAlgo from "../components/2_Intermediate_Algos/FloydWarshallAlgo";
import HamiltonianPathAlgo from "../components/2_Intermediate_Algos/HamiltonianPathAlgo";
import HeapSortAlgo from "../components/2_Intermediate_Algos/HeapSortAlgo";
import JobSequencingAlgo from "../components/2_Intermediate_Algos/JobSequencingAlgo";
import KmpAlgorithmAlgo from "../components/2_Intermediate_Algos/KmpAlgorithmAlgo";
import KnightsTourAlgo from "../components/2_Intermediate_Algos/KnightsTourAlgo";
import KnapsackAlgo from "../components/2_Intermediate_Algos/KnapsackAlgo";
import LevenshteinDistanceAlgo from "../components/2_Intermediate_Algos/LevenshteinDistanceAlgo";
import LongestCommonSubsequenceAlgo from "../components/2_Intermediate_Algos/LongestCommonSubsequenceAlgo";
import MatrixChainMultiplicationAlgo from "../components/2_Intermediate_Algos/MatrixChainMultiplicationAlgo";
import ModularExponentiationAlgo from "../components/2_Intermediate_Algos/ModularExponentiationAlgo";
import NQueensAlgo from "../components/2_Intermediate_Algos/NQueensAlgo";
import RabinKarpAlgorithmAlgo from "../components/2_Intermediate_Algos/RabinKarpAlgorithmAlgo";
import SudokuSolverAlgo from "../components/2_Intermediate_Algos/SudokuSolverAlgo";
import SuffixTreeConstructionAlgo from "../components/2_Intermediate_Algos/SuffixTreeConstructionAlgo";
import TrieOperationsAlgo from "../components/2_Intermediate_Algos/TrieOperationsAlgo";
import ZAlgorithmAlgo from "../components/2_Intermediate_Algos/ZAlgorithmAlgo";
import AvlTreeRotationsAlgo from "../components/3_Advanced_Algos/AvlTreeRotationsAlgo";
import ChineseRemainderTheoremAlgo from "../components/3_Advanced_Algos/ChineseRemainderTheoremAlgo";
import CombinationSumAlgo from "../components/3_Advanced_Algos/CombinationSumAlgo";
import DijkstraPriorityQueueAlgo from "../components/3_Advanced_Algos/DijkstraPriorityQueueAlgo";
import FenwickTreeAlgo from "../components/3_Advanced_Algos/FenwickTreeAlgo";
import FermatsTheoremAlgo from "../components/3_Advanced_Algos/FermatsTheoremAlgo";
import JohnsonsAlgorithmAlgo from "../components/3_Advanced_Algos/JohnsonsAlgorithmAlgo";
import KMeansClusteringAlgo from "../components/3_Advanced_Algos/KMeansClusteringAlgo";
import KaratsubaAlgorithmAlgo from "../components/3_Advanced_Algos/KaratsubaAlgorithmAlgo";
import KruskalDisjointSetAlgo from "../components/3_Advanced_Algos/KruskalDisjointSetAlgo";
import LowestCommonAncestorAlgo from "../components/3_Advanced_Algos/LowestCommonAncestorAlgo";
import LongestIncreasingSubsequenceAlgo from "../components/3_Advanced_Algos/LongestIncreasingSubsequenceAlgo";
import ManachersAlgorithmAlgo from "../components/3_Advanced_Algos/ManachersAlgorithmAlgo";
import MillerRabinAlgo from "../components/3_Advanced_Algos/MillerRabinAlgo";
import MinimumSpanningTreeAlgo from "../components/3_Advanced_Algos/MinimumSpanningTreeAlgo";
import KosarajuAlgorithmAlgo from "../components/3_Advanced_Algos/KosarajuAlgorithmAlgo";
import PagerankAlgorithmAlgo from "../components/3_Advanced_Algos/PagerankAlgorithmAlgo";
import PermutationGenerationAlgo from "../components/3_Advanced_Algos/PermutationGenerationAlgo";
import RedBlackTreeAlgo from "../components/3_Advanced_Algos/RedBlackTreeAlgo";
import SegmentTreeAlgo from "../components/3_Advanced_Algos/SegmentTreeAlgo";
import SieveOfEratosthenesAlgo from "../components/3_Advanced_Algos/SieveOfEratosthenesAlgo";
import SplayTreeAlgo from "../components/3_Advanced_Algos/SplayTreeAlgo";
import SubsetSumAlgo from "../components/3_Advanced_Algos/SubsetSumAlgo";
import SuffixArrayConstructionAlgo from "../components/3_Advanced_Algos/SuffixArrayConstructionAlgo";
import TarjanAlgorithmAlgo from "../components/3_Advanced_Algos/TarjanAlgorithmAlgo";
import IntervalSchedulingMaximizationAlgo from "../components/3_Advanced_Algos/IntervalSchedulingMaximizationAlgo";
import FftAlgo from "../components/3_Advanced_Algos/FftAlgo";
import AhoCorasickAlgo from "../components/4_10x_Dev_Algos/AhoCorasickAlgo";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
// import AlphaBetaPruningAlgo from "../components/4_10x_Dev_Algos/AlphaBetaPruningAlgo";
// import BoyerMooreAlgo from "../components/4_10x_Dev_Algos/BoyerMooreAlgo";
// import ConvexHullAlgo from "../components/4_10x_Dev_Algos/ConvexHullAlgo";
// import DecisionTreeAlgo from "../components/4_10x_Dev_Algos/DecisionTreeAlgo";
// import EggDroppingPuzzleAlgo from "../components/4_10x_Dev_Algos/EggDroppingPuzzleAlgo";
// import FortuneAlgorithmAlgo from "../components/4_10x_Dev_Algos/FortuneAlgorithmAlgo";
// import GeneticAlgorithmAlgo from "../components/4_10x_Dev_Algos/GeneticAlgorithmAlgo";
// import GrahamScanAlgo from "../components/4_10x_Dev_Algos/GrahamScanAlgo";
// import HamiltonianPathBacktrackingAlgo from "../components/4_10x_Dev_Algos/HamiltonianPathBacktrackingAlgo";
// import JarvisMarchAlgo from "../components/4_10x_Dev_Algos/JarvisMarchAlgo";
// import KmpAdvancedAlgo from "../components/4_10x_Dev_Algos/KmpAdvancedAlgo";
// import LineIntersectionAlgo from "../components/4_10x_Dev_Algos/LineIntersectionAlgo";
// import ManachersAdvancedAlgo from "../components/4_10x_Dev_Algos/ManachersAdvancedAlgo";
// import MinimaxAlgo from "../components/4_10x_Dev_Algos/MinimaxAlgo";
// import NQueensBacktrackingAlgo from "../components/4_10x_Dev_Algos/NQueensBacktrackingAlgo";
// import NaiveBayesAlgo from "../components/4_10x_Dev_Algos/NaiveBayesAlgo";
// import NeuralNetworkBackpropagationAlgo from "../components/4_10x_Dev_Algos/NeuralNetworkBackpropagationAlgo";
// import PagerankAdvancedAlgo from "../components/4_10x_Dev_Algos/PagerankAdvancedAlgo";
// import PcaAlgo from "../components/4_10x_Dev_Algos/PcaAlgo";
// import RabinKarpHashingAlgo from "../components/4_10x_Dev_Algos/RabinKarpHashingAlgo";
// import RandomForestAlgo from "../components/4_10x_Dev_Algos/RandomForestAlgo";
// import RatInAMazeAlgo from "../components/4_10x_Dev_Algos/RatInAMazeAlgo";
// import RungeKuttaAlgo from "../components/4_10x_Dev_Algos/RungeKuttaAlgo";
// import SimpsonsRuleAlgo from "../components/4_10x_Dev_Algos/SimpsonsRuleAlgo";
// import SpfaAlgorithmAlgo from "../components/4_10x_Dev_Algos/SpfaAlgorithmAlgo";
// import SudokuSolverBacktrackingAlgo from "../components/4_10x_Dev_Algos/SudokuSolverBacktrackingAlgo";
// import SvmAlgo from "../components/4_10x_Dev_Algos/SvmAlgo";
// import TarjanSccAlgo from "../components/4_10x_Dev_Algos/TarjanSccAlgo";
// import UkkonenSuffixTreeAlgo from "../components/4_10x_Dev_Algos/UkkonenSuffixTreeAlgo";
// import VoronoiDiagramsAlgo from "../components/4_10x_Dev_Algos/VoronoiDiagramsAlgo";
// import WordBreakDpAlgo from "../components/4_10x_Dev_Algos/WordBreakDpAlgo";
// import ZAlgorithmAdvancedAlgo from "../components/4_10x_Dev_Algos/ZAlgorithmAdvancedAlgo";

const PROJECT_FOLDERS = [
  "1_Beginner_Algos",
  "2_Intermediate_Algos",
  "3_Advanced_Algos",
  "4_10x_Dev_Algos",
];

const PROJECT_FOLDER_LABELS = {
  "1_Beginner_Algos": "Beginner Algorithms",
  "2_Intermediate_Algos": "Intermediate Algorithms",
  "3_Advanced_Algos": "Advanced Algorithms",
  "4_10x_Dev_Algos": "10x Dev Algorithms",
};

const Home = () => {
  const sections = useMemo(
    () => [
      {
        title: "Temporary Active Algorithms",
        folder: "temp_mobile_focus",
        items: [
          { id: "binary-search", label: "Binary Search", component: BinarySearchAlgo, tocFolder: "1_Beginner_Algos" },
          { id: "kmp", label: "KMP Algorithm", component: KmpAlgorithmAlgo, tocFolder: "2_Intermediate_Algos" },
          { id: "knapsack", label: "Knapsack Problem", component: KnapsackAlgo, tocFolder: "2_Intermediate_Algos" },
          { id: "minimum-spanning-tree", label: "Minimum Spanning Tree", component: MinimumSpanningTreeAlgo, tocFolder: "3_Advanced_Algos" },
          { id: "aho-corasick", label: "Aho-Corasick", component: AhoCorasickAlgo, tocFolder: "4_10x_Dev_Algos" },
        ],
      },
      {
        title: "Controlled Group 1 - Beginner",
        folder: "1_Beginner_Algos",
        items: [
          { id: "bubble-sort", label: "Bubble Sort", component: BubbleSortAlgo },
          { id: "counting-sort", label: "Counting Sort", component: CountingSortAlgo },
          { id: "euclidean-algorithm", label: "Euclidean Algorithm", component: EuclideanAlgorithmAlgo },
          {
            id: "fibonacci-sequence",
            label: "Fibonacci Sequence (Iterative)",
            component: FibonacciSequenceIterativeAlgo,
            props: { endOnValue: 200 },
          },
          { id: "gcd-lcm", label: "GCD and LCM", component: GcdLcmAlgo },
        ],
      },
      {
        title: "Controlled Group 2 - Beginner",
        folder: "1_Beginner_Algos",
        items: [
          { id: "insertion-sort", label: "Insertion Sort", component: InsertionSortAlgo },
          { id: "linear-search", label: "Linear Search", component: LinearSearchAlgo },
          { id: "rod-cutting", label: "Rod Cutting", component: RodCuttingAlgo },
          { id: "selection-sort", label: "Selection Sort", component: SelectionSortAlgo },
        ],
      },
      {
        title: "Controlled Group 3 - Intermediate",
        folder: "2_Intermediate_Algos",
        items: [
          { id: "bfs", label: "BFS", component: BfsAlgo },
          { id: "dijkstra", label: "Dijkstra's Algorithm", component: DijkstraAlgorithmAlgo },
          { id: "heap-sort", label: "Heap Sort", component: HeapSortAlgo },
          { id: "job-sequencing", label: "Job Sequencing", component: JobSequencingAlgo },
        ],
      },
      {
        title: "Controlled Group 4 - Intermediate",
        folder: "2_Intermediate_Algos",
        items: [
          { id: "edit-distance", label: "Edit Distance", component: EditDistanceAlgo },
          { id: "floyd-warshall", label: "Floyd-Warshall Algorithm", component: FloydWarshallAlgo },
          { id: "matrix-chain-multiplication", label: "Matrix Chain Multiplication", component: MatrixChainMultiplicationAlgo },
          { id: "modular-exponentiation", label: "Modular Exponentiation", component: ModularExponentiationAlgo },
        ],
      },
      {
        title: "Controlled Group 5 - Intermediate",
        folder: "2_Intermediate_Algos",
        items: [
          { id: "hamiltonian-path", label: "Hamiltonian Path", component: HamiltonianPathAlgo },
          { id: "knights-tour", label: "Knight's Tour", component: KnightsTourAlgo },
          { id: "levenshtein-distance", label: "Levenshtein Distance", component: LevenshteinDistanceAlgo },
          { id: "lcs", label: "Longest Common Subsequence", component: LongestCommonSubsequenceAlgo },
        ],
      },
      {
        title: "Controlled Group 6 - Intermediate",
        folder: "2_Intermediate_Algos",
        items: [
          { id: "n-queens", label: "N-Queens Problem", component: NQueensAlgo },
          { id: "rabin-karp", label: "Rabin-Karp Algorithm", component: RabinKarpAlgorithmAlgo },
          { id: "sudoku-solver", label: "Sudoku Solver", component: SudokuSolverAlgo },
          { id: "z-algorithm", label: "Z Algorithm", component: ZAlgorithmAlgo },
        ],
      },
      {
        title: "Controlled Group 7 - Intermediate",
        folder: "2_Intermediate_Algos",
        items: [
          { id: "suffix-tree-construction", label: "Suffix Tree Construction", component: SuffixTreeConstructionAlgo },
          { id: "trie-operations", label: "Trie Operations", component: TrieOperationsAlgo },
        ],
      },
      {
        title: "Controlled Group 8 - Advanced",
        folder: "3_Advanced_Algos",
        items: [
          { id: "interval-scheduling-max", label: "Interval Scheduling Maximization", component: IntervalSchedulingMaximizationAlgo },
          { id: "lis", label: "Longest Increasing Subsequence", component: LongestIncreasingSubsequenceAlgo },
          { id: "manachers-algorithm", label: "Manacher's Algorithm", component: ManachersAlgorithmAlgo },
          { id: "pagerank", label: "PageRank Algorithm", component: PagerankAlgorithmAlgo },
        ],
      },
      {
        title: "Controlled Group 9 - Advanced",
        folder: "3_Advanced_Algos",
        items: [
          { id: "fenwick-tree", label: "Fenwick Tree", component: FenwickTreeAlgo },
          { id: "segment-tree", label: "Segment Tree", component: SegmentTreeAlgo },
          { id: "subset-sum-advanced", label: "Subset Sum", component: SubsetSumAlgo },
          { id: "suffix-array-construction", label: "Suffix Array Construction", component: SuffixArrayConstructionAlgo },
        ],
      },
      {
        title: "Controlled Group 10 - Advanced",
        folder: "3_Advanced_Algos",
        items: [
          { id: "combination-sum", label: "Combination Sum", component: CombinationSumAlgo },
          { id: "dijkstra-priority-queue", label: "Dijkstra (Priority Queue)", component: DijkstraPriorityQueueAlgo },
          { id: "karatsuba", label: "Karatsuba Multiplication", component: KaratsubaAlgorithmAlgo },
          { id: "fermats-theorem", label: "Fermat's Little Theorem", component: FermatsTheoremAlgo },
        ],
      },
      {
        title: "Controlled Group 11 - Advanced",
        folder: "3_Advanced_Algos",
        items: [
          { id: "kruskal-disjoint-set", label: "Kruskal (Disjoint Set)", component: KruskalDisjointSetAlgo },
          { id: "kosaraju-algorithm", label: "Kosaraju's Algorithm", component: KosarajuAlgorithmAlgo },
          { id: "permutation-generation", label: "Permutation Generation", component: PermutationGenerationAlgo },
          { id: "tarjan-algorithm", label: "Tarjan's Algorithm", component: TarjanAlgorithmAlgo },
        ],
      },
      {
        title: "Controlled Group 12 - Advanced",
        folder: "3_Advanced_Algos",
        items: [
          { id: "crt", label: "Chinese Remainder Theorem", component: ChineseRemainderTheoremAlgo },
          { id: "lowest-common-ancestor", label: "Lowest Common Ancestor", component: LowestCommonAncestorAlgo },
          { id: "miller-rabin", label: "Miller-Rabin Primality Test", component: MillerRabinAlgo },
          { id: "sieve-of-eratosthenes", label: "Sieve of Eratosthenes", component: SieveOfEratosthenesAlgo },
        ],
      },
      {
        title: "Controlled Group 13 - Advanced",
        folder: "3_Advanced_Algos",
        items: [
          { id: "avl-tree-rotations", label: "AVL Tree Rotations", component: AvlTreeRotationsAlgo },
          { id: "k-means-clustering", label: "K-Means Clustering", component: KMeansClusteringAlgo },
          { id: "red-black-tree", label: "Red-Black Tree Operations", component: RedBlackTreeAlgo },
          { id: "splay-tree", label: "Splay Tree Operations", component: SplayTreeAlgo },
        ],
      },
      {
        title: "Controlled Group 14 - Advanced",
        folder: "3_Advanced_Algos",
        items: [
          { id: "johnsons-algorithm", label: "Johnson's Algorithm", component: JohnsonsAlgorithmAlgo },
          { id: "fft", label: "FFT (Fast Fourier Transform)", component: FftAlgo },
        ],
      },

      /*
      {
        title: "Beginner Algorithms",
        folder: "1_Beginner_Algos",
        items: [
          { id: "binary-search", label: "Binary Search", component: BinarySearchAlgo },
          { id: "bubble-sort", label: "Bubble Sort", component: BubbleSortAlgo },
          { id: "counting-sort", label: "Counting Sort", component: CountingSortAlgo },
          { id: "euclidean-algorithm", label: "Euclidean Algorithm", component: EuclideanAlgorithmAlgo },
          {
            id: "fibonacci-sequence",
            label: "Fibonacci Sequence (Iterative)",
            component: FibonacciSequenceIterativeAlgo,
            props: { endOnValue: 200 },
          },
          { id: "gcd-lcm", label: "GCD and LCM", component: GcdLcmAlgo },
          { id: "insertion-sort", label: "Insertion Sort", component: InsertionSortAlgo },
          { id: "linear-search", label: "Linear Search", component: LinearSearchAlgo },
          { id: "rod-cutting", label: "Rod Cutting", component: RodCuttingAlgo },
          { id: "selection-sort", label: "Selection Sort", component: SelectionSortAlgo },
        ],
      },
      {
        title: "Intermediate Algorithms",
        folder: "2_Intermediate_Algos",
        items: [
          { id: "bfs", label: "BFS", component: BfsAlgo },
          { id: "dijkstra", label: "Dijkstra's Algorithm", component: DijkstraAlgorithmAlgo },
          { id: "edit-distance", label: "Edit Distance", component: EditDistanceAlgo },
          { id: "floyd-warshall", label: "Floyd-Warshall Algorithm", component: FloydWarshallAlgo },
          { id: "hamiltonian-path", label: "Hamiltonian Path", component: HamiltonianPathAlgo },
          { id: "heap-sort", label: "Heap Sort", component: HeapSortAlgo },
          { id: "job-sequencing", label: "Job Sequencing", component: JobSequencingAlgo },
          { id: "kmp", label: "KMP Algorithm", component: KmpAlgorithmAlgo },
          { id: "knights-tour", label: "Knight's Tour", component: KnightsTourAlgo },
          { id: "knapsack", label: "Knapsack Problem", component: KnapsackAlgo },
          { id: "levenshtein-distance", label: "Levenshtein Distance", component: LevenshteinDistanceAlgo },
          { id: "lcs", label: "Longest Common Subsequence", component: LongestCommonSubsequenceAlgo },
          { id: "matrix-chain-multiplication", label: "Matrix Chain Multiplication", component: MatrixChainMultiplicationAlgo },
          { id: "modular-exponentiation", label: "Modular Exponentiation", component: ModularExponentiationAlgo },
          { id: "n-queens", label: "N-Queens Problem", component: NQueensAlgo },
          { id: "rabin-karp", label: "Rabin-Karp Algorithm", component: RabinKarpAlgorithmAlgo },
          { id: "sudoku-solver", label: "Sudoku Solver", component: SudokuSolverAlgo },
          { id: "suffix-tree-construction", label: "Suffix Tree Construction", component: SuffixTreeConstructionAlgo },
          { id: "trie-operations", label: "Trie Operations", component: TrieOperationsAlgo },
          { id: "z-algorithm", label: "Z Algorithm", component: ZAlgorithmAlgo },
        ],
      },
      {
        title: "Advanced Algorithms",
        folder: "3_Advanced_Algos",
        items: [
          { id: "suffix-array-construction", label: "Suffix Array Construction", component: SuffixArrayConstructionAlgo },
          { id: "avl-tree-rotations", label: "AVL Tree Rotations", component: AvlTreeRotationsAlgo },
          { id: "red-black-tree", label: "Red-Black Tree Operations", component: RedBlackTreeAlgo },
          { id: "kruskal-disjoint-set", label: "Kruskal (Disjoint Set)", component: KruskalDisjointSetAlgo },
          { id: "minimum-spanning-tree", label: "Minimum Spanning Tree", component: MinimumSpanningTreeAlgo },
          { id: "k-means-clustering", label: "K-Means Clustering", component: KMeansClusteringAlgo },
          { id: "pagerank", label: "PageRank Algorithm", component: PagerankAlgorithmAlgo },
          { id: "dijkstra-priority-queue", label: "Dijkstra (Priority Queue)", component: DijkstraPriorityQueueAlgo },
          { id: "fenwick-tree", label: "Fenwick Tree", component: FenwickTreeAlgo },
          { id: "segment-tree", label: "Segment Tree", component: SegmentTreeAlgo },
          { id: "crt", label: "Chinese Remainder Theorem", component: ChineseRemainderTheoremAlgo },
          { id: "miller-rabin", label: "Miller-Rabin Primality Test", component: MillerRabinAlgo },
          { id: "fermats-theorem", label: "Fermat's Little Theorem", component: FermatsTheoremAlgo },
          { id: "sieve-of-eratosthenes", label: "Sieve of Eratosthenes", component: SieveOfEratosthenesAlgo },
          { id: "lis", label: "Longest Increasing Subsequence", component: LongestIncreasingSubsequenceAlgo },
          { id: "manachers-algorithm", label: "Manacher's Algorithm", component: ManachersAlgorithmAlgo },
          { id: "kosaraju-algorithm", label: "Kosaraju's Algorithm", component: KosarajuAlgorithmAlgo },
          { id: "tarjan-algorithm", label: "Tarjan's Algorithm", component: TarjanAlgorithmAlgo },
          { id: "johnsons-algorithm", label: "Johnson's Algorithm", component: JohnsonsAlgorithmAlgo },
          { id: "combination-sum", label: "Combination Sum", component: CombinationSumAlgo },
          { id: "fft", label: "FFT (Fast Fourier Transform)", component: FftAlgo },
          { id: "interval-scheduling-max", label: "Interval Scheduling Maximization", component: IntervalSchedulingMaximizationAlgo },
          { id: "karatsuba", label: "Karatsuba Multiplication", component: KaratsubaAlgorithmAlgo },
          { id: "lowest-common-ancestor", label: "Lowest Common Ancestor", component: LowestCommonAncestorAlgo },
          { id: "permutation-generation", label: "Permutation Generation", component: PermutationGenerationAlgo },
          { id: "splay-tree", label: "Splay Tree Operations", component: SplayTreeAlgo },
          { id: "subset-sum-advanced", label: "Subset Sum", component: SubsetSumAlgo },
        ],
      },
      {
        title: "10x Dev Algorithms",
        folder: "4_10x_Dev_Algos",
        items: [
          { id: "aho-corasick", label: "Aho-Corasick", component: AhoCorasickAlgo },
          { id: "alpha-beta-pruning", label: "Alpha-Beta Pruning", component: AlphaBetaPruningAlgo },
          { id: "boyer-moore", label: "Boyer-Moore", component: BoyerMooreAlgo },
          { id: "convex-hull", label: "Convex Hull", component: ConvexHullAlgo },
          { id: "decision-tree", label: "Decision Tree", component: DecisionTreeAlgo },
          { id: "egg-dropping-puzzle", label: "Egg Dropping Puzzle", component: EggDroppingPuzzleAlgo },
          { id: "fortune-algorithm", label: "Fortune's Algorithm", component: FortuneAlgorithmAlgo },
          { id: "genetic-algorithm", label: "Genetic Algorithm", component: GeneticAlgorithmAlgo },
          { id: "graham-scan", label: "Graham Scan", component: GrahamScanAlgo },
          { id: "hamiltonian-path-backtracking", label: "Hamiltonian Path (Backtracking)", component: HamiltonianPathBacktrackingAlgo },
          { id: "jarvis-march", label: "Jarvis March", component: JarvisMarchAlgo },
          { id: "kmp-advanced", label: "KMP (Advanced)", component: KmpAdvancedAlgo },
          { id: "line-intersection", label: "Line Intersection", component: LineIntersectionAlgo },
          { id: "manachers-advanced", label: "Manacher's (Advanced)", component: ManachersAdvancedAlgo },
          { id: "minimax", label: "Minimax", component: MinimaxAlgo },
          { id: "n-queens-backtracking", label: "N-Queens (Backtracking)", component: NQueensBacktrackingAlgo },
          { id: "naive-bayes", label: "Naive Bayes", component: NaiveBayesAlgo },
          { id: "neural-network-backprop", label: "Neural Network Backpropagation", component: NeuralNetworkBackpropagationAlgo },
          { id: "pagerank-advanced", label: "PageRank (Advanced)", component: PagerankAdvancedAlgo },
          { id: "pca", label: "PCA", component: PcaAlgo },
          { id: "rabin-karp-hashing", label: "Rabin-Karp (Hashing)", component: RabinKarpHashingAlgo },
          { id: "random-forest", label: "Random Forest", component: RandomForestAlgo },
          { id: "rat-in-a-maze", label: "Rat in a Maze", component: RatInAMazeAlgo },
          { id: "runge-kutta", label: "Runge-Kutta", component: RungeKuttaAlgo },
          { id: "simpsons-rule", label: "Simpson's Rule", component: SimpsonsRuleAlgo },
          { id: "spfa", label: "SPFA Algorithm", component: SpfaAlgorithmAlgo },
          { id: "sudoku-solver-backtracking", label: "Sudoku Solver (Backtracking)", component: SudokuSolverBacktrackingAlgo },
          { id: "svm", label: "SVM", component: SvmAlgo },
          { id: "tarjan-scc", label: "Tarjan SCC", component: TarjanSccAlgo },
          { id: "ukkonen-suffix-tree", label: "Ukkonen Suffix Tree", component: UkkonenSuffixTreeAlgo },
          { id: "voronoi-diagrams", label: "Voronoi Diagrams", component: VoronoiDiagramsAlgo },
          { id: "word-break-dp", label: "Word Break (DP)", component: WordBreakDpAlgo },
          { id: "z-algorithm-advanced", label: "Z Algorithm (Advanced)", component: ZAlgorithmAdvancedAlgo },
        ],
      },
      */
    ],
    []
  );

  const allItems = useMemo(() => sections.flatMap((section) => section.items), [sections]);
  const tocGroups = useMemo(() => {
    const grouped = new Map(PROJECT_FOLDERS.map((folder) => [folder, []]));

    sections.forEach((section) => {
      section.items.forEach((item) => {
        const folderKey = item.tocFolder ?? section.folder;
        if (!grouped.has(folderKey)) return;

        const list = grouped.get(folderKey);
        if (!list.some((existing) => existing.id === item.id)) {
          list.push(item);
        }
      });
    });

    return PROJECT_FOLDERS
      .map((folder) => ({
        folder,
        title: PROJECT_FOLDER_LABELS[folder] ?? folder,
        items: grouped.get(folder) ?? [],
      }))
      .filter((group) => group.items.length > 0);
  }, [sections]);
  const allItemIds = useMemo(() => allItems.map((item) => item.id), [allItems]);
  const [activeId, setActiveId] = useState(allItems[0]?.id ?? "");
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 1080px)").matches : false
  );
  const [expandedIds, setExpandedIds] = useState(() =>
    new Set(allItems[0]?.id ? [allItems[0].id] : [])
  );

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const mediaQuery = window.matchMedia("(max-width: 1080px)");
    const onMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", onMediaQueryChange);
      return () => mediaQuery.removeEventListener("change", onMediaQueryChange);
    }

    mediaQuery.addListener(onMediaQueryChange);
    return () => mediaQuery.removeListener(onMediaQueryChange);
  }, []);

  useEffect(() => {
    setExpandedIds((prev) => {
      if (!isMobile) {
        return new Set(allItemIds);
      }

      const validIds = new Set(allItemIds);
      const next = new Set([...prev].filter((id) => validIds.has(id)));
      if (next.size === 0 && allItemIds[0]) {
        next.add(allItemIds[0]);
      }
      return next;
    });
  }, [allItemIds, isMobile]);

  useEffect(() => {
    let ticking = false;

    const getOffsetFromTop = () => {
      const nav = document.querySelector('[data-nav-root="true"]');
      const navTop = nav ? Number.parseFloat(window.getComputedStyle(nav).top || "0") || 0 : 0;
      const navHeight = nav ? nav.getBoundingClientRect().height : 0;
      return navHeight + navTop + 16;
    };

    const getCurrentInViewId = () => {
      const positions = allItems
        .map((item) => {
          const element = document.getElementById(item.id);
          if (!element) return null;
          return { id: item.id, top: element.getBoundingClientRect().top };
        })
        .filter(Boolean);

      if (positions.length === 0) return "";

      const offsetFromTop = getOffsetFromTop();
      const passed = positions.filter((position) => position.top <= offsetFromTop);
      if (passed.length > 0) {
        return passed[passed.length - 1].id;
      }
      return positions[0].id;
    };

    const updateActiveFromScroll = () => {
      const nextId = getCurrentInViewId();
      if (nextId) {
        setActiveId((prev) => (prev === nextId ? prev : nextId));
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateActiveFromScroll();
        ticking = false;
      });
    };

    const onHashChange = () => {
      const hashId = window.location.hash.replace("#", "");
      if (hashId) {
        setActiveId(hashId);
        setIsTocOpen(false);
        if (isMobile) {
          setExpandedIds((prev) => {
            if (prev.has(hashId)) return prev;
            const next = new Set(prev);
            next.add(hashId);
            return next;
          });
        }
      }
      updateActiveFromScroll();
    };

    onHashChange();
    updateActiveFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveFromScroll);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveFromScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [allItems, isMobile]);

  useEffect(() => {
    document.body.classList.toggle("toc-open", isTocOpen);
    return () => {
      document.body.classList.remove("toc-open");
    };
  }, [isTocOpen]);

  useEffect(() => {
    if (!isTocOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsTocOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isTocOpen]);

  const ensureExpanded = (id) => {
    if (!isMobile || !id) return;
    setExpandedIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const toggleMobileItem = (id) => {
    if (!isMobile || !id) return;
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleTocSelect = (id, closeDrawer = false) => {
    setActiveId(id);
    ensureExpanded(id);
    if (closeDrawer) {
      setIsTocOpen(false);
    }
  };

  const isItemExpanded = (id) => !isMobile || expandedIds.has(id);

  const renderTocGroups = (onItemSelect, isMobileNav = false) =>
    tocGroups.map((group) => (
      <div key={`toc-${group.folder}`} className="flex min-w-0 flex-col">
        <p
          className={cn(
            "mb-1 mt-2 text-[0.72rem] font-bold uppercase tracking-[0.04em] text-slate-500",
            isMobileNav && "mt-2.5"
          )}
        >
          {group.title}
        </p>
        {group.items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={cn(
              "block w-full break-words rounded-md px-2 py-1.5 text-left text-sm leading-tight transition-colors",
              activeId === item.id
                ? "bg-gradient-to-r from-sky-600 to-cyan-500 font-semibold text-white"
                : "text-slate-700 hover:bg-slate-200/70"
            )}
            aria-current={activeId === item.id ? "true" : undefined}
            onClick={onItemSelect ? () => onItemSelect(item.id) : undefined}
          >
            {item.label}
          </a>
        ))}
      </div>
    ));

  return (
    <div className="relative grid items-start gap-4 [grid-template-columns:clamp(176px,22vw,228px)_minmax(0,1fr)] max-[1240px]:[grid-template-columns:clamp(164px,24vw,204px)_minmax(0,1fr)] max-[1080px]:grid-cols-1">
      <aside className="sticky top-[5.2rem] min-w-0 max-h-[calc(100vh-6.5rem)] overflow-y-auto rounded-xl border border-slate-300/70 bg-white/80 p-3 shadow-lg backdrop-blur-sm max-[1080px]:hidden">
        <h3 className="mb-2 text-[0.92rem] font-semibold uppercase tracking-[0.03em] text-slate-600">
          Algorithms By Folder
        </h3>
        <nav aria-label="Algorithm table of contents" className="min-w-0">
          {renderTocGroups((id) => handleTocSelect(id))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-col gap-4">
        <Button
          className="mb-1 hidden w-fit max-w-full self-start max-[1080px]:inline-flex max-[420px]:w-full"
          onClick={() => setIsTocOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isTocOpen}
          aria-controls="mobile-toc-sidebar"
        >
          Browse Algorithms
        </Button>

        <section className="rounded-[18px] border border-slate-300/70 bg-gradient-to-b from-white/95 to-white/80 p-4 shadow-lg sm:p-5">
          <p className="m-0 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-blue-700">
            Algorithm Playground
          </p>
          <h2 className="mb-1 mt-1 text-[clamp(1.2rem,2vw,1.8rem)] font-semibold leading-tight text-slate-900">
            Visualize how classic algorithms work step-by-step.
          </h2>
          <p className="m-0.5 text-slate-600">
            Explore searching, sorting, graph traversal, and dynamic programming with interactive
            animations.
          </p>
        </section>

        {sections.map((section) => (
          <section className="flex min-w-0 flex-col gap-2" key={section.title}>
            <h3 className="m-0 mt-1 text-[1.1rem] font-semibold text-slate-900 max-[700px]:text-[1.03rem]">
              {section.title}
            </h3>
            <p className="m-0 mb-1 text-[0.84rem] font-semibold text-slate-500">
              Folder: {section.folder}
            </p>
            {section.items.map((item) => {
              const AlgoComponent = item.component;
              const expanded = isItemExpanded(item.id);
              const runtimeProps = {
                ...(item.props ?? {}),
                compact: isMobile,
                autoPlay: !isMobile,
              };

              return (
                <article id={item.id} key={item.id} className="algo-anchor-target min-w-0 scroll-mt-[5.8rem]">
                  {isMobile ? (
                    <div className="mb-2 flex min-w-0 items-center justify-between gap-3">
                      <h4 className="m-0 min-w-0 flex-1 break-words text-[0.98rem] font-semibold leading-tight text-slate-900">
                        {item.label}
                      </h4>
                      <Button
                        variant="outline"
                        size="sm"
                        className="shrink-0 whitespace-nowrap border-slate-300 bg-slate-200 text-slate-900 hover:bg-slate-300"
                        onClick={() => toggleMobileItem(item.id)}
                        aria-expanded={expanded}
                      >
                        {expanded ? "Hide Visualizer" : "Load Visualizer"}
                      </Button>
                    </div>
                  ) : null}

                  {expanded ? (
                    <AlgoComponent {...runtimeProps} />
                  ) : (
                    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/90 px-3 py-3 text-sm text-slate-600">
                      Visualizer is collapsed on mobile to keep scrolling smooth. Tap
                      &quot;Load Visualizer&quot; to render it.
                    </div>
                  )}
                </article>
              );
            })}
          </section>
        ))}
      </div>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-900/50 transition-opacity duration-200 min-[1081px]:hidden",
          isTocOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setIsTocOpen(false)}
        aria-hidden={isTocOpen ? "false" : "true"}
      />
      <aside
        id="mobile-toc-sidebar"
        className={cn(
          "fixed right-0 top-0 z-50 flex h-dvh w-[min(92vw,360px)] flex-col border-l border-slate-300/70 bg-white p-3 shadow-2xl transition-transform duration-200 min-[1081px]:hidden max-[700px]:w-[min(96vw,360px)] max-[520px]:w-full",
          isTocOpen ? "translate-x-0" : "translate-x-[102%]"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Algorithm navigation"
      >
        <div className="mb-2 flex items-center justify-between gap-3 border-b border-slate-300/70 pb-2">
          <h3 className="m-0 text-sm font-semibold uppercase tracking-[0.03em] text-slate-700">
            Algorithms
          </h3>
          <Button variant="secondary" size="sm" onClick={() => setIsTocOpen(false)}>
            Close
          </Button>
        </div>
        <nav aria-label="Algorithm table of contents" className="overflow-y-auto pr-1">
          {renderTocGroups((id) => handleTocSelect(id, true), true)}
        </nav>
      </aside>
    </div>
  );
}

export default Home;
