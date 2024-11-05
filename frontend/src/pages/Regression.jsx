import React from 'react';

const RegressionModel = () => {
  return (
    <div className="regression-model-container">
      <h1 className="regression-title">Regression Model Analysis</h1>
      <p className="regression-description">See how the regression model predicts temperature and rainfall values.</p>
      <div className="regression-content">
        <p className="regression-summary">The regression model shows a predicted curve of expected temperature and rainfall using historical weather data.</p>
      </div>
    </div>
  );
};

export default RegressionModel;