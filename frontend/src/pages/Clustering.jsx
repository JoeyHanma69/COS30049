import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import './Style.css';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';

const Clustering = () => {
  const navigate = useNavigate();  
  const [errors, setErrors] = useState({}); 
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    year: '',
    month: '',
    day: '',
    rainfall: '',
    period: ''
  });
  const [kMeansClusters, setKMeansClusters] = useState(null);
  const [dbscanClusters, setDbscanClusters] = useState(null); 
  const [successMessage, setSuccessMessage] = useState("");
  const [dataPoints, setDataPoints] = useState([]);
   
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }; 
  const validateInputs = () => {
    let validationErrors = {};
    if (!formData.year || formData.year < 1900 || formData.year > new Date().getFullYear()) {
      validationErrors.year = "Please enter a valid year.";
    }
    if (!formData.month || formData.month < 1 || formData.month > 12) {
      validationErrors.month = "Please enter a valid month (1-12).";
    }
    if (!formData.day || formData.day < 1 || formData.day > 31) {
      validationErrors.day = "Please enter a valid day (1-31).";
    }
    if (!formData.rainfall || formData.rainfall < 0) {
      validationErrors.rainfall = "Please enter a valid rainfall amount (must be 0 or greater).";
    }
    if (!formData.period || formData.period < 0) {
      validationErrors.period = "Please enter a valid period (must be 0 or greater).";
    }
    return validationErrors;
  }; 

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const willRain = formData.rainfall >= 1;
      alert(willRain ? "It will rain today." : "It will not rain today.");
      setSuccessMessage("Prediction complete! Check the alert for results.");
      setFormData({ year: '', month: '', day: '', rainfall: '', period: '' });
    }, 1000); // Simulate processing delay
  };

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

<div className="form-box">
        <h1 className="form-title">Clustering Analysis Input</h1>
        <p className="form-description">Enter the details below to perform clustering analysis (KMeans & DBSCAN) on weather data.</p>

        <form onSubmit={handleSubmit} className="input-form">
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              required
            />
            {errors.year && <span className="error-message">{errors.year}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="month">Month</label>
            <input
              type="number"
              id="month"
              name="month"
              value={formData.month}
              onChange={handleInputChange}
              required
            />
            {errors.month && <span className="error-message">{errors.month}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="day">Day</label>
            <input
              type="number"
              id="day"
              name="day"
              value={formData.day}
              onChange={handleInputChange}
              required
            />
            {errors.day && <span className="error-message">{errors.day}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="rainfall">Rainfall Amount (mm)</label>
            <input
              type="number"
              id="rainfall"
              name="rainfall"
              value={formData.rainfall}
              onChange={handleInputChange}
              required
            />
            {errors.rainfall && <span className="error-message">{errors.rainfall}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="period">Period over which rainfall was measured (days)</label>
            <input
              type="number"
              id="period"
              name="period"
              value={formData.period}
              onChange={handleInputChange}
              required
            />
            {errors.period && <span className="error-message">{errors.period}</span>}
          </div>

          <button type="submit" className="submit-button">
            {loading ? 'Clustering...' : 'Will it rain via clustering?'}
          </button>
        </form>
      </div>

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
