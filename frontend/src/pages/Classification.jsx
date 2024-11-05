import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import './Style.css';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';

const Classification = () => {
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false); 
  const [errors, setErrors] = useState({}); 
  const [formData, setFormData] = useState({
    year: '',
    month: '',
    day: '',
    rainfall: '',
    period: ''
  });
  const [classificationReport, setClassificationReport] = useState(null);
  const [confusionMatrix, setConfusionMatrix] = useState(null);  
  const [successMessage, setSuccessMessage] = useState("");
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

  useEffect(() => {
    // Load dataset from CSV file using PapaParse
    Papa.parse('/path/to/cleaned_dataset.csv', {
      download: true,
      header: true,
      complete: (result) => {
        // Extract features and target from the dataset
        const data = result.data;
        const X = data.map(d => ({
          Year: +d['Year'],
          Month: +d['Month'],
          Day: +d['Day'],
          Rainfall: +d['Rainfall amount (millimetres)'],
          Period: +d['Period over which rainfall was measured (days)']
        }));
        const y = data.map(d => +d['RainToday']);

        // Split the dataset into training and testing sets
        const splitIndex = Math.floor(0.8 * X.length);
        const X_train = X.slice(0, splitIndex);
        const X_test = X.slice(splitIndex);
        const y_train = y.slice(0, splitIndex);
        const y_test = y.slice(splitIndex);

        // Mock function to simulate model training and evaluation
        const trainAndEvaluateModel = () => {
          // Mock classification metrics
          const metrics = {
            precision: 0.85,
            recall: 0.88,
            f1Score: 0.86,
            accuracy: 0.87
          };

          // Mock confusion matrix
          const mockConfusionMatrix = [
            [50, 10], // True Negatives, False Positives
            [5, 35]   // False Negatives, True Positives
          ];

          return { metrics, mockConfusionMatrix };
        };

        const { metrics, mockConfusionMatrix } = trainAndEvaluateModel();
        setClassificationReport(metrics);
        setConfusionMatrix(mockConfusionMatrix);
      }
    });
  }, []);  

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="classification-container">
      <h1 className="classification-title">Classification Model Analysis</h1>
      <p className="classification-description">See how the classification model categorizes temperature and humidity data into different classes.</p>
      
      {classificationReport && (
        <div className="classification-report">
          <h2 className="report-title">Classification Report</h2>
          <div className="report-details">
            <p><strong>Precision:</strong> {classificationReport.precision}</p>
            <p><strong>Recall:</strong> {classificationReport.recall}</p>
            <p><strong>F1 Score:</strong> {classificationReport.f1Score}</p>
            <p><strong>Accuracy:</strong> {classificationReport.accuracy}</p>
          </div>
        </div>
      )}

      {confusionMatrix && (
        <div className="confusion-matrix">
          <h2 className="matrix-title">Confusion Matrix Heatmap</h2>
          <Plot
            data={[{
              z: confusionMatrix,
              type: 'heatmap',
              colorscale: 'Blues',
              x: ['Predicted No Rain', 'Predicted Rain'],
              y: ['Actual No Rain', 'Actual Rain']
            }]}
            layout={{
              title: 'Confusion Matrix',
              xaxis: { title: 'Predicted Labels' },
              yaxis: { title: 'Actual Labels' },
              hovermode: 'closest'
            }}
          />
        </div>
      )} 

<div className="form-box">
        <h1 className="form-title">Time to plan ahead of time</h1>
        <p className="form-description">Enter the details below to predict if it will rain today based on historical weather data.</p>

        {successMessage && <div className="success-message">{successMessage}</div>}

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
              className={errors.year ? 'input-error' : 'input-valid'}
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
              className={errors.month ? 'input-error' : 'input-valid'}
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
              className={errors.day ? 'input-error' : 'input-valid'}
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
              className={errors.rainfall ? 'input-error' : 'input-valid'}
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
              className={errors.period ? 'input-error' : 'input-valid'}
            />
            {errors.period && <span className="error-message">{errors.period}</span>}
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Predicting...' : 'Will it rain?'}
          </button>
        </form>
      </div>

      <div className="button-group professional">
        <button onClick={() => handleNavigation('/')} className="nav-button professional">Home</button>
        <button onClick={() => handleNavigation('/eda')} className="nav-button professional">EDA</button>
        <button onClick={() => handleNavigation('/regression')} className="nav-button professional">Regression</button>
        <button onClick={() => handleNavigation('/clustering')} className="nav-button professional">Clustering</button>
      </div>
    </div>
  );
};

export default Classification;




