
import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      margin: '0 auto',
      width: 'clamp(300px, 100%, 800px)',
    }}>
      <div>
        <h1>Algo Visualizer</h1>
      </div>
      <div>
        <Link to="/" style={{ color: 'lightblue', textDecoration: 'none', fontWeight: 'bold', fontSize: '20px' }}>Home</Link>&nbsp;&nbsp;|&nbsp;&nbsp;<Link style={{ color: 'lightblue', textDecoration: 'none', fontWeight: 'bold', fontSize: '20px' }} to="/about">About</Link>
      </div>
    </nav>
  );
}

export default NavBar;
