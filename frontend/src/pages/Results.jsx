import React from 'react';
import { useLocation } from 'react-router-dom';

const Results = () => {
  const { state } = useLocation();
  
  if (!state) {
    return <div>No data available. Please go back and make a prediction.</div>;
  }

  return (
    <div>
      <h1>Prediction Results</h1>
      <p>Will it Rain?: {state.classification_prediction ? 'Yes' : 'No'}</p>
      <p>Predicted Rainfall Amount: {state.regression_prediction.toFixed(2)} mm</p>
      <p>Cluster Group: {state.cluster}</p>
    </div>
  );
};

export default Results;
