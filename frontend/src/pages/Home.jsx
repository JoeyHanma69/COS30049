import React, { useState } from 'react'; 
import heroImage from '../assets/olympic-park.jpg';
import weatherIcon from '../assets/weather_icon.png'; 
import chartPreview from '../assets/chart.png';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './Style.css';  // Assuming you have a Home.css file for styling

const Home = () => {   
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    year: '',
    month: '',
    day: '',
    rainfall: '',
    period: ''
  }); 
  const [errors, setErrors] = useState({}); 
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };  
 
  const validateInputs = () => {
    let validationErrors = {};
    if (!formData.year || formData.year < 2000 || formData.year > new Date().getFullYear()) {
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


  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="home-page-container">
      {/* Hero Section with Background Image */}
      <div className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-overlay">
          <h1 className="hero-title">Melbourne Olympic Park Weather Predictions</h1>
          <p className="hero-subtitle">Stay ahead with accurate weather insights for Melbourne Olympic Park.</p>
        </div>
      </div>

      {/* Current Weather Dashboard */}
      <div className="weather-dashboard">
        <div className="weather-card">
          <img src={weatherIcon} alt="Weather Icon" className="weather-icon" />
          <h3 className="weather-temp">22°C</h3>
          <p className="weather-condition">Partly Cloudy</p>
          <p className="weather-location">Melbourne Olympic Park</p>
        </div>
      </div>

      {/* Informational Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <h3>Prediction Accuracy</h3>
          <p>Our models achieve up to 90% accuracy in predicting weather patterns for Melbourne Olympic Park.</p>
        </div>
        <div className="summary-card">
          <h3>Real-Time Data</h3>
          <p>Get the most updated weather data, helping you make informed decisions for outdoor events.</p>
        </div>
      </div>

      {/* Data Visualization Preview */}
      <div className="data-preview">
        <h2>Explore Weather Trends</h2>
        <img src={chartPreview} alt="Chart Preview" className="chart-preview" />
        <p>View historical trends in temperature, humidity, and more to better understand weather patterns.</p>
      </div> 

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
            {loading ? 'Predicting...' : 'Predict Rainfall'}
          </button>
        </form>
      </div>

      {/* Navigation Section with Icons */}
      <div className="navigation-box professional">
        <h2 className="form-title">Explore Prediction Models</h2>
        <p className="form-description">Explore different prediction models and analyses below to gain insights into weather conditions.</p>

        <div className="button-group professional">
          <button onClick={() => handleNavigation('/eda')} className="nav-button professional">EDA Analysis</button>
          <button onClick={() => handleNavigation('/regression')} className="nav-button professional">Regression</button>
          <button onClick={() => handleNavigation('/classification')} className="nav-button professional">Classification</button> 
          <button onClick={() => handleNavigation('/clustering')} className="nav-button professional">Clustering</button> 
        </div>
      </div>

      {/* Stylish Footer with Useful Links */}
      <footer className="footer">
        <p>Weather Prediction Platform | Melbourne Olympic Park</p>
        <p>Contact us: <a href="mailto:info@weatherprediction.com">info@weatherprediction.com</a></p>
        <div className="social-icons">
          {/* Social media icons would go here */}
        </div>
      </footer>
    </div>
  );
};

export default Home;

