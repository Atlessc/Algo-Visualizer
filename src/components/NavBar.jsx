import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button-variants";
import { ALGO_SECTIONS } from "../data/algoCatalog";
import { cn } from "../lib/utils";

const noop = () => {};

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </svg>
  );
}

function ChevronIcon({ expanded = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-4 w-4 transition-transform", expanded ? "rotate-180" : "rotate-0")}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function NavBar({
  onOpenAlgorithms = noop,
  onOpenCommand = noop,
  showAlgorithmsButton = false,
  isAlgorithmsOpen = false,
  algorithmsPanelId = "mobile-algorithms-sidebar",
}) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [algorithmsExpanded, setAlgorithmsExpanded] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinkClassName = ({ isActive }) =>
    cn(
      buttonVariants({ variant: "ghost", size: "sm" }),
      "h-9 justify-start",
      isActive ? "bg-[color:var(--surface-border)] text-slate-900" : "text-slate-700"
    );

  return (
    <header className="relative">
      <nav
        data-nav-root="true"
        className="sticky top-3 z-30 mb-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-300/70 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-sm max-[520px]:justify-center"
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-linear-to-br from-sky-600 to-cyan-500 text-xs font-bold text-white">
            AV
          </span>
          <h1 className="m-0 min-w-0 text-lg font-semibold leading-tight text-slate-900 max-[420px]:text-base sm:text-xl">
            Algo Visualizer
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 max-[420px]:w-full max-[420px]:justify-center">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-9 gap-1.5 px-2.5 text-xs text-slate-700"
            onClick={onOpenCommand}
            aria-label="Open algorithm search"
            title="Search algorithms (Ctrl/Cmd+K)"
          >
            <SearchIcon />
            Search
          </Button>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="h-9 gap-1.5 px-2.5"
            aria-expanded={isMenuOpen ? "true" : "false"}
            aria-controls="global-nav-menu-panel"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <MenuIcon />
            Menu
          </Button>
        </div>
      </nav>

      {isMenuOpen ? (
        <section
          id="global-nav-menu-panel"
          className="mb-4 rounded-2xl border border-slate-300/70 bg-(--card-bg) shadow-lg backdrop-blur-sm sm:p-4"
        >
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            <NavLink to="/" end className={navLinkClassName}>
              Home
            </NavLink>
            <NavLink to="/algorithms" className={navLinkClassName}>
              Algorithms
            </NavLink>
            <NavLink to="/legacy-home" className={navLinkClassName}>
              Scroll View
            </NavLink>
            <NavLink to="/about" className={navLinkClassName}>
              About
            </NavLink>
          </div>

          <div className="mt-3 rounded-xl border border-slate-300/70 bg-white/80 p-2.5 sm:p-3">
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg border border-transparent px-1 py-1 text-left text-sm font-semibold text-slate-800 hover:bg-slate-100/80"
              aria-expanded={algorithmsExpanded ? "true" : "false"}
              onClick={() => setAlgorithmsExpanded((prev) => !prev)}
            >
              <span className="inline-flex items-center gap-2">Algorithms by Section</span>
              <ChevronIcon expanded={algorithmsExpanded} />
            </button>

            {algorithmsExpanded ? (
              <div className="mt-2 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {ALGO_SECTIONS.map((section) => (
                  <div key={`nav-${section.folder}`} className="min-w-0 rounded-lg border border-slate-200 bg-white/85 p-2">
                    <p className="m-0 text-[0.72rem] font-bold uppercase tracking-[0.04em] text-slate-500">
                      {section.title}
                    </p>
                    <ul className="mt-1.5 max-h-44 list-none space-y-1 overflow-y-auto pr-1">
                      {section.items.map((item) => {
                        const href = `/algorithms/${item.slug}`;
                        const isCurrent = location.pathname === href;
                        return (
                          <li key={`nav-item-${section.folder}-${item.id}`}>
                            <Link
                              to={href}
                              className={cn(
                                "block rounded-md px-2 py-1 text-xs leading-tight transition-colors",
                                isCurrent
                                  ? "bg-linear-to-r from-sky-600 to-cyan-500 font-semibold text-white"
                                  : "text-slate-700 hover:bg-slate-100"
                              )}
                              aria-current={isCurrent ? "page" : undefined}
                            >
                              {item.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {showAlgorithmsButton ? (
            <div className="mt-3 min-[1081px]:hidden">
              <Button
                id="open-algorithms-nav-button"
                type="button"
                size="sm"
                variant="secondary"
                className="h-9 w-full"
                onClick={onOpenAlgorithms}
                aria-haspopup="dialog"
                aria-controls={algorithmsPanelId}
                aria-expanded={isAlgorithmsOpen ? "true" : "false"}
              >
                Open Scroll Sidebar
              </Button>
            </div>
          ) : null}
        </section>
      ) : null}
    </header>
  );
}

export default NavBar;
