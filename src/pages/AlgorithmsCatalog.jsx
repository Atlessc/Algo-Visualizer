import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AlgorithmSidebar from "../components/AlgorithmSidebar";
import { Button } from "../components/ui/button";
import {
  ALGO_FILTER_OPTIONS,
  ALGO_ITEMS,
  SORT_OPTIONS,
  filterAlgorithms,
  groupAlgorithmsByFolder,
  sortAlgorithms,
} from "../data/algoCatalog";

const noop = () => {};

const INITIAL_FILTERS = {
  topic: "all",
  difficulty: "all",
  timeComplexity: "all",
  dataStructure: "all",
};

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5 text-xs font-semibold uppercase tracking-[0.03em] text-slate-600">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 rounded-md border border-slate-300 bg-white px-2.5 text-sm font-medium normal-case tracking-normal text-slate-900 outline-none ring-sky-500 focus-visible:ring-2"
      >
        <option value="all">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function AlgorithmsCatalog({ isTocOpen = false, setIsTocOpen = noop }) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("difficulty");
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const filteredItems = useMemo(
    () =>
      filterAlgorithms(ALGO_ITEMS, {
        query,
        topic: filters.topic,
        difficulty: filters.difficulty,
        timeComplexity: filters.timeComplexity,
        dataStructure: filters.dataStructure,
      }),
    [filters.dataStructure, filters.difficulty, filters.timeComplexity, filters.topic, query]
  );

  const sortedItems = useMemo(() => sortAlgorithms(filteredItems, sortKey), [filteredItems, sortKey]);
  const sidebarSections = useMemo(() => groupAlgorithmsByFolder(sortedItems), [sortedItems]);

  const hasActiveFilters =
    query.trim() ||
    filters.topic !== "all" ||
    filters.difficulty !== "all" ||
    filters.timeComplexity !== "all" ||
    filters.dataStructure !== "all";

  return (
    <div className="relative grid items-start gap-4 [grid-template-columns:clamp(176px,22vw,240px)_minmax(0,1fr)] max-[1240px]:[grid-template-columns:clamp(164px,24vw,212px)_minmax(0,1fr)] max-[1080px]:grid-cols-1">
      <AlgorithmSidebar
        sections={sidebarSections}
        currentSlug={null}
        searchValue={query}
        onSearchChange={setQuery}
        isOpen={isTocOpen}
        onClose={() => setIsTocOpen(false)}
        title="Algorithms by Folder"
        panelId="mobile-algorithms-sidebar"
      />

      <section className="flex min-w-0 flex-col gap-4">
        <div className="rounded-[18px] border border-slate-300/70 bg-gradient-to-b from-white/95 to-white/80 p-4 shadow-lg sm:p-5">
          <p className="m-0 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-blue-700">Algorithm Catalog</p>
          <h2 className="mb-1 mt-1 text-[clamp(1.2rem,2vw,1.8rem)] font-semibold leading-tight text-slate-900">
            Search, filter, and open each visualizer by shareable URL.
          </h2>
          <p className="m-0.5 text-slate-600">
            Use filters to narrow by topic, difficulty, complexity, and data structure, then open any
            algorithm in its dedicated page.
          </p>
        </div>

        <div className="rounded-xl border border-slate-300/70 bg-white/85 p-3 shadow-sm backdrop-blur-sm sm:p-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <label className="flex min-w-0 flex-col gap-1.5 text-xs font-semibold uppercase tracking-[0.03em] text-slate-600 sm:col-span-2 lg:col-span-3">
              Search
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name, topic, complexity, or structure"
                className="h-10 rounded-md border border-slate-300 bg-white px-2.5 text-sm normal-case tracking-normal text-slate-900 outline-none ring-sky-500 focus-visible:ring-2"
              />
            </label>

            <FilterSelect
              label="Topic"
              value={filters.topic}
              onChange={(next) => setFilters((prev) => ({ ...prev, topic: next }))}
              options={ALGO_FILTER_OPTIONS.topic}
            />
            <FilterSelect
              label="Difficulty"
              value={filters.difficulty}
              onChange={(next) => setFilters((prev) => ({ ...prev, difficulty: next }))}
              options={ALGO_FILTER_OPTIONS.difficulty}
            />
            <FilterSelect
              label="Time Complexity"
              value={filters.timeComplexity}
              onChange={(next) => setFilters((prev) => ({ ...prev, timeComplexity: next }))}
              options={ALGO_FILTER_OPTIONS.timeComplexity}
            />
            <FilterSelect
              label="Data Structure"
              value={filters.dataStructure}
              onChange={(next) => setFilters((prev) => ({ ...prev, dataStructure: next }))}
              options={ALGO_FILTER_OPTIONS.dataStructure}
            />

            <label className="flex min-w-0 flex-col gap-1.5 text-xs font-semibold uppercase tracking-[0.03em] text-slate-600">
              Sort
              <select
                value={sortKey}
                onChange={(event) => setSortKey(event.target.value)}
                className="h-10 rounded-md border border-slate-300 bg-white px-2.5 text-sm font-medium normal-case tracking-normal text-slate-900 outline-none ring-sky-500 focus-visible:ring-2"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <span>
              Showing <strong className="text-slate-900">{sortedItems.length}</strong> of {ALGO_ITEMS.length}
            </span>
            {hasActiveFilters ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2.5 text-xs"
                onClick={() => {
                  setQuery("");
                  setSortKey("difficulty");
                  setFilters(INITIAL_FILTERS);
                }}
              >
                Reset filters
              </Button>
            ) : null}
          </div>
        </div>

        {sortedItems.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/80 p-4 text-sm text-slate-600">
            No algorithms matched your filters. Adjust filters or clear search to see all entries.
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {sortedItems.map((item) => (
              <article
                key={item.id}
                className="flex min-h-44 flex-col rounded-xl border border-slate-300/70 bg-white/90 p-3 shadow-sm backdrop-blur-sm"
              >
                <p className="m-0 text-[0.7rem] font-bold uppercase tracking-[0.05em] text-slate-500">{item.folderLabel}</p>
                <h3 className="mb-1 mt-1 text-base font-semibold leading-tight text-slate-900">{item.label}</h3>
                <div className="mt-1 flex flex-wrap gap-1.5 text-[11px] text-slate-700">
                  <span className="rounded-full bg-slate-200 px-2 py-0.5">{item.difficulty}</span>
                  <span className="rounded-full bg-sky-100 px-2 py-0.5 text-sky-900">{item.topic}</span>
                  <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-indigo-900">{item.timeComplexity}</span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-emerald-900">{item.dataStructure}</span>
                </div>
                <div className="mt-auto pt-3">
                  <Link
                    to={`/algorithms/${item.slug}`}
                    className="inline-flex h-9 items-center justify-center rounded-md bg-sky-600 px-3 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
                  >
                    Open Visualizer
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default AlgorithmsCatalog;
