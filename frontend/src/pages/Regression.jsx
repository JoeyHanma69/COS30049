import React from 'react'; 
import { useNavigate } from 'react-router-dom';

const RegressionModel = () => { 
    const navigate = useNavigate();

    const handleNavigation = (path) => {
      navigate(path);
    };
  return (
    <div className="regression-model-container">
      <h1 className="regression-title">Regression Model Analysis</h1>
      <p className="regression-description">See how the regression model predicts temperature and rainfall values.</p>
      <div className="regression-content">
        <p className="regression-summary">The regression model shows a predicted curve of expected temperature and rainfall using historical weather data.</p>
      </div> 
      <div className="button-group professional">
          <button onClick={() => handleNavigation('/')} className="nav-button professional">Home</button>
          <button onClick={() => handleNavigation('/eda')} className="nav-button professional">EDA</button>
          <button onClick={() => handleNavigation('/classification')} className="nav-button professional">Classification Model</button>
        </div>
    </div> 
  );
};

export default RegressionModel;