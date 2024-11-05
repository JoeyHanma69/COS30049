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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/predict', formData);
      const willRain = response.data.will_rain;
      alert(willRain ? "It will rain today." : "It will not rain today.");
    } catch (error) {
      console.error("Error making prediction:", error);
      alert("Failed to get prediction. Please try again.");
    }
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
        <h1 className="form-title">Time to plan ahead</h1>
        <p className="form-description">Enter the details below to predict if it will rain today based on historical weather data.</p>

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
          </div>

          <button type="submit" className="submit-button">Predict Rainfall</button>
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

