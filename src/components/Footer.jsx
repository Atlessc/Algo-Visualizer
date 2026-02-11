
import React from 'react';

function Footer() {
  return (
    <footer className="mt-6 text-center text-slate-600">
      <p className="m-0.5">Interactive algorithms for learning and experimentation.</p>
      <small className="text-xs">{new Date().getFullYear()} Algo Visualizer</small>
    </footer>
  );
}

export default Footer;
