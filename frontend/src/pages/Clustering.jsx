import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import './Clustering.css';
import { useNavigate } from 'react-router-dom';

const Clustering = () => {
  const navigate = useNavigate();
  const [kMeansClusters, setKMeansClusters] = useState(null);
  const [dbscanClusters, setDbscanClusters] = useState(null);

  useEffect(() => {
    // Load dataset from CSV file using PapaParse
    Papa.parse('/path/to/cleaned_dataset.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        const data = result.data;

        // Format the data
        const formattedData = data.map(d => ({
          year: d['Year'],
          month: d['Month'],
          day: d['Day'],
          period: d['Period over which rainfall was measured (days)'],
          rainfallAmount: d['Rainfall amount (millimetres)']
        }));

        // Example: Assuming kMeansClusters and dbscanClusters are computed here
        // Replace with your actual clustering computation logic if available
        setKMeansClusters({
          centers: [[10, 15], [20, 25], [30, 35]], // Example cluster centers
          count: 3
        });

        setDbscanClusters({
          numberOfClusters: 4,
          numberOfNoisePoints: 10
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
        </div>
      )}

      {dbscanClusters && (
        <div className="dbscan-summary">
          <h2>DBSCAN Clustering</h2>
          <p>Number of clusters found: {dbscanClusters.numberOfClusters}</p>
          <p>Number of noise points: {dbscanClusters.numberOfNoisePoints}</p>
        </div>
      )}

      <div className="button-group professional">
        <button onClick={() => handleNavigation('/')} className="nav-button professional">Home</button> 
        <button onClick={() => handleNavigation('/eda')} className="nav-button professional">EDA</button>
        <button onClick={() => handleNavigation('/regression')} className="nav-button professional">Regression Model</button>
        <button onClick={() => handleNavigation('/classification')} className="nav-button professional">Classification Model</button>
      </div>
    </div>
  );
};

export default Clustering;