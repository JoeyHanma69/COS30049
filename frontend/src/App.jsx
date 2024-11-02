import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import './App.css';

function App() {
  const [predictionData, setPredictionData] = useState(null);

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={<Home setPredictionData={setPredictionData} />}
          />
          <Route
            path="/results"
            element={<Results predictionData={predictionData} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;




