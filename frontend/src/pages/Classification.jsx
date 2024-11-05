import React, { useEffect, useState } from 'react';
import './Style.css';
import { useNavigate } from 'react-router-dom';

const Classification = () => {
  const navigate = useNavigate();
  const [classificationReport, setClassificationReport] = useState(null);

  useEffect(() => {
    // Assuming classification metrics are calculated from some backend or imported dataset
    // Here we set mock data
    setClassificationReport({
      precision: 0.85,
      recall: 0.88,
      f1Score: 0.86,
      accuracy: 0.87
    });
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="classification-container">
      <h1 className="classification-title">Classification Model Analysis</h1>
      <p className="classification-description">See how the classification model categorizes temperature and humidity data into different classes.</p>

      {classificationReport && (
        <div className="classification-report">
          <h2>Classification Report</h2>
          <ul>
            <li>Precision: {classificationReport.precision}</li>
            <li>Recall: {classificationReport.recall}</li>
            <li>F1 Score: {classificationReport.f1Score}</li>
            <li>Accuracy: {classificationReport.accuracy}</li>
          </ul>
        </div>
      )}

      <div className="button-group professional">
        <button onClick={() => handleNavigation('/')} className="nav-button professional">Home</button>
        <button onClick={() => handleNavigation('/eda')} className="nav-button professional">EDA</button>
        <button onClick={() => handleNavigation('/regression')} className="nav-button professional">Regression</button> 
        <button onClick={() => handleNavigation('/clustering')} className="nav-button professional">Clustering</button> 
      </div>
    </div>
  );
};

export default Classification;



