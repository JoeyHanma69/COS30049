import React from 'react';

const ClassificationModel = () => {
  return (
    <div className="classification-model-container">
      <h1 className="classification-title">Classification Model Analysis</h1>
      <p className="classification-description">Check the results of classifying weather conditions, such as predicting rainfall or clear skies.</p>
      <div className="classification-content">
        <img src="/path/to/classification-graph.png" alt="Classification Graph" className="classification-graph" />
        <p className="classification-summary">The classification model helps to predict categorical outcomes, such as whether or not it will rain.</p>
      </div>
    </div>
  );
};

export default ClassificationModel;