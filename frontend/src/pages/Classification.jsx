import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';  
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse'; // Import PapaParse for CSV parsing
import './Style.css';

const Classification = () => { 
  const navigate = useNavigate();
  const [data, setData] = useState(null); 

  const handleNavigation = (path) => {
    navigate(path);
  }; 

  useEffect(() => {
    // Load CSV data from public folder
    Papa.parse(process.env.PUBLIC_URL + '/cleaned_dataset.csv', {
      header: true,
      download: true,
      complete: (result) => {
        const rows = result.data;

        const temperature = [];
        const humidity = [];
        const classifications = [];

        rows.forEach((row) => {
          if (row['Temperature (°C)'] && row['Humidity (%)']) {
            temperature.push(parseFloat(row['Temperature (°C)']));
            humidity.push(parseFloat(row['Humidity (%)']));

            // Simple mock classification logic for visualization (e.g., if humidity > 50, classify as 1)
            const classification = parseFloat(row['Humidity (%)']) > 50 ? 1 : 0;
            classifications.push(classification);
          }
        });

        setData({
          temperature,
          humidity,
          classifications
        });
      },
    });
  }, []);

  return (
    <div className="classification-container">
      <h1 className="classification-title">Classification Model Analysis</h1>
      <p className="classification-description">See how the classification model categorizes temperature and humidity data into different classes.</p>
      {data && (
        <Plot
          data={[
            {
              x: data.temperature,
              y: data.humidity,
              mode: 'markers',
              marker: {
                color: data.classifications,
                colorscale: 'Viridis',
                size: 10,
              },
              type: 'scatter',
              name: 'Temperature vs Humidity Classification'
            }
          ]}
          layout={{
            title: 'Temperature vs Humidity Classification',
            xaxis: { title: 'Temperature (°C)' },
            yaxis: { title: 'Humidity (%)' },
            hovermode: 'closest'
          }}
        />
      )}
      <div className="button-group professional">
        <button onClick={() => handleNavigation('/')} className="nav-button professional">Home</button>
        <button onClick={() => handleNavigation('/regression')} className="nav-button professional">Regression Model</button>
        <button onClick={() => handleNavigation('/classification')} className="nav-button professional">Classification Model</button>
      </div>
    </div>
  );
};

export default Classification;

