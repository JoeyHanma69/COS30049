import React from 'react'; 
import { useNavigate } from 'react-router-dom';

const ClassificationModel = () => { 
    const navigate = useNavigate();

    const handleNavigation = (path) => {
      navigate(path);
    };
  return (
    <div className="classification-model-container">
        <h1 className="classification-title">Classification Model Analysis</h1>
        <p className="classification-description">Check the results of classifying weather conditions, such as predicting rainfall or clear skies.</p>
    <div className="classification-content">
      <img src="/path/to/classification-graph.png" alt="Classification Graph" className="classification-graph" />
      <p className="classification-summary">The classification model helps to predict categorical outcomes, such as whether or not it will rain.</p>
    </div>
    <div className="button-group professional">
      <button onClick={() => handleNavigation('/')} className="nav-button professional">Home</button>
      <button onClick={() => handleNavigation('/eda')} className="nav-button professional">EDA Analysis</button>
      <button onClick={() => handleNavigation('/regression')} className="nav-button professional">Regression Model</button>
    </div>
  </div>
  );
};

export default ClassificationModel;