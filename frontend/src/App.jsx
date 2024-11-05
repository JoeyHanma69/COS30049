import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EDAAnalysis from './pages/EDA'; 
import ClassificationModel from './pages/Classification';  
import Clustering from './pages/Clustering';
import RegressionModel from './pages/Regression';
import './App.css';

function App() {
  const [predictionData, setPredictionData] = useState(null);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home setPredictionData={setPredictionData} />} />
          <Route path="/eda" element={<EDAAnalysis />} />
          <Route path="/regression" element={<RegressionModel />} />
          <Route path="/classification" element={<ClassificationModel />} /> 
          <Route path="/clustering" element={<Clustering/> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;






