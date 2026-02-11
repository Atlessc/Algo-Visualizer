
import React from 'react';
import { Link } from 'react-router-dom';
import { buttonVariants } from "./ui/button";
import { cn } from "../lib/utils";

function NavBar() {
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
        <Link to="/" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-slate-600")}>
          Home
        </Link>
        <Link to="/about" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-slate-600")}>
          About
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
