import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  ALGO_FILTER_OPTIONS,
  ALGO_ITEMS,
  SORT_OPTIONS,
  filterAlgorithms,
  sortAlgorithms,
} from "../data/algoCatalog";

const INITIAL_FILTERS = {
  topic: "all",
  difficulty: "all",
  timeComplexity: "all",
  dataStructure: "all",
};

function FunnelIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 6h16l-6 7v5l-4 2v-7L4 6z" />
    </svg>
  );
}

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

function AlgorithmsCatalog() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("difficulty");
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [filtersOpen, setFiltersOpen] = useState(false);

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

  const hasActiveFilters =
    query.trim() ||
    filters.topic !== "all" ||
    filters.difficulty !== "all" ||
    filters.timeComplexity !== "all" ||
    filters.dataStructure !== "all";

  return (
    <section className="flex min-w-0 flex-col gap-4">
      <div className="rounded-[18px] border border-(--card-border) bg-(--card-bg) p-4 shadow-lg sm:p-5">
        <p className="m-0 text-[0.8rem] font-bold uppercase tracking-[0.08em] text-blue-700">Algorithm Catalog</p>
        <h2 className="mb-1 mt-1 text-[clamp(1.2rem,2vw,1.8rem)] font-semibold leading-tight text-slate-900">
          Search, filter, and open each visualizer by shareable URL.
        </h2>
        <p className="m-0.5 text-slate-600">
          Use search and filter controls, or switch to the dedicated scroll page if you want the full sidebar.
        </p>
      </div>

      <div className="rounded-xl border border-(--card-border) bg-(--card-bg) p-3 shadow-sm backdrop-blur-sm sm:p-4">
        <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
          <label className="flex min-w-0 flex-col gap-1.5 text-xs font-semibold uppercase tracking-[0.03em] text-slate-600">
            Search
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, topic, complexity, or structure"
              className="h-10 rounded-md border border-(--card-border) bg-(--card-bg) px-2.5 text-sm normal-case tracking-normal text-(--card-text) outline-none ring-sky-500 focus-visible:ring-2"
            />
          </label>
          <div className="flex flex-wrap items-end gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="h-10 gap-1.5 px-3"
              aria-expanded={filtersOpen ? "true" : "false"}
              aria-controls="catalog-filters-panel"
              onClick={() => setFiltersOpen((prev) => !prev)}
            >
              <FunnelIcon />
              Filters
            </Button>

            <label className="flex min-w-48 flex-col gap-1.5 text-xs font-semibold uppercase tracking-[0.03em] text-slate-600">
              Sort
              <select
                value={sortKey}
                onChange={(event) => setSortKey(event.target.value)}
                className="h-10 rounded-md border border-(--card-border) bg-(--card-bg) px-2.5 text-sm font-medium normal-case tracking-normal text-(--card-text) outline-none ring-sky-500 focus-visible:ring-2"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <Link
              to="/legacy-home"
              className="inline-flex h-10 items-center justify-center rounded-md border border-(--card-border) bg-(--card-bg) px-3 text-sm font-semibold text-(--card-text) hover:bg-(--card-bg-hover)"
            >
              Scroll Page
            </Link>
          </div>
        </div>

        {filtersOpen ? (
          <div id="catalog-filters-panel" className="mt-3 rounded-lg border border-(--card-border) bg-(--card-bg)/85 p-3">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
            </div>

            {hasActiveFilters ? (
              <div className="mt-2">
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
              </div>
            ) : null}
          </div>
        ) : null}

        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-(--card-text)">
          <span>
            Showing <strong className="text-(--card-text)">{sortedItems.length}</strong> of {ALGO_ITEMS.length}
          </span>
        </div>
      </div>

      {sortedItems.length === 0 ? (
        <div className="rounded-xl border border-dashed border-(--card-border) bg-(--card-bg)/80 p-4 text-sm text-(--card-text)">
          No algorithms matched your filters. Adjust filters or clear search to see all entries.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {sortedItems.map((item) => (
            <article
              key={item.id}
              className="flex min-h-44 flex-col rounded-xl border border-(--card-border)/70 bg-(--card-bg)/90 p-3 shadow-sm backdrop-blur-sm"
            >
              <p className="m-0 text-[0.7rem] font-bold uppercase tracking-[0.05em] text-(--card-text)/50">{item.folderLabel}</p>
              <h3 className="mb-1 mt-1 text-base font-semibold leading-tight text-(--card-text)">{item.label}</h3>
              <div className="mt-1 flex flex-wrap gap-1.5 text-[11px] text-(--card-text)">
                <span className="rounded-full bg-(--card-bg)/50 px-2 py-0.5">{item.difficulty}</span>
                <span className="rounded-full bg-(--card-bg)/50 px-2 py-0.5 text-(--card-text)">{item.topic}</span>
                <span className="rounded-full bg-(--card-bg)/50 px-2 py-0.5 text-(--card-text)">{item.timeComplexity}</span>
                <span className="rounded-full bg-(--card-bg)/50 px-2 py-0.5 text-(--card-text)">{item.dataStructure}</span>
              </div>
              <div className="mt-auto pt-3">
                <Link
                  to={`/algorithms/${item.slug}`}
                  className="inline-flex h-9 items-center justify-center rounded-md bg-sky-600 px-3 text-sm font-semibold text-(--card-text) transition-colors hover:bg-sky-700"
                >
                  Open Visualizer
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default AlgorithmsCatalog;
