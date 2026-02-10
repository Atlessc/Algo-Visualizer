
import React from 'react';

function Footer() {
  return (
    <footer className="site-footer">
      <p>Interactive algorithms for learning and experimentation.</p>
      <small>{new Date().getFullYear()} Algo Visualizer</small>
    </footer>
  );
}

export default Footer;
