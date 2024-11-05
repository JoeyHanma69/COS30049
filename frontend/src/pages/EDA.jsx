// EDAAnalysis.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Plot from 'react-plotly.js';
import './Style.css';  // Assuming you have an EDAAnalysis.css file for styling

const EDAAnalysis = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [filterYear, setFilterYear] = useState('All');

  useEffect(() => {
    // Fetch data (mocked for now)
    setData({
      temperature: [15, 18, 20, 25, 22, 30],
      humidity: [60, 55, 70, 65, 80, 75],
      rainfall: [50, 40, 60, 70, 30, 20],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      period: [1, 2, 1, 2, 1, 2]
    });
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="eda-analysis-container">
      <h1 className="eda-title">Exploratory Data Analysis (EDA)</h1>
      <p className="eda-description">Gain insights into historical weather trends at Melbourne Olympic Park.</p>
      <div className="eda-content">
        {data && (
          <>
            <Plot
              data={[{
                x: data.months,
                y: data.temperature,
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'blue' },
                name: 'Temperature (°C)'
              },
              {
                x: data.months,
                y: data.humidity,
                type: 'bar',
                marker: { color: 'orange' },
                name: 'Humidity (%)'
              }]}
              layout={{
                title: 'Monthly Weather Trends',
                xaxis: { title: 'Month' },
                yaxis: { title: 'Value' },
                hovermode: 'closest'
              }}
            />

            <Plot
              data={[{
                x: data.months,
                y: data.rainfall,
                type: 'box',
                marker: { color: 'green' },
                name: 'Rainfall (mm)'
              }]}
              layout={{
                title: 'Rainfall Amount Distribution by Month',
                xaxis: { title: 'Month' },
                yaxis: { title: 'Rainfall (mm)' },
                hovermode: 'closest'
              }}
            />

            <Plot
              data={[{
                x: data.period,
                y: data.rainfall,
                type: 'scatter',
                mode: 'markers',
                marker: { color: 'purple' },
                name: 'Rainfall vs Period'
              }]}
              layout={{
                title: 'Rainfall Amount vs Period of Measurement',
                xaxis: { title: 'Period (days)' },
                yaxis: { title: 'Rainfall (mm)' },
                hovermode: 'closest'
              }}
            />

            <Plot
              data={[{
                z: [[1, 0.5, 0.2], [0.5, 1, 0.3], [0.2, 0.3, 1]],
                x: ['Temperature', 'Humidity', 'Rainfall'],
                y: ['Temperature', 'Humidity', 'Rainfall'],
                type: 'heatmap',
                colorscale: 'Viridis'
              }]}
              layout={{
                title: 'Correlation Matrix of Numerical Features',
                xaxis: { title: 'Features', automargin: true },
                yaxis: { title: 'Features', automargin: true },
                hovermode: 'closest'
              }}
            />
          </>
        )}
        <p className="eda-summary">The EDA section shows data distributions, relationships, and trends between temperature, humidity, and weather conditions. Use the filter to see data for specific years.</p>
      </div>
      <div className="button-group professional">
        <button onClick={() => handleNavigation('/')} className="nav-button professional">Home</button>
        <button onClick={() => handleNavigation('/regression')} className="nav-button professional">Regression Model</button>
        <button onClick={() => handleNavigation('/classification')} className="nav-button professional">Classification Model</button>
      </div>
    </div>
  );
};

export default EDAAnalysis;
