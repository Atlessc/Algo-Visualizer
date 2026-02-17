
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavigationUxProvider } from './context/NavigationUxContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <NavigationUxProvider>
        <App />
      </NavigationUxProvider>
    </Router>
  </React.StrictMode>,
);
