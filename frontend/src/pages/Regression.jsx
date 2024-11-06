import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse'; // Import PapaParse for CSV parsing
import './Style.css'; // Assuming you have a Regression.css file for styling 
import axios from 'axios';

const Regression = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ actualRainfall: [], predictedRainfall: [] });
  const [formData, setFormData] = useState({
    year: 2024,
    month: 11,
    day: 6,
    period: 1
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate inputs before submission
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
    if (!formData.period || formData.period <= 0) {
      validationErrors.period = "Please enter a valid period (must be greater than 0).";
    }
    return validationErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    // Clear previous errors and predictions
    setError('');
    setPrediction(null);
    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/regression', formData);

      // Set prediction result from response
      setPrediction(response.data.prediction);
    } catch (err) {
      console.error('Error making prediction:', err);
      setError('Failed to get prediction. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
      <div className="form-box">
        <h1 className="form-title">Weather Forecast Platform</h1>
        <p className="form-description">Enter the details below to forecast if it will rain in the upcoming months based on historical weather data.</p> 

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
            {error.year && <span className="error-message">{error.year}</span>}
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
            {error.month && <span className="error-message">{error.month}</span>}
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
            {error.day && <span className="error-message">{error.day}</span>}
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
            {error.period && <span className="error-message">{error.period}</span>}
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Predicting...' : 'Predict Rainfall'}
          </button>
        </form>


        {prediction !== null && (
          <div className="prediction-box">
            <h3>Prediction Result</h3>
            <p>The predicted rainfall amount is: {prediction.toFixed(2)} mm</p>
          </div>
        )}

        {error && typeof error === 'string' && (
          <div className="error-message">
            {error}
          </div>
        )}
      </div>
      <div className="button-group professional">
        <button onClick={() => handleNavigation('/')} className="nav-button professional">Home</button>
        <button onClick={() => handleNavigation('/eda')} className="nav-button professional">EDA</button>
        <button onClick={() => handleNavigation('/classification')} className="nav-button professional">Classification</button> 
        <button onClick={() => handleNavigation('/clustering')} className="nav-button professional">Clustering</button> 
      </div>
    </div>
  );
};

export default Regression;
