import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse'; // Import PapaParse for CSV parsing
import './Style.css'; // Assuming you have a Regression.css file for styling

const Regression = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ actualRainfall: [], predictedRainfall: [] });

  useEffect(() => {
    // Load CSV data from public folder
    Papa.parse(process.env.PUBLIC_URL + '/cleaned_dataset.csv', {
      header: true,
      download: true,
      complete: (result) => {
        const rows = result.data;

        // Extract features and labels from CSV
        const actualRainfall = [];
        const predictedRainfall = []; 

        rows.forEach((row) => {
          const actual = parseFloat(row['Rainfall amount (millimetres)']);
          if (!isNaN(actual)) {
            actualRainfall.push(actual);
          }

          // Here, you can add your prediction logic or just use placeholder data
          // Let's assume we are using a simple formula as a placeholder
          const predicted = actual * 0.9 + 1; // Placeholder for regression prediction
          predictedRainfall.push(predicted);
        });

        setData({
          actualRainfall,
          predictedRainfall,
        });
      },
    });
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="regression-model-container">
      <h1 className="regression-title">Regression Model Analysis</h1>
      <p className="regression-description">See how the regression model predicts temperature and rainfall values.</p>
      <div className="regression-content">
        <p className="regression-summary">The regression model shows a predicted curve of expected temperature and rainfall using historical weather data.</p>
        {data.actualRainfall.length > 0 && data.predictedRainfall.length > 0 && (
          <Plot
            data={[{
              x: data.actualRainfall,
              y: data.predictedRainfall,
              type: 'scatter',
              mode: 'markers+lines',
              marker: { color: 'blue' },
              name: 'Predicted vs Actual'
            }]}
            layout={{
              title: 'Actual vs Predicted Rainfall',
              xaxis: { title: 'Actual Rainfall (millimetres)' },
              yaxis: { title: 'Predicted Rainfall (millimetres)' },
              hovermode: 'closest'
            }}
          />
        )}
      </div>
      <div className="button-group professional">
        <button onClick={() => handleNavigation('/')} className="nav-button professional">Home</button>
        <button onClick={() => handleNavigation('/eda')} className="nav-button professional">EDA</button>
        <button onClick={() => handleNavigation('/classification')} className="nav-button professional">Classification Model</button>
      </div>
    </div>
  );
};

export default Regression;


