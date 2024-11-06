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
    rainfall: 1,
    period: 2,
    monthsAhead: 1
    // year: '',
    // month: '',
    // day: '',
    // rainfall: '',
    // period: '',
    // monthsAhead: 1
  });

  const [forecastResult, setForecastResult] = useState(null);
  const [errors, setErrors] = useState({});

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
    if (!formData.monthsAhead || formData.monthsAhead < 1) {
      validationErrors.monthsAhead = "Please enter the number of months for forecasting.";
    }
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const response = await axios.post('http://127.0.0.1:8000/regression', formData);
      setForecastResult(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error making forecast:", error);
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
          <div className="form-group">
            <label htmlFor="monthsAhead">Number of Months Ahead to Forecast</label>
            <input
              type="number"
              id="monthsAhead"
              name="monthsAhead"
              value={formData.monthsAhead}
              onChange={handleInputChange}
              required
            />
            {errors.monthsAhead && <span className="error-message">{errors.monthsAhead}</span>}
          </div>

          <button type="submit" className="submit-button">Forecast Rainfall</button>
        </form>

        {forecastResult && (
          <div className="result-box">
            <h2>Forecast Result</h2>
            <ul>
              {forecastResult.forecast.map(([month, result], index) => (
                <li key={index}>
                  Month: {month}, Prediction: {result}
                </li>
              ))}
            </ul>
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

