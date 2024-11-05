import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { useNavigate } from 'react-router-dom';
import * as d3 from 'd3';
import './Style.css';

const Classification = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load dataset from CSV file using D3
    d3.csv('/cleaned_dataset.csv')
      .then((data) => {
        if (data && data.length > 0) {
          console.log("Raw Data Loaded:", data);
          const formattedData = data.map(d => ({
            temperature: parseFloat(d['Temperature (°C)']),
            humidity: parseFloat(d['Humidity (%)']),
            class: d['Class'] ? parseInt(d['Class']) : null // assuming you have class labels in your CSV
          }));

          setData(formattedData);
        } else {
          setError("No data found in the CSV file.");
        }
      })
      .catch((error) => {
        console.error("Error loading CSV data:", error);
        setError("Error loading the dataset. Please check the CSV path and format.");
      });
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="classification-model-container">
      <h1 className="classification-title">Classification Model Analysis</h1>
      <p className="classification-description">See how the classification model categorizes temperature and humidity data into different classes.</p>
      
      {error && <p className="error-message">{error}</p>}

      <div className="classification-content">
        {data ? (
          <Plot
            data={[
              {
                x: data.map(d => d.temperature),
                y: data.map(d => d.humidity),
                type: 'scatter',
                mode: 'markers',
                marker: { color: 'blue' },
                name: 'Temperature vs Humidity'
              }
            ]}
            layout={{
              title: 'Temperature vs Humidity Classification',
              xaxis: { title: 'Temperature (°C)' },
              yaxis: { title: 'Humidity (%)' },
              hovermode: 'closest'
            }}
          />
        ) : (
          <p>Loading data...</p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="button-group professional">
        <button onClick={() => handleNavigation('/')} className="nav-button professional">Home</button>
        <button onClick={() => handleNavigation('/regression')} className="nav-button professional">Regression Model</button>
        <button onClick={() => handleNavigation('/eda')} className="nav-button professional">EDA Analysis</button>
      </div>
    </div>
  );
};

export default Classification;



