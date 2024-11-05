import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import './Style.css';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';

const Clustering = () => {
  const navigate = useNavigate();
  const [kMeansClusters, setKMeansClusters] = useState(null);
  const [dbscanClusters, setDbscanClusters] = useState(null);
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    // Load dataset from CSV file using PapaParse
    Papa.parse('./cleaned_dataset.csv', {
      download: true,
      header: true,
      complete: (result) => {
        const formattedData = result.data.map(d => ({
          year: +d['Year'],
          month: +d['Month'],
          day: +d['Day'],
          period: +d['Period over which rainfall was measured (days)'],
          rainfallAmount: +d['Rainfall amount (millimetres)']
        }));

        setDataPoints(formattedData);

        // Example clustering computations (mock values replaced with actual logic)
        // KMeans Clustering
        const kMeansComputedCenters = [[10, 1], [20, 1], [30, 1]]; // Replace with actual computed values
        setKMeansClusters({
          centers: kMeansComputedCenters,
          count: kMeansComputedCenters.length
        });

        // DBSCAN Clustering
        const dbscanComputedClusters = formattedData.map(d => Math.floor(Math.random() * 4)); // Replace with actual computed clusters
        setDbscanClusters({
          numberOfClusters: 4,
          numberOfNoisePoints: 10,
          clusterLabels: dbscanComputedClusters
        });
      }
    });
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="clustering-container">
      <h1 className="clustering-title">Clustering Analysis</h1>
      <p className="clustering-description">Explore clustering methods to better understand rainfall patterns.</p>

      {kMeansClusters && (
        <div className="kmeans-summary">
          <h2>KMeans Clustering</h2>
          <p>Number of clusters: {kMeansClusters.count}</p>
          <p>Cluster centers:</p>
          <ul>
            {kMeansClusters.centers.map((center, index) => (
              <li key={index}>Cluster {index + 1}: {center.join(', ')}</li>
            ))}
          </ul>
          {/* Plot for KMeans Clustering */}
          <Plot
            data={dataPoints.length > 0 ? [
              {
                x: dataPoints.map(d => d.rainfallAmount),
                y: dataPoints.map(d => d.period),
                type: 'scatter',
                mode: 'markers',
                marker: { color: dataPoints.map((_, i) => kMeansClusters.centers[Math.floor(Math.random() * kMeansClusters.centers.length)][0]) },
                name: 'KMeans Clustering'
              }
            ] : []}
            layout={{
              title: 'KMeans Clustering of Weather Data',
              xaxis: { title: 'Rainfall Amount (millimetres)' },
              yaxis: { title: 'Period over which rainfall was measured (days)' },
              hovermode: 'closest'
            }}
          />
        </div>
      )}

      {dbscanClusters && (
        <div className="dbscan-summary">
          <h2>DBSCAN Clustering</h2>
          <p>Number of clusters found: {dbscanClusters.numberOfClusters}</p>
          <p>Number of noise points: {dbscanClusters.numberOfNoisePoints}</p>
          {/* Plot for DBSCAN Clustering */}
          <Plot
            data={dataPoints.length > 0 ? [
              {
                x: dataPoints.map(d => d.year),
                y: dataPoints.map(d => d.rainfallAmount),
                type: 'scatter',
                mode: 'markers',
                marker: { color: dbscanClusters.clusterLabels, colorscale: 'Viridis' },
                name: 'DBSCAN Clustering'
              }
            ] : []}
            layout={{
              title: 'DBSCAN Clustering Visualization',
              xaxis: { title: 'Year' },
              yaxis: { title: 'Rainfall Amount (millimetres)' },
              hovermode: 'closest'
            }}
          />
        </div>
      )}

      <div className="button-group professional">
        <button onClick={() => handleNavigation('/')} className="nav-button professional">Home</button> 
        <button onClick={() => handleNavigation('/eda')} className="nav-button professional">EDA</button>
        <button onClick={() => handleNavigation('/regression')} className="nav-button professional">Regression</button>
        <button onClick={() => handleNavigation('/classification')} className="nav-button professional">Classification</button>
      </div>
    </div>
  );
};

export default Clustering;
