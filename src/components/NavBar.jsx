
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="top-nav">
      <div className="brand-block">
        <span className="brand-badge">AV</span>
        <h1>Algo Visualizer</h1>
      </div>
      <div className="top-nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}

export default NavBar;
