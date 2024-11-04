import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';  // Assuming you have a Home.css file for styling

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="home-page-container">
      <div className="navigation-box professional">
        <h1 className="form-title">Weather Prediction Platform</h1>
        <p className="form-description">Explore different prediction models and analyses below to gain insights into weather conditions.</p>

        <div className="button-group professional">
          <button onClick={() => handleNavigation('/eda')} className="nav-button professional">EDA Analysis</button>
          <button onClick={() => handleNavigation('/regression')} className="nav-button professional">Regression Model</button>
          <button onClick={() => handleNavigation('/classification')} className="nav-button professional">Classification Model</button>
        </div>
      </div>
    </div>
  );
};

export default Home;

