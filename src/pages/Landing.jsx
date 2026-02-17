import { Link } from "react-router-dom";
import { ALGO_ITEMS } from "../data/algoCatalog";

function Landing() {
  const totalAlgorithms = ALGO_ITEMS.length;
  const beginnerCount = ALGO_ITEMS.filter((item) => item.difficulty === "Beginner").length;
  const graphCount = ALGO_ITEMS.filter((item) => item.topic === "Graphs").length;

  return (
    <section className="flex min-w-0 flex-col gap-4">
      <div className="rounded-[18px] border border-slate-300/70 bg-gradient-to-b from-white/95 to-white/80 p-4 shadow-lg sm:p-5">
        <p className="m-0 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-blue-700">Algo Visualizer</p>
        <h2 className="mb-1 mt-1 text-[clamp(1.2rem,2vw,1.9rem)] font-semibold leading-tight text-slate-900">
          Explore algorithms through focused, shareable visualizer pages.
        </h2>
        <p className="m-0.5 max-w-3xl text-slate-600">
          Jump into the catalog to filter by topic, difficulty, time complexity, and data structure,
          then open any algorithm with a direct URL.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Link
            to="/algorithms"
            className="inline-flex h-10 items-center justify-center rounded-md bg-sky-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
          >
            Open Catalog
          </Link>
          <Link
            to="/about"
            className="inline-flex h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
          >
            About the Project
          </Link>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <article className="rounded-xl border border-slate-300/70 bg-white/85 p-3 shadow-sm">
          <p className="m-0 text-[0.72rem] font-bold uppercase tracking-[0.05em] text-slate-500">Algorithms</p>
          <p className="mb-0 mt-1 text-2xl font-semibold text-slate-900">{totalAlgorithms}</p>
        </article>
        <article className="rounded-xl border border-slate-300/70 bg-white/85 p-3 shadow-sm">
          <p className="m-0 text-[0.72rem] font-bold uppercase tracking-[0.05em] text-slate-500">Beginner Friendly</p>
          <p className="mb-0 mt-1 text-2xl font-semibold text-slate-900">{beginnerCount}</p>
        </article>
        <article className="rounded-xl border border-slate-300/70 bg-white/85 p-3 shadow-sm">
          <p className="m-0 text-[0.72rem] font-bold uppercase tracking-[0.05em] text-slate-500">Graph Topics</p>
          <p className="mb-0 mt-1 text-2xl font-semibold text-slate-900">{graphCount}</p>
        </article>
      </div>
    </section>
  );
}

export default Landing;
