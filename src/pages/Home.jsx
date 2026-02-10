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
import KnapsackAlgo from "../components/2_Intermediate_Algos/KnapsackAlgo";

const Home = () => {
  const sections = useMemo(
    () => [
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
          { id: "knapsack", label: "Knapsack Problem", component: KnapsackAlgo },
        ],
      },
    ],
    []
  );

  const allItems = useMemo(() => sections.flatMap((section) => section.items), [sections]);
  const [activeId, setActiveId] = useState(allItems[0]?.id ?? "");

  useEffect(() => {
    const offsetFromTop = 140;
    let ticking = false;

    const getCurrentInViewId = () => {
      const positions = allItems
        .map((item) => {
          const element = document.getElementById(item.id);
          if (!element) return null;
          return { id: item.id, top: element.getBoundingClientRect().top };
        })
        .filter(Boolean);

      if (positions.length === 0) return "";

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
  }, [allItems]);

  return (
    <div className="home-with-toc">
      <aside className="toc-sidebar">
        <h3>Algorithms By Folder</h3>
        <nav aria-label="Algorithm table of contents">
          {sections.map((section) => (
            <div key={`toc-${section.folder}`} style={{ display: "flex", flexDirection: "column", }}>
              <p
                style={{
                  margin: "0.45rem 0 0.2rem",
                  fontSize: "0.74rem",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "#64748b",
                }}
              >
                {section.title}
              </p>
              {section.items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={activeId === item.id ? "active" : ""}
                  aria-current={activeId === item.id ? "true" : undefined}
                  onClick={() => setActiveId(item.id)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <div className="home-layout">
        <section className="hero-panel">
          <p className="hero-eyebrow">Algorithm Playground</p>
          <h2>Visualize how classic algorithms work step-by-step.</h2>
          <p>
            Explore searching, sorting, graph traversal, and dynamic programming with interactive
            animations.
          </p>
        </section>

        {sections.map((section) => (
          <section className="algo-section" key={section.title}>
            <h3>{section.title}</h3>
            <p
              style={{
                margin: "0 0 0.35rem",
                color: "#64748b",
                fontSize: "0.84rem",
                fontWeight: 600,
              }}
            >
              Folder: {section.folder}
            </p>
            {section.items.map((item) => {
              const AlgoComponent = item.component;
              return (
                <article id={item.id} key={item.id} className="algo-anchor-target">
                  <AlgoComponent {...(item.props ?? {})} />
                </article>
              );
            })}
          </section>
        ))}
      </div>
    </div>
  );
} 

export default Home;
