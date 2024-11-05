import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Plot from 'react-plotly.js';
import Papa from 'papaparse'; // Import PapaParse for CSV parsing
import './Style.css';

const EDA = () => { 
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

        const months = [];
        const rainfallAmounts = [];
        const periods = [];

        rows.forEach((row) => {
          if (row['Month'] && row['Rainfall amount (millimetres)']) {
            months.push(row['Month']);
            rainfallAmounts.push(parseFloat(row['Rainfall amount (millimetres)']));
          }
          if (row['Period over which rainfall was measured (days)']) {
            periods.push(parseFloat(row['Period over which rainfall was measured (days)']));
          }
        });

        setData({
          months,
          rainfallAmounts,
          periods
        });
      },
    });
  }, []);

  return (
    <div className="eda-container">
      <h1 className="eda-title">Exploratory Data Analysis (EDA)</h1>
      <p className="eda-description">Explore the data distribution, relationships, and insights of weather conditions in Melbourne Olympic Park.</p>
      {data && (
        <>
          <Plot
            data={[
              {
                x: data.months,
                y: data.rainfallAmounts,
                type: 'box',
                marker: { color: 'blue' },
                name: 'Rainfall Amount by Month'
              }
            ]}
            layout={{
              title: 'Rainfall Amount Distribution by Month',
              xaxis: { title: 'Month' },
              yaxis: { title: 'Rainfall (mm)' },
              hovermode: 'closest'
            }}
          />
          <Plot
            data={[
              {
                x: data.periods,
                y: data.rainfallAmounts,
                type: 'scatter',
                mode: 'markers',
                marker: { color: 'green' },
                name: 'Rainfall vs Period of Measurement'
              }
            ]}
            layout={{
              title: 'Rainfall Amount vs Period of Measurement',
              xaxis: { title: 'Period (days)' },
              yaxis: { title: 'Rainfall (mm)' },
              hovermode: 'closest'
            }}
          />
        </>
      )}
      <div className="button-group professional">
        <button onClick={() => handleNavigation('/')} className="nav-button professional">Home</button>
        <button onClick={() => handleNavigation('/regression')} className="nav-button professional">Regression Model</button>
        <button onClick={() => handleNavigation('/classification')} className="nav-button professional">Classification Model</button>
      </div>
    </div>
  );
};

export default EDA;
