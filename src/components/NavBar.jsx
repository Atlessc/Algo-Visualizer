import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from "./ui/button";
import { buttonVariants } from "./ui/button-variants";
import { cn } from "../lib/utils";

const noop = () => {};

function NavBar({
  onOpenAlgorithms = noop,
  onOpenCommand = noop,
  showAlgorithmsButton = false,
  isAlgorithmsOpen = false,
  algorithmsPanelId = "mobile-algorithms-sidebar",
}) {
  const navLinkClassName = ({ isActive }) =>
    cn(
      buttonVariants({ variant: "ghost", size: "sm" }),
      isActive ? "bg-slate-200/80 text-slate-900" : "text-slate-600"
    );

  return (
    <nav
      data-nav-root="true"
      className="sticky top-3 z-20 mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-300/70 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-sm max-[520px]:justify-center"
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-sky-600 to-cyan-500 text-xs font-bold text-white">
          AV
        </span>
        <h1 className="m-0 min-w-0 text-lg font-semibold leading-tight text-slate-900 max-[420px]:text-base sm:text-xl">
          Algo Visualizer
        </h1>
      </div>
      <div className="flex flex-wrap items-center gap-2 max-[420px]:w-full max-[420px]:justify-center">
        {showAlgorithmsButton ? (
          <Button
            id="open-algorithms-nav-button"
            type="button"
            size="sm"
            variant="secondary"
            className="min-[1081px]:hidden"
            onClick={onOpenAlgorithms}
            aria-haspopup="dialog"
            aria-controls={algorithmsPanelId}
            aria-expanded={isAlgorithmsOpen ? "true" : "false"}
          >
            Algorithms
          </Button>
        ) : null}
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-9 px-2.5 text-xs text-slate-700"
          onClick={onOpenCommand}
          aria-label="Open algorithm command palette"
          title="Open command palette (Ctrl/Cmd+K)"
        >
          Jump
        </Button>
        <NavLink to="/" end className={navLinkClassName}>
          Home
        </NavLink>
        <NavLink to="/algorithms" className={navLinkClassName}>
          Algorithms
        </NavLink>
        <NavLink to="/about" className={navLinkClassName}>
          About
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
