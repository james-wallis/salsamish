import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Index from './pages/index';
import Employee from './pages/employee'
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/employee/">Employee</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Index} />
        <Route path="/employee/" component={Employee} />
      </div>
    </Router>
  );
}

export default App;
