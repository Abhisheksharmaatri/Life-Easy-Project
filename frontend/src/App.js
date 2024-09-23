import React, { useState } from 'react';
import './App.css';
import TeamCreator from './components/teamCreator';
import Match from './pages/Match';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import IndividualMatch from './pages/IndividualMatch';

function App() {
  const [url, setUrl] = useState(window.location.pathname);

  return (
    <div className="App">
      {/* Route the application based on url */}
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Create Team</Link>
              </li>
              <li>
                <Link to="/matches">Start Match</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<TeamCreator />} />
            <Route path="/matches" element={<Match />} />
            <Route path="/matches/:id" element={<IndividualMatch />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
