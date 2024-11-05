import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { useNavigate } from 'react-router-dom';
import * as d3 from 'd3';
import './Style.css';

const EDA = () => {
  const navigate = useNavigate();
  const [rainfallData, setRainfallData] = useState(null);
  const [correlationMatrix, setCorrelationMatrix] = useState(null);

  useEffect(() => {
    // Load dataset from CSV file using D3
    d3.csv('/cleaned_dataset.csv').then((data) => {
      // Map and format data from CSV
      const formattedData = data.map(d => ({
        year: +d['Year'],
        month: d['Month'],
        day: +d['Day'],
        period: +d['Period over which rainfall was measured (days)'],
        rainfallAmount: +d['Rainfall amount (millimetres)']
      }));

      setRainfallData(formattedData);

      // Extract numerical features for the correlation matrix
      const numericalData = formattedData.map(d => ({
        year: d.year,
        day: d.day,
        period: d.period,
        rainfallAmount: d.rainfallAmount
      }));

      // Calculate correlation matrix using JavaScript
      const features = Object.keys(numericalData[0]);
      const matrix = calculateCorrelationMatrix(numericalData, features);
      setCorrelationMatrix({ features, matrix });
    }).catch((error) => {
      console.error("Error loading CSV data:", error);
    });
  }, []);

  const calculateCorrelationMatrix = (data, features) => {
    const correlationMatrix = [];
    features.forEach((feature1) => {
      const row = [];
      features.forEach((feature2) => {
        const correlation = calculateCorrelation(data, feature1, feature2);
        row.push(correlation);
      });
      correlationMatrix.push(row);
    });
    return correlationMatrix;
  };

  const calculateCorrelation = (data, feature1, feature2) => {
    const mean = (array) => array.reduce((a, b) => a + b, 0) / array.length;
    const mean1 = mean(data.map(d => d[feature1]));
    const mean2 = mean(data.map(d => d[feature2]));
    const numerator = data.reduce((sum, d) => sum + (d[feature1] - mean1) * (d[feature2] - mean2), 0);
    const denominator = Math.sqrt(
      data.reduce((sum, d) => sum + Math.pow(d[feature1] - mean1, 2), 0) *
      data.reduce((sum, d) => sum + Math.pow(d[feature2] - mean2, 2), 0)
    );
    return numerator / denominator;
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="eda-container">
      <h1 className="eda-title">Exploratory Data Analysis (EDA)</h1>
      <p className="eda-description">Understand the underlying patterns in the dataset by exploring different visualizations.</p>

      <div className="eda-content">
        {/* Boxplot for Rainfall Amount by Month */}
        {rainfallData && (
          <Plot
            data={[
              {
                x: rainfallData.map(d => d.month),
                y: rainfallData.map(d => d.rainfallAmount),
                type: 'box',
                name: 'Rainfall Amount by Month',
                marker: { color: 'blue' }
              }
            ]}
            layout={{
              title: 'Rainfall Amount by Month',
              xaxis: { title: 'Month' },
              yaxis: { title: 'Rainfall (mm)' },
              hovermode: 'closest'
            }}
          />
        )}

        {/* Boxplot for Rainfall Amount by Period of Measurement */}
        {rainfallData && (
          <Plot
            data={[
              {
                x: rainfallData.map(d => d.period),
                y: rainfallData.map(d => d.rainfallAmount),
                type: 'box',
                name: 'Rainfall Amount by Period',
                marker: { color: 'green' }
              }
            ]}
            layout={{
              title: 'Rainfall Amount vs Period of Measurement',
              xaxis: { title: 'Period (days)' },
              yaxis: { title: 'Rainfall (mm)' },
              hovermode: 'closest'
            }}
          />
        )}

        {/* Scatter Plot of Rainfall vs Period */}
        {rainfallData && (
          <Plot
            data={[
              {
                x: rainfallData.map(d => d.period),
                y: rainfallData.map(d => d.rainfallAmount),
                type: 'scatter',
                mode: 'markers',
                marker: { color: 'red' },
                name: 'Rainfall vs Period'
              }
            ]}
            layout={{
              title: 'Rainfall Amount vs Period of Measurement',
              xaxis: { title: 'Period (days)' },
              yaxis: { title: 'Rainfall (mm)' },
              hovermode: 'closest'
            }}
          />
        )}

        {/* Correlation Matrix of Numerical Features */}
        {correlationMatrix && (
          <Plot
            data={[
              {
                z: correlationMatrix.matrix,
                x: correlationMatrix.features,
                y: correlationMatrix.features,
                type: 'heatmap',
                colorscale: 'Viridis'
              }
            ]}
            layout={{
              title: 'Correlation Matrix of Numerical Features',
              xaxis: { title: 'Features' },
              yaxis: { title: 'Features' },
              hovermode: 'closest'
            }}
          />
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="button-group professional">
        <button onClick={() => handleNavigation('/')} className="nav-button professional">Home</button>
        <button onClick={() => handleNavigation('/regression')} className="nav-button professional">Regression</button>
        <button onClick={() => handleNavigation('/classification')} className="nav-button professional">Classification</button> 
        <button onClick={() => handleNavigation('/clustering')} className="nav-button professional">Clustering</button> 
      </div>
    </div>
  );
};

export default EDA;



